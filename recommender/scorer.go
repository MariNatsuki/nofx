package recommender

import (
	"fmt"
	"log"
	"math"
	"nofx/market"
	"strings"
)

// scoreCoin scores a coin using a single strategy
func scoreCoin(symbol string, category CoinCategory, strategy StrategyConfig, btcDirection string, btcETHLeverage, altcoinLeverage int) *Recommendation {
	// Fetch market data using existing market.Get()
	data, err := market.Get(symbol)
	if err != nil {
		log.Printf("⚠️  推荐引擎: 获取 %s 市场数据失败: %v", symbol, err)
		return nil
	}

	// Check OI threshold (skip low liquidity coins)
	if !passesOIThreshold(data, category) {
		oiValue := 0.0
		if data.OpenInterest != nil && data.CurrentPrice > 0 {
			oiValue = (data.OpenInterest.Latest * data.CurrentPrice) / 1_000_000
		}
		minThreshold := 10.0
		if category == CategoryMajor {
			minThreshold = 15.0
		}
		log.Printf("⚠️  推荐引擎: %s 未通过OI阈值 (OI值: %.2fM < %.1fM)", symbol, oiValue, minThreshold)
		return nil
	}

	// Calculate scores for the strategy
	longScore, longReasons := calculateLongScore(data, strategy, category, btcDirection)
	shortScore, shortReasons := calculateShortScore(data, strategy, category, btcDirection)

	// Determine best direction
	var finalScore float64
	var finalDirection string
	var finalReasons []string

	if longScore > shortScore && longScore >= 40 {
		finalScore = longScore
		finalDirection = "long"
		finalReasons = longReasons
	} else if shortScore >= 40 {
		finalScore = shortScore
		finalDirection = "short"
		finalReasons = shortReasons
	} else {
		log.Printf("⚠️  推荐引擎: %s [%s] 无符合条件的信号 (评分 < 40)", symbol, strategy.Name)
		return nil // No qualifying signals
	}

	// Calculate confidence
	confidence := calculateConfidence(finalScore, strategy)
	if confidence == 0 {
		log.Printf("⚠️  推荐引擎: %s [%s] 置信度不足", symbol, strategy.Name)
		return nil
	}

	// Determine leverage
	suggestedLeverage := altcoinLeverage
	if category == CategoryMajor {
		suggestedLeverage = btcETHLeverage
	}

	// Create technical snapshot
	technicalData := TechnicalSnapshot{
		EMA20_3m:     data.CurrentEMA20,
		MACD_3m:      data.CurrentMACD,
		RSI7:         data.CurrentRSI7,
		VolumeRatio:  1.0,
		OIChange:     calculateOIChange(data.OpenInterest),
		FundingRate:  data.FundingRate,
		BTCDirection: AnalyzeBTCDirection(),
	}

	if data.LongerTermContext != nil {
		technicalData.EMA20_4h = data.LongerTermContext.EMA20
		technicalData.MACD_4h = getLatestValue(data.LongerTermContext.MACDValues)
		if data.LongerTermContext.AverageVolume > 0 {
			technicalData.VolumeRatio = data.LongerTermContext.CurrentVolume / data.LongerTermContext.AverageVolume
		}
	}

	if data.IntradaySeries != nil {
		technicalData.RSI14 = getLatestValue(data.IntradaySeries.RSI14Values)
	}

	rec := &Recommendation{
		Symbol:            symbol,
		Category:          category,
		Score:             finalScore,
		Confidence:        confidence,
		Direction:         finalDirection,
		Strategy:          strategy.Name,
		Reasoning:         strings.Join(finalReasons, "; "),
		CurrentPrice:      data.CurrentPrice,
		SuggestedLeverage: suggestedLeverage,
		TechnicalData:     technicalData,
	}

	log.Printf("✓ 推荐引擎: %s [%s] 评分完成 - Score: %.1f, Confidence: %d, Direction: %s", symbol, strategy.Name, rec.Score, rec.Confidence, rec.Direction)
	return rec
}

// calculateLongScore calculates long signal score
func calculateLongScore(data *market.Data, strategy StrategyConfig, category CoinCategory, btcDirection string) (float64, []string) {
	score := 0.0
	reasons := []string{}

	// Component 1: Trend Confirmation (0-20 points)
	price := data.CurrentPrice
	ema20_3m := data.CurrentEMA20
	ema20_4h := 0.0
	if data.LongerTermContext != nil {
		ema20_4h = data.LongerTermContext.EMA20
	}

	if price > ema20_3m && price > ema20_4h && ema20_4h > 0 {
		score += 20
		reasons = append(reasons, "✓ Strong uptrend: Price above EMA20 on 3m and 4h")
	} else if price > ema20_3m {
		score += 10
		reasons = append(reasons, "~ Partial trend: Price above 3m EMA20")
	} else if price > ema20_4h && ema20_4h > 0 {
		score += 10
		reasons = append(reasons, "~ Partial trend: Price above 4h EMA20")
	}

	// Component 2: MACD Momentum (0-20 points)
	macd_3m := data.CurrentMACD
	macd_4h := 0.0
	if data.LongerTermContext != nil {
		macd_4h = getLatestValue(data.LongerTermContext.MACDValues)
	}

	if macd_3m > 0 && macd_4h > 0 {
		score += 20
		reasons = append(reasons, fmt.Sprintf("✓ Bullish momentum: MACD 3m=%.3f, 4h=%.3f", macd_3m, macd_4h))
	} else if macd_3m > 0 {
		score += 10
		reasons = append(reasons, fmt.Sprintf("~ Moderate momentum: MACD 3m=%.3f", macd_3m))
	}

	// Component 3: RSI Condition (0-15 points) - Strategy-specific
	rsi7 := data.CurrentRSI7
	rsi14 := 0.0
	if data.IntradaySeries != nil {
		rsi14 = getLatestValue(data.IntradaySeries.RSI14Values)
	}

	if rsi7 < strategy.RSIThresholdLong {
		score += 15
		reasons = append(reasons, fmt.Sprintf("✓ Oversold bounce: RSI7=%.1f (< %.0f)", rsi7, strategy.RSIThresholdLong))
	} else if rsi14 >= 40 && rsi14 <= 60 {
		score += 10
		reasons = append(reasons, fmt.Sprintf("✓ Healthy range: RSI14=%.1f", rsi14))
	} else if rsi7 > 70 {
		score -= 10
		reasons = append(reasons, fmt.Sprintf("✗ Overbought: RSI7=%.1f", rsi7))
	}

	// Component 4: Volume Confirmation (0-15 points)
	volumeRatio := 1.0
	if data.LongerTermContext != nil && data.LongerTermContext.AverageVolume > 0 {
		volumeRatio = data.LongerTermContext.CurrentVolume / data.LongerTermContext.AverageVolume
	}

	if volumeRatio > strategy.VolumeThreshold {
		score += 15
		reasons = append(reasons, fmt.Sprintf("✓ Strong volume: %.1fx average", volumeRatio))
	} else if volumeRatio > 1.0 {
		score += 7
		reasons = append(reasons, fmt.Sprintf("~ Moderate volume: %.1fx average", volumeRatio))
	} else if volumeRatio < 0.8 {
		score -= 5
		reasons = append(reasons, "✗ Volume declining")
	}

	// Component 5: OI Change (0-15 points)
	oiChange := calculateOIChange(data.OpenInterest)

	if oiChange > strategy.OIThreshold {
		score += 15
		reasons = append(reasons, fmt.Sprintf("✓ OI surge: +%.1f%%", oiChange))
	} else if oiChange > 0 {
		score += 5
		reasons = append(reasons, fmt.Sprintf("~ OI growing: +%.1f%%", oiChange))
	}

	// Component 6: Funding Rate (0-10 points)
	fundingRate := data.FundingRate

	if fundingRate < -0.01 {
		score += 10
		reasons = append(reasons, fmt.Sprintf("✓ Extreme negative funding: %.4f (bullish)", fundingRate))
	} else if fundingRate < 0 {
		score += 5
		reasons = append(reasons, fmt.Sprintf("~ Negative funding: %.4f", fundingRate))
	} else if fundingRate > 0.01 {
		score -= 5
		reasons = append(reasons, "✗ High positive funding (bearish sentiment)")
	}

	// Component 7: Multi-Timeframe Alignment (0-15 points)
	alignedCount := countAlignedTimeframes(data, "long")

	if alignedCount >= strategy.MinTimeframes {
		score += 15
		reasons = append(reasons, fmt.Sprintf("✓ %d timeframes aligned", alignedCount))
	} else if alignedCount >= 2 {
		score += 8
		reasons = append(reasons, fmt.Sprintf("~ %d timeframes aligned", alignedCount))
	}

	// Component 8: BTC Correlation (category-specific)
	btcScore, btcReason := calculateBTCCorrelation(data.Symbol, category, btcDirection, "long")
	score += btcScore
	if btcReason != "" {
		reasons = append(reasons, btcReason)
	}

	// Apply strategy-specific filters
	score, reasons = applyStrategyFilters(score, data, strategy, reasons)

	return score, reasons
}

// calculateShortScore calculates short signal score (similar to long but inverted)
func calculateShortScore(data *market.Data, strategy StrategyConfig, category CoinCategory, btcDirection string) (float64, []string) {
	score := 0.0
	reasons := []string{}

	// Component 1: Trend Confirmation (0-20 points)
	price := data.CurrentPrice
	ema20_3m := data.CurrentEMA20
	ema20_4h := 0.0
	if data.LongerTermContext != nil {
		ema20_4h = data.LongerTermContext.EMA20
	}

	if price < ema20_3m && price < ema20_4h && ema20_4h > 0 {
		score += 20
		reasons = append(reasons, "✓ Strong downtrend: Price below EMA20 on 3m and 4h")
	} else if price < ema20_3m {
		score += 10
		reasons = append(reasons, "~ Partial trend: Price below 3m EMA20")
	} else if price < ema20_4h && ema20_4h > 0 {
		score += 10
		reasons = append(reasons, "~ Partial trend: Price below 4h EMA20")
	}

	// Component 2: MACD Momentum (0-20 points)
	macd_3m := data.CurrentMACD
	macd_4h := 0.0
	if data.LongerTermContext != nil {
		macd_4h = getLatestValue(data.LongerTermContext.MACDValues)
	}

	if macd_3m < 0 && macd_4h < 0 {
		score += 20
		reasons = append(reasons, fmt.Sprintf("✓ Bearish momentum: MACD 3m=%.3f, 4h=%.3f", macd_3m, macd_4h))
	} else if macd_3m < 0 {
		score += 10
		reasons = append(reasons, fmt.Sprintf("~ Moderate momentum: MACD 3m=%.3f", macd_3m))
	}

	// Component 3: RSI Condition (0-15 points)
	rsi7 := data.CurrentRSI7
	rsi14 := 0.0
	if data.IntradaySeries != nil {
		rsi14 = getLatestValue(data.IntradaySeries.RSI14Values)
	}

	if rsi7 > strategy.RSIThresholdShort {
		score += 15
		reasons = append(reasons, fmt.Sprintf("✓ Overbought reversal: RSI7=%.1f (> %.0f)", rsi7, strategy.RSIThresholdShort))
	} else if rsi14 >= 40 && rsi14 <= 60 {
		score += 10
		reasons = append(reasons, fmt.Sprintf("✓ Healthy range: RSI14=%.1f", rsi14))
	} else if rsi7 < 30 {
		score -= 10
		reasons = append(reasons, fmt.Sprintf("✗ Oversold: RSI7=%.1f", rsi7))
	}

	// Component 4: Volume Confirmation (0-15 points)
	volumeRatio := 1.0
	if data.LongerTermContext != nil && data.LongerTermContext.AverageVolume > 0 {
		volumeRatio = data.LongerTermContext.CurrentVolume / data.LongerTermContext.AverageVolume
	}

	if volumeRatio > strategy.VolumeThreshold {
		score += 15
		reasons = append(reasons, fmt.Sprintf("✓ Strong volume: %.1fx average", volumeRatio))
	} else if volumeRatio > 1.0 {
		score += 7
		reasons = append(reasons, fmt.Sprintf("~ Moderate volume: %.1fx average", volumeRatio))
	} else if volumeRatio < 0.8 {
		score -= 5
		reasons = append(reasons, "✗ Volume declining")
	}

	// Component 5: OI Change (0-15 points)
	oiChange := calculateOIChange(data.OpenInterest)

	if oiChange > strategy.OIThreshold {
		score += 15
		reasons = append(reasons, fmt.Sprintf("✓ OI surge: +%.1f%%", oiChange))
	} else if oiChange > 0 {
		score += 5
		reasons = append(reasons, fmt.Sprintf("~ OI growing: +%.1f%%", oiChange))
	}

	// Component 6: Funding Rate (0-10 points)
	fundingRate := data.FundingRate

	if fundingRate > 0.01 {
		score += 10
		reasons = append(reasons, fmt.Sprintf("✓ Extreme positive funding: %.4f (bearish)", fundingRate))
	} else if fundingRate > 0 {
		score += 5
		reasons = append(reasons, fmt.Sprintf("~ Positive funding: %.4f", fundingRate))
	} else if fundingRate < -0.01 {
		score -= 5
		reasons = append(reasons, "✗ High negative funding (bullish sentiment)")
	}

	// Component 7: Multi-Timeframe Alignment (0-15 points)
	alignedCount := countAlignedTimeframes(data, "short")

	if alignedCount >= strategy.MinTimeframes {
		score += 15
		reasons = append(reasons, fmt.Sprintf("✓ %d timeframes aligned", alignedCount))
	} else if alignedCount >= 2 {
		score += 8
		reasons = append(reasons, fmt.Sprintf("~ %d timeframes aligned", alignedCount))
	}

	// Component 8: BTC Correlation (category-specific)
	btcScore, btcReason := calculateBTCCorrelation(data.Symbol, category, btcDirection, "short")
	score += btcScore
	if btcReason != "" {
		reasons = append(reasons, btcReason)
	}

	// Apply strategy-specific filters
	score, reasons = applyStrategyFilters(score, data, strategy, reasons)

	return score, reasons
}

// calculateBTCCorrelation calculates BTC correlation score
func calculateBTCCorrelation(symbol string, category CoinCategory, btcDirection string, tradeDirection string) (float64, string) {
	// BTC doesn't check itself
	if symbol == "BTCUSDT" {
		return 0, ""
	}

	// ETH gets reduced BTC correlation weight (major coin)
	if category == CategoryMajor {
		if btcDirection == "bullish" && tradeDirection == "long" {
			return 5, "✓ BTC bullish (ETH correlation)"
		} else if btcDirection == "bearish" && tradeDirection == "long" {
			return -5, "✗ BTC bearish (headwind)"
		}
		return 0, "~ BTC neutral"
	}

	// Altcoins get full BTC correlation weight
	if btcDirection == "bullish" && tradeDirection == "long" {
		return 10, "✓ BTC bullish - strong altcoin support"
	} else if btcDirection == "bearish" && tradeDirection == "long" {
		return -10, "✗ BTC bearish - DISQUALIFIED for long"
	} else if btcDirection == "neutral" {
		return 5, "~ BTC neutral - altcoin can move independently"
	}

	// For shorts, inverse logic
	if btcDirection == "bearish" && tradeDirection == "short" {
		return 10, "✓ BTC bearish - altcoin short opportunity"
	} else if btcDirection == "bullish" && tradeDirection == "short" {
		return -10, "✗ BTC bullish - headwind for short"
	}

	return 0, ""
}

// AnalyzeBTCDirection analyzes BTC direction (exported for use in API)
func AnalyzeBTCDirection() string {
	// Cache this for 3 minutes to avoid repeated calculations
	btcData, err := market.Get("BTCUSDT")
	if err != nil {
		return "neutral"
	}

	bullishSignals := 0
	bearishSignals := 0

	// Check MACD on 3m
	if btcData.CurrentMACD > 0 {
		bullishSignals++
	} else {
		bearishSignals++
	}

	// Check price vs EMA20 on 3m
	if btcData.CurrentPrice > btcData.CurrentEMA20 {
		bullishSignals++
	} else {
		bearishSignals++
	}

	// Check MACD on 4h
	if btcData.LongerTermContext != nil {
		macd_4h := getLatestValue(btcData.LongerTermContext.MACDValues)
		if macd_4h > 0 {
			bullishSignals++
		} else {
			bearishSignals++
		}

		// Check price vs EMA20 on 4h
		if btcData.CurrentPrice > btcData.LongerTermContext.EMA20 {
			bullishSignals++
		} else {
			bearishSignals++
		}
	}

	if bullishSignals >= 3 {
		return "bullish"
	} else if bearishSignals >= 3 {
		return "bearish"
	}
	return "neutral"
}

// applyStrategyFilters applies strategy-specific filters
func applyStrategyFilters(score float64, data *market.Data, strategy StrategyConfig, reasons []string) (float64, []string) {
	// Count passed checklist items (simplified: based on score thresholds)
	passedItems := 0
	if score >= 20 {
		passedItems++
	}
	if score >= 40 {
		passedItems++
	}
	if score >= 60 {
		passedItems++
	}
	if score >= 80 {
		passedItems++
	}

	// Apply minimum checklist requirement
	if passedItems < strategy.MinChecklistItems {
		reasons = append(reasons, fmt.Sprintf("✗ FAILED: Only %d/%d checklist items passed",
			passedItems, strategy.MinChecklistItems))
		return 0, reasons
	}

	// Check for conflicting signals
	if hasConflictingSignals(data) {
		score *= 0.5
		reasons = append(reasons, "⚠ Conflicting signals - score penalized 50%")
	}

	// Check for false breakout patterns
	if isFalseBreakout(data) {
		reasons = append(reasons, "✗ FAILED: False breakout pattern detected")
		return 0, reasons
	}

	return score, reasons
}

// calculateConfidence calculates confidence from score
func calculateConfidence(score float64, strategy StrategyConfig) int {
	baseConfidence := int(math.Min(100, score))

	// Adjust based on signal strength
	if score >= 80 {
		baseConfidence += 5 // Bonus for strong signals
	} else if score >= 60 {
		// Keep base confidence
	} else if score >= 40 {
		baseConfidence -= 10
	} else {
		return 0 // Too weak, disqualify
	}

	// Don't return 0 here - let rankAndFilter handle the MinConfidence threshold
	// This fixes the double filtering issue where calculateConfidence returns 0
	// and then rankAndFilter also filters by a hardcoded threshold

	// Cap at 100
	if baseConfidence > 100 {
		return 100
	}

	return baseConfidence
}

// aggregateStrategyScores aggregates scores from multiple strategies
func aggregateStrategyScores(symbol string, category CoinCategory, data *market.Data, strategyScores []StrategyScore, btcETHLeverage, altcoinLeverage int) *Recommendation {
	if len(strategyScores) == 0 {
		return nil
	}

	// Calculate averages
	totalScore := 0.0
	totalConfidence := 0.0
	allReasons := []string{}
	strategyNames := []string{}
	directions := make(map[string]int)

	for _, ss := range strategyScores {
		totalScore += ss.Score
		totalConfidence += float64(calculateConfidence(ss.Score, StrategyConfig{MinConfidence: ss.MinConfidence}))
		allReasons = append(allReasons, fmt.Sprintf("[%s] %s", ss.StrategyName, strings.Join(ss.Reasons, "; ")))
		strategyNames = append(strategyNames, ss.StrategyName)
		directions[ss.Direction]++
	}

	count := float64(len(strategyScores))
	avgScore := totalScore / count
	avgConfidence := int(totalConfidence / count)

	// Determine final direction (majority vote)
	finalDirection := "long"
	if directions["short"] > directions["long"] {
		finalDirection = "short"
	}

	// Determine leverage
	suggestedLeverage := altcoinLeverage
	if category == CategoryMajor {
		suggestedLeverage = btcETHLeverage
	}

	// Create technical snapshot
	technicalData := TechnicalSnapshot{
		EMA20_3m:     data.CurrentEMA20,
		MACD_3m:      data.CurrentMACD,
		RSI7:         data.CurrentRSI7,
		VolumeRatio:  1.0,
		OIChange:     calculateOIChange(data.OpenInterest),
		FundingRate:  data.FundingRate,
		BTCDirection: AnalyzeBTCDirection(),
	}

	if data.LongerTermContext != nil {
		technicalData.EMA20_4h = data.LongerTermContext.EMA20
		technicalData.MACD_4h = getLatestValue(data.LongerTermContext.MACDValues)
		if data.LongerTermContext.AverageVolume > 0 {
			technicalData.VolumeRatio = data.LongerTermContext.CurrentVolume / data.LongerTermContext.AverageVolume
		}
	}

	if data.IntradaySeries != nil {
		technicalData.RSI14 = getLatestValue(data.IntradaySeries.RSI14Values)
	}

	return &Recommendation{
		Symbol:            symbol,
		Category:          category,
		Score:             avgScore,
		Confidence:        avgConfidence,
		Direction:         finalDirection,
		Strategy:          strings.Join(strategyNames, ", "),
		Reasoning:         strings.Join(allReasons, " | "),
		CurrentPrice:      data.CurrentPrice,
		SuggestedLeverage: suggestedLeverage,
		TechnicalData:     technicalData,
	}
}

