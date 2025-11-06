package recommender

import "time"

// StrategyConfig defines criteria for each trading strategy
type StrategyConfig struct {
	Name              string
	MinChecklistItems int     // e.g., 3 for risk_first, 4 for adaptive_relaxed
	MinConfidence     int     // e.g., 85 for risk_first, 80 for adaptive_relaxed
	RSIThresholdLong  float64 // e.g., 30 for risk_first, 45 for adaptive_relaxed
	RSIThresholdShort float64 // e.g., 70 for risk_first, 60 for adaptive_relaxed
	VolumeThreshold   float64 // e.g., 1.5 for risk_first, 1.3 for adaptive_relaxed
	OIThreshold       float64 // e.g., 5.0 for risk_first, 3.0 for adaptive_relaxed
	MinTimeframes     int     // e.g., 3 for risk_first, 2 for adaptive_relaxed
}

// CoinCategory identifies major vs altcoin
type CoinCategory string

const (
	CategoryMajor   CoinCategory = "major"   // BTC, ETH
	CategoryAltcoin CoinCategory = "altcoin" // All others
)

// Recommendation represents a single coin recommendation
type Recommendation struct {
	Symbol           string
	Category         CoinCategory
	Score            float64  // 0-100
	Confidence       int      // 0-100
	Direction        string   // "long" or "short"
	Strategies       []string // e.g., ["risk_first", "adaptive"]
	Reasoning        string   // Combined reasoning from all strategies
	CurrentPrice     float64
	SuggestedLeverage int     // BTCETHLeverage or AltcoinLeverage
	TechnicalData    TechnicalSnapshot
	CreatedAt        time.Time
}

// TechnicalSnapshot captures key metrics at recommendation time
type TechnicalSnapshot struct {
	EMA20_3m     float64 `json:"ema20_3m"`
	EMA20_4h     float64 `json:"ema20_4h"`
	MACD_3m      float64 `json:"macd_3m"`
	MACD_4h      float64 `json:"macd_4h"`
	RSI7         float64 `json:"rsi7"`
	RSI14        float64 `json:"rsi14"`
	VolumeRatio  float64 `json:"volume_ratio"`
	OIChange     float64 `json:"oi_change"`
	FundingRate  float64 `json:"funding_rate"`
	BTCDirection string  `json:"btc_direction"` // "bullish", "bearish", "neutral"
}

// RecommendationResponse is the API response structure
type RecommendationResponse struct {
	MajorCoins        []Recommendation `json:"major_coins"`
	Altcoins          []Recommendation `json:"altcoins"`
	StrategiesApplied []string         `json:"strategies_applied"`
	UpdatedAt         time.Time        `json:"updated_at"`
	BTCStatus         string            `json:"btc_status"` // Current BTC direction
}

// StrategyScore represents a score from a single strategy
type StrategyScore struct {
	StrategyName string
	Score         float64
	Direction     string // "long" or "short"
	Reasons       []string
	MinConfidence int    // Minimum confidence threshold from the strategy config
}
