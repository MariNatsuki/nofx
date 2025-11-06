import { useState, useEffect } from 'react'
import { api } from '../lib/api'
import StrategySelector from '../components/StrategySelector'
import CategorySection from '../components/CategorySection'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import { Loader2, RefreshCw } from 'lucide-react'

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

interface RecommendationResponse {
  major_coins: Recommendation[]
  altcoins: Recommendation[]
  strategies_applied: string[]
  updated_at: string
  btc_status: string
}

export default function RecommendationsPage() {
  const { language } = useLanguage()
  const [selectedStrategies, setSelectedStrategies] = useState([
    'risk_first',
    'adaptive_relaxed',
  ])
  const [recommendations, setRecommendations] =
    useState<RecommendationResponse | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [countdown, setCountdown] = useState(180) // 3 minutes
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadRecommendations = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getRecommendations(selectedStrategies, 10)
      setRecommendations(data)
      setCountdown(180)
    } catch (err) {
      console.error('Failed to load recommendations:', err)
      setError('Failed to load recommendations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecommendations()
  }, [selectedStrategies])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          loadRecommendations()
          return 180
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [autoRefresh, selectedStrategies])

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {t('recommendations.title', language)}
        </h1>

        {/* Strategy Selector */}
        <StrategySelector
          selectedStrategies={selectedStrategies}
          onChange={setSelectedStrategies}
        />

        {/* Controls */}
        <div className="flex items-center gap-4 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4"
            />
            <span>{t('recommendations.autoRefresh', language)}</span>
          </label>

          {autoRefresh && (
            <span className="text-sm text-gray-600">
              {t('recommendations.nextUpdate', language)}:{' '}
              {formatCountdown(countdown)}
            </span>
          )}

          <button
            onClick={loadRecommendations}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('common.loading', language)}
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                {t('recommendations.refreshNow', language)}
              </>
            )}
          </button>
        </div>

        {/* BTC Status Badge */}
        {recommendations && (
          <div className="mt-4">
            <span
              className={`px-3 py-1 rounded text-sm ${
                recommendations.btc_status === 'bullish'
                  ? 'bg-green-100 text-green-800'
                  : recommendations.btc_status === 'bearish'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
              }`}
            >
              BTC: {recommendations.btc_status.toUpperCase()}
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && !recommendations && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      )}

      {/* Major Coins Section */}
      {recommendations && (
        <CategorySection
          title={t('recommendations.majorCoins', language)}
          coins={recommendations.major_coins}
          icon="📊"
        />
      )}

      {/* Altcoins Section */}
      {recommendations && (
        <CategorySection
          title={t('recommendations.altcoins', language)}
          coins={recommendations.altcoins}
          icon="🪙"
        />
      )}

      {/* Performance Section */}
      {recommendations && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            {t('recommendations.performance', language)}
          </h2>
          <p className="text-gray-600">
            Performance tracking will be available after recommendations have
            been tracked for some time.
          </p>
        </div>
      )}
    </div>
  )
}
