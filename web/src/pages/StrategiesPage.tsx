import HeaderBar from '../components/landing/HeaderBar'
import { StrategiesLayout } from '../components/strategies/StrategiesLayout'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { useSystemConfig } from '../hooks/useSystemConfig'
import { t } from '../i18n/translations'

/**
 * Trading Strategies Page
 *
 * This page displays information about all available trading strategies.
 * It follows the same structure as FAQPage for consistency.
 */
export function StrategiesPage() {
  const { language, setLanguage } = useLanguage()
  const { user, logout } = useAuth()
  const { config: systemConfig } = useSystemConfig()

  return (
    <div
      className="min-h-screen"
      style={{ background: '#000000', color: '#EAECEF' }}
    >
      <HeaderBar
        isLoggedIn={!!user}
        currentPage="strategies"
        language={language}
        onLanguageChange={setLanguage}
        user={user}
        onLogout={logout}
        isAdminMode={systemConfig?.admin_mode}
        onPageChange={(page) => {
          if (page === 'competition') {
            window.history.pushState({}, '', '/competition')
            window.location.href = '/competition'
          } else if (page === 'traders') {
            window.history.pushState({}, '', '/traders')
            window.location.href = '/traders'
          } else if (page === 'trader') {
            window.history.pushState({}, '', '/dashboard')
            window.location.href = '/dashboard'
          } else if (page === 'faq') {
            window.history.pushState({}, '', '/faq')
            window.location.href = '/faq'
          } else if (page === 'strategies') {
            window.history.pushState({}, '', '/strategies')
            window.location.href = '/strategies'
          }
        }}
      />

      <StrategiesLayout language={language} />

      {/* Footer */}
      <footer
        className="mt-16"
        style={{ borderTop: '1px solid #2B3139', background: '#181A20' }}
      >
        <div
          className="max-w-7xl mx-auto px-6 py-6 text-center text-sm"
          style={{ color: '#5E6673' }}
        >
          <p>{t('footerTitle', language)}</p>
          <p className="mt-1">{t('footerWarning', language)}</p>
        </div>
      </footer>
    </div>
  )
}
