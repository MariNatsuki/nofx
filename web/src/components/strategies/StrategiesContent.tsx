import { t, type Language } from '../../i18n/translations'

interface StrategiesContentProps {
  language: Language
}

export function StrategiesContent({ language }: StrategiesContentProps) {
  return (
    <div className="space-y-12">
      {/* Introduction Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#EAECEF' }}>
          {t('strategiesIntroductionTitle', language)}
        </h2>
        <div
          className="prose prose-invert max-w-none"
          style={{
            color: '#B7BDC6',
            lineHeight: '1.7',
          }}
        >
          <p className="text-base">{t('strategiesIntroduction', language)}</p>
        </div>
      </section>

      {/* Strategy Comparison Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#EAECEF' }}>
          {t('strategiesComparisonTitle', language)}
        </h2>
        <div
          className="prose prose-invert max-w-none"
          style={{
            color: '#B7BDC6',
            lineHeight: '1.7',
          }}
        >
          <p className="text-base mb-4">
            {t('strategiesComparisonIntro', language)}
          </p>
          <div
            className="p-4 rounded-lg"
            style={{
              background: '#1E2329',
              border: '1px solid #2B3139',
            }}
          >
            <pre
              className="text-sm whitespace-pre-wrap font-mono"
              style={{ color: '#B7BDC6' }}
            >
              {t('strategiesComparisonTable', language)}
            </pre>
          </div>
        </div>
      </section>

      {/* Individual Strategy Sections */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#EAECEF' }}>
          {t('strategiesDetailsTitle', language)}
        </h2>

        {/* Default Strategy */}
        <div className="mb-8">
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: '#EAECEF' }}
          >
            {t('strategyDefaultTitle', language)}
          </h3>
          <div
            className="prose prose-invert max-w-none"
            style={{
              color: '#B7BDC6',
              lineHeight: '1.7',
            }}
          >
            <p className="text-base">
              {t('strategyDefaultDescription', language)}
            </p>
          </div>
        </div>

        {/* Adaptive Strategy */}
        <div className="mb-8">
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: '#EAECEF' }}
          >
            {t('strategyAdaptiveTitle', language)}
          </h3>
          <div
            className="prose prose-invert max-w-none"
            style={{
              color: '#B7BDC6',
              lineHeight: '1.7',
            }}
          >
            <p className="text-base">
              {t('strategyAdaptiveDescription', language)}
            </p>
          </div>
        </div>

        {/* Adaptive Relaxed Strategy */}
        <div className="mb-8">
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: '#EAECEF' }}
          >
            {t('strategyAdaptiveRelaxedTitle', language)}
          </h3>
          <div
            className="prose prose-invert max-w-none"
            style={{
              color: '#B7BDC6',
              lineHeight: '1.7',
            }}
          >
            <p className="text-base">
              {t('strategyAdaptiveRelaxedDescription', language)}
            </p>
          </div>
        </div>

        {/* Risk First Strategy */}
        <div className="mb-8">
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: '#EAECEF' }}
          >
            {t('strategyRiskFirstTitle', language)}
          </h3>
          <div
            className="prose prose-invert max-w-none"
            style={{
              color: '#B7BDC6',
              lineHeight: '1.7',
            }}
          >
            <p className="text-base">
              {t('strategyRiskFirstDescription', language)}
            </p>
          </div>
        </div>

        {/* NOF1 Strategy */}
        <div className="mb-8">
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: '#EAECEF' }}
          >
            {t('strategyNof1Title', language)}
          </h3>
          <div
            className="prose prose-invert max-w-none"
            style={{
              color: '#B7BDC6',
              lineHeight: '1.7',
            }}
          >
            <p className="text-base">
              {t('strategyNof1Description', language)}
            </p>
          </div>
        </div>

        {/* Hansen Strategy */}
        <div className="mb-8">
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: '#EAECEF' }}
          >
            {t('strategyHansenTitle', language)}
          </h3>
          <div
            className="prose prose-invert max-w-none"
            style={{
              color: '#B7BDC6',
              lineHeight: '1.7',
            }}
          >
            <p className="text-base">
              {t('strategyHansenDescription', language)}
            </p>
          </div>
        </div>

        {/* Taro Long Strategy */}
        <div className="mb-8">
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: '#EAECEF' }}
          >
            {t('strategyTaroLongTitle', language)}
          </h3>
          <div
            className="prose prose-invert max-w-none"
            style={{
              color: '#B7BDC6',
              lineHeight: '1.7',
            }}
          >
            <p className="text-base">
              {t('strategyTaroLongDescription', language)}
            </p>
          </div>
        </div>
      </section>

      {/* How to Choose Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#EAECEF' }}>
          {t('strategiesHowToChooseTitle', language)}
        </h2>
        <div
          className="prose prose-invert max-w-none"
          style={{
            color: '#B7BDC6',
            lineHeight: '1.7',
          }}
        >
          <p className="text-base">{t('strategiesHowToChoose', language)}</p>
        </div>
      </section>

      {/* Customization Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#EAECEF' }}>
          {t('strategiesCustomizationTitle', language)}
        </h2>
        <div
          className="prose prose-invert max-w-none"
          style={{
            color: '#B7BDC6',
            lineHeight: '1.7',
          }}
        >
          <p className="text-base">{t('strategiesCustomization', language)}</p>
        </div>
      </section>

      {/* Divider */}
      <div className="mt-6 h-px" style={{ background: '#2B3139' }} />
    </div>
  )
}
