import { useState } from 'react'
import type { Recommendation } from '../types/recommendation'

interface RecommendationCardProps {
  recommendation: Recommendation
}

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false)

  const score = recommendation.score ?? 0
  const scoreBgColor =
    score >= 75
      ? 'rgba(34, 197, 94, 0.15)'
      : score >= 60
        ? 'rgba(240, 185, 11, 0.15)'
        : 'rgba(246, 70, 93, 0.15)'
  const scoreTextColor =
    score >= 75 ? '#22C55E' : score >= 60 ? '#F0B90B' : '#F6465D'

  return (
    <div
      className="border rounded-lg p-4 transition-all hover:translate-y-[-1px]"
      style={{
        background: '#0B0E11',
        border: '1px solid #2B3139',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#3D4551'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2B3139'
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold" style={{ color: '#EAECEF' }}>
            {recommendation.symbol}
          </h3>
          <p className="text-sm" style={{ color: '#848E9C' }}>
            ${(recommendation.current_price ?? 0).toFixed(2)}
          </p>
        </div>

        <div
          className="px-3 py-1 rounded font-semibold"
          style={{
            background: scoreBgColor,
            color: scoreTextColor,
          }}
        >
          {(recommendation.score ?? 0).toFixed(0)}
        </div>
      </div>

      {/* Direction & Confidence */}
      <div className="flex gap-2 mb-3">
        <span
          className="px-2 py-1 rounded text-xs"
          style={{
            background:
              (recommendation.direction ?? 'long') === 'long'
                ? 'rgba(34, 197, 94, 0.15)'
                : 'rgba(246, 70, 93, 0.15)',
            color:
              (recommendation.direction ?? 'long') === 'long'
                ? '#22C55E'
                : '#F6465D',
          }}
        >
          {(recommendation.direction ?? 'long').toUpperCase()}
        </span>

        <span
          className="px-2 py-1 rounded text-xs"
          style={{
            background: 'rgba(59, 130, 246, 0.15)',
            color: '#3B82F6',
          }}
        >
          {recommendation.confidence ?? 0}% confidence
        </span>

        <span
          className="px-2 py-1 rounded text-xs"
          style={{
            background: 'rgba(168, 85, 247, 0.15)',
            color: '#A855F7',
          }}
        >
          {recommendation.suggested_leverage ?? 0}x leverage
        </span>
      </div>

      {/* Strategy */}
      {recommendation.strategy && (
        <div className="mb-3">
          <span
            className="text-xs px-2 py-1 rounded capitalize"
            style={{
              background: '#1E2329',
              color: '#B7BDC6',
              border: '1px solid #2B3139',
            }}
          >
            {recommendation.strategy.replace(/_/g, ' ')}
          </span>
        </div>
      )}

      {/* Reasoning (expandable) */}
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm transition-colors hover:underline"
          style={{ color: '#F0B90B' }}
        >
          {expanded ? 'Hide' : 'Show'} reasoning
        </button>

        {expanded && (
          <div
            className="mt-2 text-sm whitespace-pre-wrap p-2 rounded"
            style={{
              background: '#1E2329',
              color: '#B7BDC6',
              border: '1px solid #2B3139',
            }}
          >
            {recommendation.reasoning?.replace(/;\s+/g, '\n').replace(/\s+\|\s+/g, '\n')}
          </div>
        )}
      </div>
    </div>
  )
}
