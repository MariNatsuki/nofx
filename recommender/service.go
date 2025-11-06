package recommender

import (
	"encoding/json"
	"log"
	"nofx/config"
	"nofx/market"
	"time"
)

// RecommendationService manages background recommendation generation
type RecommendationService struct {
	db              *config.Database
	strategies      []string
	btcETHLeverage  int
	altcoinLeverage int
	updateInterval  time.Duration
	stopChan        chan struct{}
}

// NewRecommendationService creates a new recommendation service
func NewRecommendationService(db *config.Database, strategies []string, btcETHLeverage, altcoinLeverage int) *RecommendationService {
	return &RecommendationService{
		db:              db,
		strategies:      strategies,
		btcETHLeverage:  btcETHLeverage,
		altcoinLeverage: altcoinLeverage,
		updateInterval:  3 * time.Minute,
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
	response, err := GenerateRecommendations(s.strategies, 10, s.btcETHLeverage, s.altcoinLeverage)
	if err != nil {
		log.Printf("Failed to generate recommendations: %v", err)
		return
	}

	// Save major coins
	for _, rec := range response.MajorCoins {
		s.saveRecommendation(&rec)
	}

	// Save altcoins
	for _, rec := range response.Altcoins {
		s.saveRecommendation(&rec)
	}
}

// saveRecommendation saves a recommendation to the database
func (s *RecommendationService) saveRecommendation(rec *Recommendation) error {
	strategiesJSON, _ := json.Marshal(rec.Strategies)
	technicalJSON, _ := json.Marshal(rec.TechnicalData)

	_, err := s.db.Exec(`
		INSERT INTO recommendations 
		(symbol, coin_category, score, confidence, direction, strategies, reasoning, 
		 price_at_recommendation, leverage_suggested, technical_snapshot, created_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, rec.Symbol, rec.Category, rec.Score, rec.Confidence, rec.Direction,
		string(strategiesJSON), rec.Reasoning, rec.CurrentPrice, rec.SuggestedLeverage,
		string(technicalJSON), rec.CreatedAt)

	return err
}

// updateOutcomes updates outcomes for pending recommendations
func (s *RecommendationService) updateOutcomes() {
	// Get all recommendations from last 24 hours, including existing outcomes
	rows, err := s.db.Query(`
		SELECT r.id, r.symbol, r.direction, r.price_at_recommendation, r.created_at,
		       ro.max_gain, ro.max_loss
		FROM recommendations r
		LEFT JOIN recommendation_outcomes ro ON r.id = ro.recommendation_id
		WHERE r.created_at > datetime('now', '-24 hours')
	`)
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		var recID int
		var symbol, direction string
		var priceAtRec float64
		var createdAt time.Time
		var existingMaxGain, existingMaxLoss *float64

		rows.Scan(&recID, &symbol, &direction, &priceAtRec, &createdAt, &existingMaxGain, &existingMaxLoss)

		// Get current price
		marketData, err := market.Get(symbol)
		if err != nil {
			continue
		}

		priceChange := ((marketData.CurrentPrice - priceAtRec) / priceAtRec) * 100
		if direction == "short" {
			priceChange = -priceChange
		}

		outcome := "pending"
		if time.Since(createdAt) >= 1*time.Hour {
			if priceChange > 2.0 {
				outcome = "profitable"
			} else if priceChange < -2.0 {
				outcome = "loss"
			} else {
				outcome = "neutral"
			}
		}

		// Calculate max_gain: update if current priceChange > existing max_gain (or initialize if null)
		maxGain := priceChange
		if existingMaxGain != nil && *existingMaxGain > priceChange {
			maxGain = *existingMaxGain
		}

		// Calculate max_loss: update if current priceChange < existing max_loss (or initialize if null)
		maxLoss := priceChange
		if existingMaxLoss != nil && *existingMaxLoss < priceChange {
			maxLoss = *existingMaxLoss
		}

		s.db.Exec(`
			INSERT OR REPLACE INTO recommendation_outcomes 
			(recommendation_id, outcome, price_change_1h, max_gain, max_loss, updated_at)
			VALUES (?, ?, ?, ?, ?, datetime('now'))
		`, recID, outcome, priceChange, maxGain, maxLoss)
	}
}

