import { useState } from 'react'

interface Recommendation {
  symbol: string
  score: number
  confidence: number
  direction: string
  strategies: string[]
  reasoning: string
  current_price: number
  suggested_leverage: number
}

interface RecommendationCardProps {
  recommendation: Recommendation
}

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false)

  const scoreColor =
    recommendation.score >= 75
      ? 'bg-green-600'
      : recommendation.score >= 60
        ? 'bg-yellow-600'
        : 'bg-red-600'

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold">{recommendation.symbol}</h3>
          <p className="text-sm text-gray-600">
            ${recommendation.current_price.toFixed(2)}
          </p>
        </div>

        <div className={`px-3 py-1 rounded text-white ${scoreColor}`}>
          {recommendation.score.toFixed(0)}
        </div>
      </div>

      {/* Direction & Confidence */}
      <div className="flex gap-2 mb-3">
        <span
          className={`px-2 py-1 rounded text-xs ${
            recommendation.direction === 'long'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {recommendation.direction.toUpperCase()}
        </span>

        <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
          {recommendation.confidence}% confidence
        </span>

        <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
          {recommendation.suggested_leverage}x leverage
        </span>
      </div>

      {/* Strategies */}
      <div className="mb-3">
        <div className="flex flex-wrap gap-1">
          {recommendation.strategies.map((strategy) => (
            <span
              key={strategy}
              className="text-xs px-2 py-1 bg-gray-100 rounded"
            >
              {strategy}
            </span>
          ))}
        </div>
      </div>

      {/* Reasoning (expandable) */}
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-600 hover:underline"
        >
          {expanded ? 'Hide' : 'Show'} reasoning
        </button>

        {expanded && (
          <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-2 rounded">
            {recommendation.reasoning}
          </div>
        )}
      </div>
    </div>
  )
}
