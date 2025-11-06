import { useState, useEffect } from 'react'
import { api } from '../lib/api'
import StrategySelector from '../components/StrategySelector'
import CategorySection from '../components/CategorySection'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import { Loader2, RefreshCw } from 'lucide-react'
import type { RecommendationResponse } from '../types/recommendation'

export default function RecommendationsPage() {
  const { language } = useLanguage()
  const [selectedStrategy, setSelectedStrategy] = useState('risk_first')
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
      const data = await api.getRecommendations(selectedStrategy, 10)
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
  }, [selectedStrategy])

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
  }, [autoRefresh, selectedStrategy])

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ background: '#0B0E11', minHeight: '100vh' }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#EAECEF' }}>
          {t('recommendations.title', language)}
        </h1>

        {/* Strategy Selector */}
        <StrategySelector
          selectedStrategy={selectedStrategy}
          onChange={setSelectedStrategy}
        />

        {/* Controls */}
        <div className="flex items-center gap-4 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4"
              style={{ accentColor: '#F0B90B' }}
            />
            <span style={{ color: '#848E9C' }}>
              {t('recommendations.autoRefresh', language)}
            </span>
          </label>

          {autoRefresh && (
            <span className="text-sm" style={{ color: '#848E9C' }}>
              {t('recommendations.nextUpdate', language)}:{' '}
              {formatCountdown(countdown)}
            </span>
          )}

          <button
            onClick={loadRecommendations}
            disabled={loading}
            className="px-4 py-2 rounded transition-all hover:scale-105 disabled:opacity-50 flex items-center gap-2"
            style={{
              background: loading
                ? '#1E2329'
                : 'linear-gradient(135deg, #F0B90B 0%, #FCD535 100%)',
              color: loading ? '#848E9C' : '#0B0E11',
              border: loading ? '1px solid #2B3139' : 'none',
            }}
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
              className="px-3 py-1 rounded text-sm"
              style={{
                background:
                  recommendations.btc_status === 'bullish'
                    ? 'rgba(34, 197, 94, 0.15)'
                    : recommendations.btc_status === 'bearish'
                      ? 'rgba(246, 70, 93, 0.15)'
                      : 'rgba(132, 142, 156, 0.15)',
                color:
                  recommendations.btc_status === 'bullish'
                    ? '#22C55E'
                    : recommendations.btc_status === 'bearish'
                      ? '#F6465D'
                      : '#848E9C',
              }}
            >
              BTC: {recommendations.btc_status.toUpperCase()}
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            className="mt-4 p-3 rounded"
            style={{
              background: 'rgba(246, 70, 93, 0.1)',
              color: '#F6465D',
              border: '1px solid rgba(246, 70, 93, 0.2)',
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && !recommendations && (
        <div className="flex justify-center items-center py-12">
          <Loader2
            className="w-8 h-8 animate-spin"
            style={{ color: '#F0B90B' }}
          />
        </div>
      )}

      {/* Display recommendations grouped by strategy */}
      {recommendations &&
        Object.entries(recommendations.strategies).map(
          ([strategyName, strategyRecs]) => (
            <div key={strategyName} className="mb-12">
              <h2
                className="text-2xl font-bold mb-6 capitalize"
                style={{ color: '#EAECEF' }}
              >
                {strategyName.replace(/_/g, ' ')}
              </h2>

              {/* Major Coins Section */}
              <CategorySection
                title={t('recommendations.majorCoins', language)}
                coins={strategyRecs.major_coins}
                icon="📊"
              />

              {/* Altcoins Section */}
              <CategorySection
                title={t('recommendations.altcoins', language)}
                coins={strategyRecs.altcoins}
                icon="🪙"
              />
            </div>
          )
        )}

      {/* Performance Section */}
      {recommendations && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#EAECEF' }}>
            {t('recommendations.performance', language)}
          </h2>
          <p style={{ color: '#848E9C' }}>
            Performance tracking will be available after recommendations have
            been tracked for some time.
          </p>
        </div>
      )}
    </div>
  )
}
