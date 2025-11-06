import { useState } from 'react'
import type { TraderConfigData } from '../types'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'

// 提取下划线后面的名称部分
function getShortName(fullName: string): string {
  const parts = fullName.split('_')
  return parts.length > 1 ? parts[parts.length - 1] : fullName
}

interface TraderConfigViewModalProps {
  isOpen: boolean
  onClose: () => void
  traderData?: TraderConfigData | null
}

export function TraderConfigViewModal({
  isOpen,
  onClose,
  traderData,
}: TraderConfigViewModalProps) {
  const { language } = useLanguage()
  const [copiedField, setCopiedField] = useState<string | null>(null)

  if (!isOpen || !traderData) return null

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const CopyButton = ({
    text,
    fieldName,
  }: {
    text: string
    fieldName: string
  }) => (
    <button
      onClick={() => copyToClipboard(text, fieldName)}
      className="ml-2 px-2 py-1 text-xs rounded transition-all duration-200 hover:scale-105"
      style={{
        background:
          copiedField === fieldName
            ? 'rgba(14, 203, 129, 0.1)'
            : 'rgba(240, 185, 11, 0.1)',
        color: copiedField === fieldName ? '#0ECB81' : '#F0B90B',
        border: `1px solid ${copiedField === fieldName ? 'rgba(14, 203, 129, 0.3)' : 'rgba(240, 185, 11, 0.3)'}`,
      }}
    >
      {copiedField === fieldName
        ? t('copied', language)
        : t('copyButton', language)}
    </button>
  )

  const InfoRow = ({
    label,
    value,
    copyable = false,
    fieldName = '',
  }: {
    label: string
    value: string | number | boolean
    copyable?: boolean
    fieldName?: string
  }) => (
    <div className="flex justify-between items-start py-2 border-b border-[#2B3139] last:border-b-0">
      <span className="text-sm text-[#848E9C] font-medium">{label}</span>
      <div className="flex items-center text-right">
        <span className="text-sm text-[#EAECEF] font-mono">
          {typeof value === 'boolean'
            ? value
              ? t('yes', language)
              : t('no', language)
            : value}
        </span>
        {copyable && typeof value === 'string' && value && (
          <CopyButton text={value} fieldName={fieldName} />
        )}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2B3139] bg-gradient-to-r from-[#1E2329] to-[#252B35]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F0B90B] to-[#E1A706] flex items-center justify-center">
              <span className="text-lg">👁️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#EAECEF]">
                {t('traderConfig', language)}
              </h2>
              <p className="text-sm text-[#848E9C] mt-1">
                {t('traderConfigInfo', language, {
                  name: traderData.trader_name,
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Running Status */}
            <div
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
              style={
                traderData.is_running
                  ? { background: 'rgba(14, 203, 129, 0.1)', color: '#0ECB81' }
                  : { background: 'rgba(246, 70, 93, 0.1)', color: '#F6465D' }
              }
            >
              <span>{traderData.is_running ? '●' : '○'}</span>
              {traderData.is_running
                ? t('running', language)
                : t('stopped', language)}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-[#848E9C] hover:text-[#EAECEF] hover:bg-[#2B3139] transition-colors flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="bg-[#0B0E11] border border-[#2B3139] rounded-lg p-5">
            <h3 className="text-lg font-semibold text-[#EAECEF] mb-4 flex items-center gap-2">
              {t('basicInfo', language)}
            </h3>
            <div className="space-y-3">
              <InfoRow
                label={t('traderId', language)}
                value={traderData.trader_id || ''}
                copyable
                fieldName="trader_id"
              />
              <InfoRow
                label={t('traderName', language)}
                value={traderData.trader_name}
                copyable
                fieldName="trader_name"
              />
              <InfoRow
                label={t('aiModel', language)}
                value={getShortName(traderData.ai_model).toUpperCase()}
              />
              <InfoRow
                label={t('exchange', language)}
                value={getShortName(traderData.exchange_id).toUpperCase()}
              />
              <InfoRow
                label={t('initialBalance', language)}
                value={`$${traderData.initial_balance.toLocaleString()}`}
              />
            </div>
          </div>

          {/* Trading Configuration */}
          <div className="bg-[#0B0E11] border border-[#2B3139] rounded-lg p-5">
            <h3 className="text-lg font-semibold text-[#EAECEF] mb-4 flex items-center gap-2">
              {t('tradingConfig', language)}
            </h3>
            <div className="space-y-3">
              <InfoRow
                label={t('marginMode', language)}
                value={
                  traderData.is_cross_margin
                    ? t('crossMargin', language)
                    : t('isolatedMargin', language)
                }
              />
              <InfoRow
                label={t('btcEthLeverageLabel', language)}
                value={`${traderData.btc_eth_leverage}x`}
              />
              <InfoRow
                label={t('altcoinLeverageLabel', language)}
                value={`${traderData.altcoin_leverage}x`}
              />
              <InfoRow
                label={t('tradingSymbolsLabel', language)}
                value={
                  traderData.trading_symbols || t('useDefaultSymbols', language)
                }
                copyable
                fieldName="trading_symbols"
              />
            </div>
          </div>

          {/* Signal Sources */}
          <div className="bg-[#0B0E11] border border-[#2B3139] rounded-lg p-5">
            <h3 className="text-lg font-semibold text-[#EAECEF] mb-4 flex items-center gap-2">
              {t('signalSourceConfig', language)}
            </h3>
            <div className="space-y-3">
              <InfoRow
                label={t('coinPoolSignal', language)}
                value={traderData.use_coin_pool}
              />
              <InfoRow
                label={t('oiTopSignal', language)}
                value={traderData.use_oi_top}
              />
            </div>
          </div>

          {/* Custom Prompt */}
          <div className="bg-[#0B0E11] border border-[#2B3139] rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#EAECEF] flex items-center gap-2">
                {t('tradingStrategyPrompt', language)}
              </h3>
              {traderData.custom_prompt && (
                <CopyButton
                  text={traderData.custom_prompt}
                  fieldName="custom_prompt"
                />
              )}
            </div>
            <div className="space-y-3">
              <InfoRow
                label={t('overrideDefaultPrompt', language)}
                value={traderData.override_base_prompt}
              />
              {traderData.custom_prompt ? (
                <div>
                  <div className="text-sm text-[#848E9C] mb-2">
                    {traderData.override_base_prompt
                      ? t('customPrompt', language)
                      : t('additionalPrompt', language)}
                    ：
                  </div>
                  <div
                    className="p-3 rounded border text-sm text-[#EAECEF] font-mono leading-relaxed max-h-48 overflow-y-auto"
                    style={{
                      background: '#0B0E11',
                      border: '1px solid #2B3139',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {traderData.custom_prompt}
                  </div>
                </div>
              ) : (
                <div
                  className="text-sm text-[#848E9C] italic p-3 rounded border"
                  style={{ border: '1px solid #2B3139' }}
                >
                  {t('noCustomPromptSet', language)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[#2B3139] bg-gradient-to-r from-[#1E2329] to-[#252B35]">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#2B3139] text-[#EAECEF] rounded-lg hover:bg-[#404750] transition-all duration-200 border border-[#404750]"
          >
            {t('close', language)}
          </button>
          <button
            onClick={() =>
              copyToClipboard(
                JSON.stringify(traderData, null, 2),
                'full_config'
              )
            }
            className="px-6 py-3 bg-gradient-to-r from-[#F0B90B] to-[#E1A706] text-black rounded-lg hover:from-[#E1A706] hover:to-[#D4951E] transition-all duration-200 font-medium shadow-lg"
          >
            {copiedField === 'full_config'
              ? t('copiedConfig', language)
              : t('copyFullConfig', language)}
          </button>
        </div>
      </div>
    </div>
  )
}
