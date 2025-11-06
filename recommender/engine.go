package recommender

import (
	"fmt"
	"nofx/pool"
	"sort"
	"time"
)

// GenerateRecommendations generates recommendations for all coins
func GenerateRecommendations(strategies []string, limit int, btcETHLeverage, altcoinLeverage int) (*RecommendationResponse, error) {
	// 1. Get all available coins from coin pool
	coins, err := pool.GetCoinPool()
	if err != nil {
		return nil, fmt.Errorf("failed to get coin pool: %w", err)
	}
	log.Printf("📊 推荐引擎: 从币种池获取 %d 个币种", len(coins))

	// 2. Categorize coins
	majorCoins, altcoins := categorizeCoins(coins)
	log.Printf("📊 推荐引擎: 分类完成 - 主流币种: %d, 山寨币: %d", len(majorCoins), len(altcoins))

	// 3. Load strategy configurations
	strategyConfigs := loadStrategyConfigs(strategies)

	// 4. Analyze BTC direction (cache for 3 minutes)
	btcDirection := analyzeBTCDirection()
	log.Printf("📊 推荐引擎: BTC方向分析: %s", btcDirection)

	// 5. Score major coins
	majorRecs := []Recommendation{}
	for _, coin := range majorCoins {
		symbol := coin.Pair
		rec := scoreCoin(symbol, CategoryMajor, strategyConfigs, btcDirection, btcETHLeverage, altcoinLeverage)
		if rec != nil {
			rec.CreatedAt = time.Now()
			majorRecs = append(majorRecs, *rec)
		}
	}
	log.Printf("📊 推荐引擎: 主流币种评分完成 - %d 个币种通过评分", len(majorRecs))

	// 6. Score altcoins
	altcoinRecs := []Recommendation{}
	for _, coin := range altcoins {
		symbol := coin.Pair
		rec := scoreCoin(symbol, CategoryAltcoin, strategyConfigs, btcDirection, btcETHLeverage, altcoinLeverage)
		if rec != nil {
			rec.CreatedAt = time.Now()
			altcoinRecs = append(altcoinRecs, *rec)
		}
	}
	log.Printf("📊 推荐引擎: 山寨币评分完成 - %d 个币种通过评分", len(altcoinRecs))

	// 7. Rank and filter
	majorRecsBeforeFilter := len(majorRecs)
	majorRecs = rankAndFilter(majorRecs, min(5, limit), strategyConfigs)
	altcoinRecsBeforeFilter := len(altcoinRecs)
	altcoinRecs = rankAndFilter(altcoinRecs, limit, strategyConfigs)
	log.Printf("📊 推荐引擎: 最终筛选 - 主流币种: %d/%d, 山寨币: %d/%d", len(majorRecs), majorRecsBeforeFilter, len(altcoinRecs), altcoinRecsBeforeFilter)

	return &RecommendationResponse{
		MajorCoins:        majorRecs,
		Altcoins:          altcoinRecs,
		StrategiesApplied: strategies,
		UpdatedAt:         time.Now(),
		BTCStatus:         btcDirection,
	}, nil
}

// categorizeCoins separates coins into major and altcoin categories
func categorizeCoins(coins []pool.CoinInfo) (major, alt []pool.CoinInfo) {
	for _, coin := range coins {
		symbol := coin.Pair
		if symbol == "BTCUSDT" || symbol == "ETHUSDT" {
			major = append(major, coin)
		} else {
			alt = append(alt, coin)
		}
	}
	return
}

// rankAndFilter ranks recommendations by score and filters to top N
func rankAndFilter(recommendations []Recommendation, limit int, strategyConfigs []StrategyConfig) []Recommendation {
	// Calculate minimum confidence threshold from all strategies
	minConfidenceThreshold := 60 // Default fallback
	if len(strategyConfigs) > 0 {
		minConfidenceThreshold = strategyConfigs[0].MinConfidence
		for _, config := range strategyConfigs {
			if config.MinConfidence < minConfidenceThreshold {
				minConfidenceThreshold = config.MinConfidence
			}
		}
		// Use a slightly lower threshold (5 points below minimum) to allow more recommendations
		// This compensates for the double filtering that was removed
		minConfidenceThreshold = minConfidenceThreshold - 5
		if minConfidenceThreshold < 50 {
			minConfidenceThreshold = 50 // Minimum floor
		}
	}

	// Sort by composite score (score * confidence / 100)
	sort.Slice(recommendations, func(i, j int) bool {
		compositeI := recommendations[i].Score * (float64(recommendations[i].Confidence) / 100.0)
		compositeJ := recommendations[j].Score * (float64(recommendations[j].Confidence) / 100.0)
		if compositeI != compositeJ {
			return compositeI > compositeJ
		}
		// Tie-breaker: higher confidence wins
		return recommendations[i].Confidence > recommendations[j].Confidence
	})

	// Filter out low-quality using strategy-aware threshold
	filtered := []Recommendation{}
	for _, rec := range recommendations {
		if rec.Score >= 40 && rec.Confidence >= minConfidenceThreshold {
			filtered = append(filtered, rec)
		}
	}

	// Return top N
	if len(filtered) > limit {
		return filtered[:limit]
	}
	return filtered
}

