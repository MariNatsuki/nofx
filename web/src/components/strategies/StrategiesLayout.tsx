import { Target } from 'lucide-react'
import { t, type Language } from '../../i18n/translations'
import { StrategiesContent } from './StrategiesContent'

interface StrategiesLayoutProps {
  language: Language
}

export function StrategiesLayout({ language }: StrategiesLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #F0B90B 0%, #FCD535 100%)',
              boxShadow: '0 8px 24px rgba(240, 185, 11, 0.4)',
            }}
          >
            <Target className="w-8 h-8" style={{ color: '#0B0E11' }} />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#EAECEF' }}>
          {t('strategiesTitle', language)}
        </h1>
        <p className="text-lg mb-8" style={{ color: '#848E9C' }}>
          {t('strategiesSubtitle', language)}
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <StrategiesContent language={language} />
      </main>

      {/* Contact Section */}
      <div
        className="mt-16 p-8 rounded-lg text-center"
        style={{
          background:
            'linear-gradient(135deg, rgba(240, 185, 11, 0.1) 0%, rgba(252, 213, 53, 0.05) 100%)',
          border: '1px solid rgba(240, 185, 11, 0.2)',
        }}
      >
        <h3 className="text-xl font-bold mb-3" style={{ color: '#EAECEF' }}>
          {t('strategiesStillHaveQuestions', language)}
        </h3>
        <p className="mb-6" style={{ color: '#848E9C' }}>
          {t('strategiesContactUs', language)}
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/tinkle-community/nofx"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              background: '#1E2329',
              color: '#EAECEF',
              border: '1px solid #2B3139',
            }}
          >
            GitHub
          </a>
          <a
            href="https://t.me/nofx_dev_community"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #F0B90B 0%, #FCD535 100%)',
              color: '#0B0E11',
            }}
          >
            {t('community', language)}
          </a>
        </div>
      </div>
    </div>
  )
}
