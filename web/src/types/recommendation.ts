// Shared type definitions for recommendations

export interface Recommendation {
  symbol: string
  score: number
  confidence: number
  direction: string
  strategy: string
  reasoning: string
  current_price: number
  suggested_leverage: number
}

export interface StrategyRecommendations {
  major_coins: Recommendation[]
  altcoins: Recommendation[]
}

export interface RecommendationResponse {
  strategies: Record<string, StrategyRecommendations>
  updated_at: string
  btc_status: string
}

