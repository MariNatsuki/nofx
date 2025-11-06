package recommender

import (
	"math"
	"nofx/market"
)

// getLatestValue gets the latest value from a slice, or 0 if empty
func getLatestValue(values []float64) float64 {
	if len(values) == 0 {
		return 0
	}
	return values[len(values)-1]
}

// calculateOIChange calculates OI change percentage
func calculateOIChange(oi *market.OIData) float64 {
	if oi == nil || oi.Average == 0 {
		return 0
	}
	return ((oi.Latest - oi.Average) / oi.Average) * 100
}

// countAlignedTimeframes counts how many timeframes are aligned for a direction
func countAlignedTimeframes(data *market.Data, direction string) int {
	count := 0
	price := data.CurrentPrice

	// 3-minute timeframe
	if direction == "long" {
		if price > data.CurrentEMA20 && data.CurrentMACD > 0 {
			count++
		}
	} else {
		if price < data.CurrentEMA20 && data.CurrentMACD < 0 {
			count++
		}
	}

	// 4-hour timeframe
	if data.LongerTermContext != nil {
		ema20_4h := data.LongerTermContext.EMA20
		macd_4h := getLatestValue(data.LongerTermContext.MACDValues)

		if direction == "long" {
			if price > ema20_4h && macd_4h > 0 {
				count++
			}
		} else {
			if price < ema20_4h && macd_4h < 0 {
				count++
			}
		}
	}

	return count
}

// hasConflictingSignals checks for conflicting signals
func hasConflictingSignals(data *market.Data) bool {
	// Price up but volume down
	if data.PriceChange1h > 0 {
		if data.LongerTermContext != nil {
			volumeRatio := data.LongerTermContext.CurrentVolume / data.LongerTermContext.AverageVolume
			if volumeRatio < 0.8 {
				return true
			}
		}
	}

	// Price up but MACD down
	if data.PriceChange1h > 0 && data.CurrentMACD < 0 {
		return true
	}

	// Price up but OI decreasing
	if data.PriceChange1h > 0 && data.OpenInterest != nil && data.OpenInterest.Latest < data.OpenInterest.Average {
		return true
	}

	return false
}

// isFalseBreakout checks for false breakout patterns
func isFalseBreakout(data *market.Data) bool {
	// Check for RSI divergence: RSI7 > 70 but price change is minimal
	if data.CurrentRSI7 > 70 && math.Abs(data.PriceChange1h) < 0.5 {
		return true
	}

	return false
}

// passesOIThreshold checks if coin passes minimum OI threshold
func passesOIThreshold(data *market.Data, category CoinCategory) bool {
	if data.OpenInterest == nil || data.CurrentPrice == 0 {
		return false
	}

	// Calculate OI value in millions
	oiValue := data.OpenInterest.Latest * data.CurrentPrice
	oiValueInMillions := oiValue / 1_000_000

	// Minimum threshold: 15M for major coins, 10M for altcoins
	minThreshold := 10.0
	if category == CategoryMajor {
		minThreshold = 15.0
	}

	return oiValueInMillions >= minThreshold
}

// min returns the minimum of two integers
func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

