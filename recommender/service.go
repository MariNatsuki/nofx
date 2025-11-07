package recommender

import (
	"log"
	"nofx/market"
	"time"
)

// RecommendationService manages background recommendation generation
type RecommendationService struct {
	dataPath        string
	lockPath        string
	strategies      []string
	btcETHLeverage  int
	altcoinLeverage int
	updateInterval  time.Duration
	stopChan        chan struct{}
}

// NewRecommendationService creates a new recommendation service
func NewRecommendationService(dataPath, lockPath string, strategies []string, btcETHLeverage, altcoinLeverage int, updateInterval time.Duration) *RecommendationService {
	return &RecommendationService{
		dataPath:        dataPath,
		lockPath:        lockPath,
		strategies:      strategies,
		btcETHLeverage:  btcETHLeverage,
		altcoinLeverage: altcoinLeverage,
		updateInterval:  updateInterval,
		stopChan:        make(chan struct{}),
	}
}

// Start starts the background service
func (s *RecommendationService) Start() {
	ticker := time.NewTicker(s.updateInterval)
	defer ticker.Stop()

	// Generate initial recommendations
	s.generateAndSave()

	for {
		select {
		case <-ticker.C:
			s.generateAndSave()
			s.updateOutcomes()
		case <-s.stopChan:
			return
		}
	}
}

// Stop stops the background service
func (s *RecommendationService) Stop() {
	close(s.stopChan)
}

// generateAndSave generates and saves recommendations
func (s *RecommendationService) generateAndSave() {
	// Try to acquire lock
	lock, err := AcquireLockFile(s.lockPath)
	if err != nil {
		log.Printf("Failed to acquire lock for recommendation generation: %v", err)
		return
	}
	defer lock.Release()

	// Generate a unique generation_id for this run
	generationID := time.Now().Format(time.RFC3339Nano)

	response, err := GenerateRecommendations(s.strategies, 10, s.btcETHLeverage, s.altcoinLeverage)
	if err != nil {
		log.Printf("Failed to generate recommendations: %v", err)
		return
	}

	// Load existing recommendations
	data, err := LoadRecommendations(s.dataPath)
	if err != nil {
		log.Printf("Failed to load existing recommendations: %v", err)
		return
	}

	// Prune old recommendations (keep last 7 days)
	PruneOldRecommendations(data, 7*24*time.Hour)

	// Convert and add new recommendations
	for _, strategyRecs := range response.Strategies {
		// Add major coins for this strategy
		for _, rec := range strategyRecs.MajorCoins {
			storedRec := ConvertRecommendationToStored(&rec, generationID)
			data.Recommendations = append(data.Recommendations, storedRec)
		}

		// Add altcoins for this strategy
		for _, rec := range strategyRecs.Altcoins {
			storedRec := ConvertRecommendationToStored(&rec, generationID)
			data.Recommendations = append(data.Recommendations, storedRec)
		}
	}

	// Save to JSON file
	if err := SaveRecommendations(s.dataPath, data); err != nil {
		log.Printf("ERROR: Failed to save recommendations: %v", err)
	} else {
		log.Printf("✓ Saved %d recommendations with generation_id: %s", len(data.Recommendations), generationID)
	}
}

// updateOutcomes updates outcomes for pending recommendations
func (s *RecommendationService) updateOutcomes() {
	// Try to acquire lock
	lock, err := AcquireLockFile(s.lockPath)
	if err != nil {
		log.Printf("Failed to acquire lock for outcome update: %v", err)
		return
	}
	defer lock.Release()

	// Load existing recommendations
	data, err := LoadRecommendations(s.dataPath)
	if err != nil {
		log.Printf("Failed to load recommendations for outcome update: %v", err)
		return
	}

	// Create a map of existing outcomes by recommendation ID for quick lookup
	outcomeMap := make(map[string]*StoredOutcome)
	for i := range data.Outcomes {
		outcomeMap[data.Outcomes[i].RecommendationID] = &data.Outcomes[i]
	}

	// Process recommendations from last 24 hours
	cutoff := time.Now().Add(-24 * time.Hour)
	updated := false

	for i := range data.Recommendations {
		rec := &data.Recommendations[i]
		if rec.CreatedAt.Before(cutoff) {
			continue
		}

		// Get current price
		marketData, err := market.Get(rec.Symbol)
		if err != nil {
			continue
		}

		priceChange := ((marketData.CurrentPrice - rec.CurrentPrice) / rec.CurrentPrice) * 100
		if rec.Direction == "short" {
			priceChange = -priceChange
		}

		outcome := "pending"
		if time.Since(rec.CreatedAt) >= 1*time.Hour {
			if priceChange > 2.0 {
				outcome = "profitable"
			} else if priceChange < -2.0 {
				outcome = "loss"
			} else {
				outcome = "neutral"
			}
		}

		// Get or create outcome
		existingOutcome, exists := outcomeMap[rec.ID]
		if !exists {
			// Create new outcome
			newOutcome := StoredOutcome{
				RecommendationID: rec.ID,
				Outcome:          outcome,
				PriceChange1h:     priceChange,
				MaxGain:           priceChange,
				MaxLoss:           priceChange,
				UpdatedAt:         time.Now(),
			}
			data.Outcomes = append(data.Outcomes, newOutcome)
			outcomeMap[rec.ID] = &data.Outcomes[len(data.Outcomes)-1]
			updated = true
		} else {
			// Update existing outcome
			existingOutcome.Outcome = outcome
			existingOutcome.PriceChange1h = priceChange

			// Calculate max_gain: update if current priceChange > existing max_gain
			if priceChange > existingOutcome.MaxGain {
				existingOutcome.MaxGain = priceChange
			}

			// Calculate max_loss: update if current priceChange < existing max_loss
			if priceChange < existingOutcome.MaxLoss {
				existingOutcome.MaxLoss = priceChange
			}

			existingOutcome.UpdatedAt = time.Now()
			updated = true
		}
	}

	// Save if we made any updates
	if updated {
		if err := SaveRecommendations(s.dataPath, data); err != nil {
			log.Printf("Failed to save updated outcomes: %v", err)
		}
	}
}

