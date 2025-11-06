import { StrategiesLayout } from '../components/strategies/StrategiesLayout'
import { useLanguage } from '../contexts/LanguageContext'

/**
 * Trading Strategies Page
 *
 * This page displays information about all available trading strategies.
 *
 * HeaderBar 和 Footer 由主 App 组件提供
 */
export function StrategiesPage() {
  const { language } = useLanguage()

  return <StrategiesLayout language={language} />
}
