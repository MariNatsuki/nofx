package recommender

// loadStrategyConfigs loads configuration for each selected strategy
func loadStrategyConfigs(strategyNames []string) []StrategyConfig {
	configs := []StrategyConfig{}

	for _, name := range strategyNames {
		switch name {
		case "risk_first":
			configs = append(configs, StrategyConfig{
				Name:              "risk_first",
				MinChecklistItems: 3,
				MinConfidence:     85,
				RSIThresholdLong:  30,
				RSIThresholdShort: 70,
				VolumeThreshold:   1.5,
				OIThreshold:       5.0,
				MinTimeframes:     3,
			})
		case "adaptive_relaxed":
			configs = append(configs, StrategyConfig{
				Name:              "adaptive_relaxed",
				MinChecklistItems: 4,
				MinConfidence:     80,
				RSIThresholdLong:  45,
				RSIThresholdShort: 60,
				VolumeThreshold:   1.3,
				OIThreshold:       3.0,
				MinTimeframes:     2,
			})
		case "adaptive":
			configs = append(configs, StrategyConfig{
				Name:              "adaptive",
				MinChecklistItems: 5,
				MinConfidence:     85,
				RSIThresholdLong:  35,
				RSIThresholdShort: 65,
				VolumeThreshold:   1.5,
				OIThreshold:       5.0,
				MinTimeframes:     3,
			})
		case "nof1":
			configs = append(configs, StrategyConfig{
				Name:              "nof1",
				MinChecklistItems: 3,
				MinConfidence:     75,
				RSIThresholdLong:  30,
				RSIThresholdShort: 70,
				VolumeThreshold:   1.5,
				OIThreshold:       5.0,
				MinTimeframes:     2,
			})
		case "Hansen":
			configs = append(configs, StrategyConfig{
				Name:              "Hansen",
				MinChecklistItems: 3,
				MinConfidence:     85,
				RSIThresholdLong:  30,
				RSIThresholdShort: 70,
				VolumeThreshold:   1.5,
				OIThreshold:       5.0,
				MinTimeframes:     3,
			})
		case "taro_long_prompts":
			configs = append(configs, StrategyConfig{
				Name:              "taro_long_prompts",
				MinChecklistItems: 3,
				MinConfidence:     75,
				RSIThresholdLong:  30,
				RSIThresholdShort: 70,
				VolumeThreshold:   1.5,
				OIThreshold:       5.0,
				MinTimeframes:     2,
			})
		default:
			// Default strategy
			configs = append(configs, StrategyConfig{
				Name:              "default",
				MinChecklistItems: 3,
				MinConfidence:     75,
				RSIThresholdLong:  30,
				RSIThresholdShort: 70,
				VolumeThreshold:   1.5,
				OIThreshold:       5.0,
				MinTimeframes:     2,
			})
		}
	}

	return configs
}

