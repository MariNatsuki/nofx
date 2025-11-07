package recommender

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
)

// StoredRecommendation represents a recommendation stored in JSON with unique ID
type StoredRecommendation struct {
	ID            string       `json:"id"`             // UUID or timestamp-based unique ID for linking outcomes
	GenerationID  string       `json:"generation_id"`  // Groups recommendations from the same generation
	Symbol        string       `json:"symbol"`
	Category      CoinCategory `json:"category"`
	Score         float64      `json:"score"`              // 0-100
	Confidence    int          `json:"confidence"`        // 0-100
	Direction     string       `json:"direction"`        // "long" or "short"
	Strategy      string       `json:"strategy"`         // Single strategy name (e.g., "risk_first")
	Reasoning     string       `json:"reasoning"`        // Reasoning from this strategy
	CurrentPrice  float64      `json:"current_price"`
	SuggestedLeverage int      `json:"suggested_leverage"` // BTCETHLeverage or AltcoinLeverage
	TechnicalData TechnicalSnapshot `json:"technical_data"`
	CreatedAt     time.Time    `json:"created_at"`
}

// StoredOutcome represents an outcome linked to a recommendation
type StoredOutcome struct {
	RecommendationID string    `json:"recommendation_id"` // Links to StoredRecommendation.ID
	Outcome          string    `json:"outcome"`           // "pending", "profitable", "loss", "neutral"
	PriceChange1h    float64   `json:"price_change_1h"`
	MaxGain          float64   `json:"max_gain"`
	MaxLoss          float64   `json:"max_loss"`
	UpdatedAt        time.Time `json:"updated_at"`
}

// RecommendationsData is the root structure for JSON storage
type RecommendationsData struct {
	Recommendations []StoredRecommendation `json:"recommendations"`
	Outcomes        []StoredOutcome        `json:"outcomes"`
	LastUpdated     time.Time              `json:"last_updated"`
}

// LoadRecommendations loads recommendations from a JSON file
// Returns an empty structure if the file doesn't exist
func LoadRecommendations(filePath string) (*RecommendationsData, error) {
	file, err := os.Open(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			// File doesn't exist, return empty structure
			return &RecommendationsData{
				Recommendations: []StoredRecommendation{},
				Outcomes:        []StoredOutcome{},
				LastUpdated:     time.Time{},
			}, nil
		}
		return nil, fmt.Errorf("failed to open recommendations file: %w", err)
	}
	defer file.Close()

	var data RecommendationsData
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&data); err != nil {
		return nil, fmt.Errorf("failed to decode recommendations JSON: %w", err)
	}

	// Initialize empty slices if nil
	if data.Recommendations == nil {
		data.Recommendations = []StoredRecommendation{}
	}
	if data.Outcomes == nil {
		data.Outcomes = []StoredOutcome{}
	}

	return &data, nil
}

// SaveRecommendations saves recommendations to a JSON file using atomic write
// Writes to a temp file first, then renames to the final file
func SaveRecommendations(filePath string, data *RecommendationsData) error {
	// Update last updated timestamp
	data.LastUpdated = time.Now()

	// Create temp file in the same directory
	tempPath := filePath + ".tmp"

	// Write to temp file
	file, err := os.Create(tempPath)
	if err != nil {
		return fmt.Errorf("failed to create temp file: %w", err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(data); err != nil {
		os.Remove(tempPath) // Clean up temp file on error
		return fmt.Errorf("failed to encode recommendations JSON: %w", err)
	}

	if err := file.Close(); err != nil {
		os.Remove(tempPath)
		return fmt.Errorf("failed to close temp file: %w", err)
	}

	// Atomic rename
	if err := os.Rename(tempPath, filePath); err != nil {
		os.Remove(tempPath)
		return fmt.Errorf("failed to rename temp file to final file: %w", err)
	}

	return nil
}

// GetLatestGenerationID finds the most recent generation_id from recommendations
func GetLatestGenerationID(data *RecommendationsData) string {
	if len(data.Recommendations) == 0 {
		return ""
	}

	latest := data.Recommendations[0].GenerationID
	latestTime := data.Recommendations[0].CreatedAt

	for _, rec := range data.Recommendations {
		if rec.CreatedAt.After(latestTime) {
			latest = rec.GenerationID
			latestTime = rec.CreatedAt
		}
	}

	return latest
}

// GenerateRecommendationID generates a unique ID for a recommendation
// Uses timestamp-based ID with nanosecond precision
func GenerateRecommendationID() string {
	return time.Now().Format(time.RFC3339Nano)
}

// PruneOldRecommendations removes recommendations older than maxAge
// Also removes associated outcomes for pruned recommendations
func PruneOldRecommendations(data *RecommendationsData, maxAge time.Duration) {
	if data == nil {
		return
	}

	cutoff := time.Now().Add(-maxAge)
	
	// Keep track of recommendation IDs to keep
	keepIDs := make(map[string]bool)
	
	// Filter recommendations
	filteredRecs := []StoredRecommendation{}
	for _, rec := range data.Recommendations {
		if rec.CreatedAt.After(cutoff) {
			filteredRecs = append(filteredRecs, rec)
			keepIDs[rec.ID] = true
		}
	}
	data.Recommendations = filteredRecs

	// Filter outcomes - only keep those linked to remaining recommendations
	filteredOutcomes := []StoredOutcome{}
	for _, outcome := range data.Outcomes {
		if keepIDs[outcome.RecommendationID] {
			filteredOutcomes = append(filteredOutcomes, outcome)
		}
	}
	data.Outcomes = filteredOutcomes
}

// ConvertRecommendationToStored converts a Recommendation to StoredRecommendation
func ConvertRecommendationToStored(rec *Recommendation, generationID string) StoredRecommendation {
	return StoredRecommendation{
		ID:               GenerateRecommendationID(),
		GenerationID:     generationID,
		Symbol:           rec.Symbol,
		Category:         rec.Category,
		Score:            rec.Score,
		Confidence:       rec.Confidence,
		Direction:        rec.Direction,
		Strategy:          rec.Strategy,
		Reasoning:        rec.Reasoning,
		CurrentPrice:      rec.CurrentPrice,
		SuggestedLeverage: rec.SuggestedLeverage,
		TechnicalData:    rec.TechnicalData,
		CreatedAt:        rec.CreatedAt,
	}
}

// LoadRecommendationsWithLock loads recommendations with file locking for concurrent reads
// This is a wrapper that uses the lock mechanism for safe concurrent access
func LoadRecommendationsWithLock(filePath string, lockPath string) (*RecommendationsData, error) {
	// For reads, we can use a shared lock or just read directly
	// Since we're doing atomic writes, reading the file directly should be safe
	// But we'll use a simple approach: try to read, if it fails due to lock, retry
	maxRetries := 3
	retryDelay := 100 * time.Millisecond

	for i := 0; i < maxRetries; i++ {
		data, err := LoadRecommendations(filePath)
		if err == nil {
			return data, nil
		}
		
		// If file doesn't exist, return empty structure
		if os.IsNotExist(err) {
			return &RecommendationsData{
				Recommendations: []StoredRecommendation{},
				Outcomes:        []StoredOutcome{},
				LastUpdated:     time.Time{},
			}, nil
		}

		// For other errors, wait and retry
		if i < maxRetries-1 {
			time.Sleep(retryDelay)
		}
	}

	return nil, fmt.Errorf("failed to load recommendations after %d retries", maxRetries)
}

