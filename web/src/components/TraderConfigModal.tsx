import { useState, useEffect } from 'react'
import type { AIModel, Exchange, CreateTraderRequest } from '../types'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import { getAuthHeaders, api } from '../lib/api'

// 提取下划线后面的名称部分
function getShortName(fullName: string): string {
  const parts = fullName.split('_')
  return parts.length > 1 ? parts[parts.length - 1] : fullName
}

// Map system_prompt_template to recommendation strategy name
function mapTemplateToStrategy(template: string): string {
  // Direct matches
  if (
    [
      'risk_first',
      'adaptive',
      'adaptive_relaxed',
      'nof1',
      'Hansen',
      'taro_long_prompts',
      'default',
    ].includes(template)
  ) {
    return template
  }
  // Map 'aggressive' to 'adaptive_relaxed'
  if (template === 'aggressive') {
    return 'adaptive_relaxed'
  }
  // Fallback to 'risk_first'
  return 'risk_first'
}

interface TraderConfigData {
  trader_id?: string
  trader_name: string
  ai_model: string
  exchange_id: string
  btc_eth_leverage: number
  altcoin_leverage: number
  trading_symbols: string
  custom_prompt: string
  override_base_prompt: boolean
  system_prompt_template: string
  is_cross_margin: boolean
  use_coin_pool: boolean
  use_oi_top: boolean
  initial_balance: number
  scan_interval_minutes: number
}

interface TraderConfigModalProps {
  isOpen: boolean
  onClose: () => void
  traderData?: TraderConfigData | null
  isEditMode?: boolean
  availableModels?: AIModel[]
  availableExchanges?: Exchange[]
  onSave?: (data: CreateTraderRequest) => Promise<void>
}

export function TraderConfigModal({
  isOpen,
  onClose,
  traderData,
  isEditMode = false,
  availableModels = [],
  availableExchanges = [],
  onSave,
}: TraderConfigModalProps) {
  const { language } = useLanguage()
  const [formData, setFormData] = useState<TraderConfigData>({
    trader_name: '',
    ai_model: '',
    exchange_id: '',
    btc_eth_leverage: 5,
    altcoin_leverage: 3,
    trading_symbols: '',
    custom_prompt: '',
    override_base_prompt: false,
    system_prompt_template: 'default',
    is_cross_margin: true,
    use_coin_pool: false,
    use_oi_top: false,
    initial_balance: 1000,
    scan_interval_minutes: 3,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [availableCoins, setAvailableCoins] = useState<string[]>([])
  const [selectedCoins, setSelectedCoins] = useState<string[]>([])
  const [showCoinSelector, setShowCoinSelector] = useState(false)
  const [promptTemplates, setPromptTemplates] = useState<{ name: string }[]>([])
  const [isFetchingBalance, setIsFetchingBalance] = useState(false)
  const [balanceFetchError, setBalanceFetchError] = useState<string>('')
  const [showAutoFillDialog, setShowAutoFillDialog] = useState(false)
  const [replaceMode, setReplaceMode] = useState<'replace' | 'append'>(
    'replace'
  )
  const [includeMajor, setIncludeMajor] = useState(true)
  const [includeAltcoins, setIncludeAltcoins] = useState(true)
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false)
  const [autoFillError, setAutoFillError] = useState<string>('')

  useEffect(() => {
    if (traderData) {
      setFormData(traderData)
      // 设置已选择的币种
      if (traderData.trading_symbols) {
        const coins = traderData.trading_symbols
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s)
        setSelectedCoins(coins)
      }
    } else if (!isEditMode) {
      setFormData({
        trader_name: '',
        ai_model: availableModels[0]?.id || '',
        exchange_id: availableExchanges[0]?.id || '',
        btc_eth_leverage: 5,
        altcoin_leverage: 3,
        trading_symbols: '',
        custom_prompt: '',
        override_base_prompt: false,
        system_prompt_template: 'default',
        is_cross_margin: true,
        use_coin_pool: false,
        use_oi_top: false,
        initial_balance: 1000,
        scan_interval_minutes: 3,
      })
    }
    // 确保旧数据也有默认的 system_prompt_template
    if (traderData && traderData.system_prompt_template === undefined) {
      setFormData((prev) => ({
        ...prev,
        system_prompt_template: 'default',
      }))
    }
  }, [traderData, isEditMode, availableModels, availableExchanges])

  // 获取系统配置中的币种列表
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config')
        const config = await response.json()
        if (config.default_coins) {
          setAvailableCoins(config.default_coins)
        }
      } catch (error) {
        console.error('Failed to fetch config:', error)
        // 使用默认币种列表
        setAvailableCoins([
          'BTCUSDT',
          'ETHUSDT',
          'SOLUSDT',
          'BNBUSDT',
          'XRPUSDT',
          'DOGEUSDT',
          'ADAUSDT',
        ])
      }
    }
    fetchConfig()
  }, [])

  // 获取系统提示词模板列表
  useEffect(() => {
    const fetchPromptTemplates = async () => {
      try {
        const response = await fetch('/api/prompt-templates')
        const data = await response.json()
        if (data.templates) {
          setPromptTemplates(data.templates)
        }
      } catch (error) {
        console.error('Failed to fetch prompt templates:', error)
        // 使用默认模板列表
        setPromptTemplates([{ name: 'default' }, { name: 'aggressive' }])
      }
    }
    fetchPromptTemplates()
  }, [])

  // 当选择的币种改变时，更新输入框
  useEffect(() => {
    const symbolsString = selectedCoins.join(',')
    setFormData((prev) => ({ ...prev, trading_symbols: symbolsString }))
  }, [selectedCoins])

  if (!isOpen) return null

  const handleInputChange = (field: keyof TraderConfigData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // 如果是直接编辑trading_symbols，同步更新selectedCoins
    if (field === 'trading_symbols') {
      const coins = value
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s)
      setSelectedCoins(coins)
    }
  }

  const handleCoinToggle = (coin: string) => {
    setSelectedCoins((prev) => {
      if (prev.includes(coin)) {
        return prev.filter((c) => c !== coin)
      } else {
        return [...prev, coin]
      }
    })
  }

  const handleFetchCurrentBalance = async () => {
    if (!isEditMode || !traderData?.trader_id) {
      setBalanceFetchError(t('balanceFetchEditOnly', language))
      return
    }

    setIsFetchingBalance(true)
    setBalanceFetchError('')

    try {
      const response = await fetch(
        `/api/account?trader_id=${traderData.trader_id}`,
        {
          headers: getAuthHeaders(),
        }
      )

      if (!response.ok) {
        throw new Error(t('balanceFetchFailed', language))
      }

      const data = await response.json()

      // total_equity = 当前账户净值（包含未实现盈亏）
      // 这应该作为新的初始余额
      const currentBalance = data.total_equity || data.balance || 0

      setFormData((prev) => ({ ...prev, initial_balance: currentBalance }))

      // 显示成功提示
      console.log('已获取当前余额:', currentBalance)
    } catch (error) {
      console.error('获取余额失败:', error)
      setBalanceFetchError(t('balanceFetchErrorNetwork', language))
    } finally {
      setIsFetchingBalance(false)
    }
  }

  const handleAutoFillFromRecommendations = async () => {
    // Validate that at least one category is selected
    if (!includeMajor && !includeAltcoins) {
      setAutoFillError(t('selectAtLeastOneCategory', language))
      return
    }

    setIsLoadingRecommendations(true)
    setAutoFillError('')

    try {
      // Get strategy from system_prompt_template
      const strategy = mapTemplateToStrategy(formData.system_prompt_template)

      // Fetch recommendations
      const response = await api.getRecommendations(strategy, 10)

      // Extract symbols based on selected categories
      const strategyRecs = response.strategies?.[strategy]
      if (!strategyRecs) {
        throw new Error(t('noRecommendationsFound', language))
      }

      const symbols: string[] = []
      if (includeMajor && strategyRecs.major_coins) {
        symbols.push(...strategyRecs.major_coins.map((rec: any) => rec.symbol))
      }
      if (includeAltcoins && strategyRecs.altcoins) {
        symbols.push(...strategyRecs.altcoins.map((rec: any) => rec.symbol))
      }

      if (symbols.length === 0) {
        throw new Error(t('noRecommendationsFound', language))
      }

      // Apply replace or append logic
      let finalSymbols: string[]
      if (replaceMode === 'replace') {
        finalSymbols = symbols
      } else {
        // Append: merge with existing, remove duplicates
        const existingSymbols = formData.trading_symbols
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s)
        finalSymbols = [...new Set([...existingSymbols, ...symbols])]
      }

      // Update form state
      const symbolsString = finalSymbols.join(',')
      setFormData((prev) => ({ ...prev, trading_symbols: symbolsString }))
      setSelectedCoins(finalSymbols)

      // Close dialog and show success
      setShowAutoFillDialog(false)
      setAutoFillError('')
      // Reset dialog state for next time
      setReplaceMode('replace')
      setIncludeMajor(true)
      setIncludeAltcoins(true)
    } catch (error: any) {
      console.error('Failed to load recommendations:', error)
      setAutoFillError(
        error.message || t('failedToLoadRecommendations', language)
      )
    } finally {
      setIsLoadingRecommendations(false)
    }
  }

  const handleSave = async () => {
    if (!onSave) return

    setIsSaving(true)
    try {
      const saveData: CreateTraderRequest = {
        name: formData.trader_name,
        ai_model_id: formData.ai_model,
        exchange_id: formData.exchange_id,
        btc_eth_leverage: formData.btc_eth_leverage,
        altcoin_leverage: formData.altcoin_leverage,
        trading_symbols: formData.trading_symbols,
        custom_prompt: formData.custom_prompt,
        override_base_prompt: formData.override_base_prompt,
        system_prompt_template: formData.system_prompt_template,
        is_cross_margin: formData.is_cross_margin,
        use_coin_pool: formData.use_coin_pool,
        use_oi_top: formData.use_oi_top,
        initial_balance: formData.initial_balance,
        scan_interval_minutes: formData.scan_interval_minutes,
      }
      await onSave(saveData)
      onClose()
    } catch (error) {
      console.error('保存失败:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2B3139] bg-gradient-to-r from-[#1E2329] to-[#252B35]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F0B90B] to-[#E1A706] flex items-center justify-center">
              <span className="text-lg">{isEditMode ? '✏️' : '➕'}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#EAECEF]">
                {isEditMode
                  ? t('editTraderTitle', language)
                  : t('createTraderTitle', language)}
              </h2>
              <p className="text-sm text-[#848E9C] mt-1">
                {isEditMode
                  ? t('editTraderSubtitle', language)
                  : t('createTraderSubtitle', language)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-[#848E9C] hover:text-[#EAECEF] hover:bg-[#2B3139] transition-colors flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Basic Info */}
          <div className="bg-[#0B0E11] border border-[#2B3139] rounded-lg p-5">
            <h3 className="text-lg font-semibold text-[#EAECEF] mb-5 flex items-center gap-2">
              {t('basicConfig', language)}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#EAECEF] block mb-2">
                  {t('traderNameLabel', language)}
                </label>
                <input
                  type="text"
                  value={formData.trader_name}
                  onChange={(e) =>
                    handleInputChange('trader_name', e.target.value)
                  }
                  className="w-full px-3 py-2 bg-[#0B0E11] border border-[#2B3139] rounded text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none"
                  placeholder={t('traderNamePlaceholder', language)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#EAECEF] block mb-2">
                    {t('aiModelLabel', language)}
                  </label>
                  <select
                    value={formData.ai_model}
                    onChange={(e) =>
                      handleInputChange('ai_model', e.target.value)
                    }
                    className="w-full px-3 py-2 bg-[#0B0E11] border border-[#2B3139] rounded text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none"
                  >
                    {availableModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {getShortName(model.name || model.id).toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-[#EAECEF] block mb-2">
                    {t('exchangeLabel', language)}
                  </label>
                  <select
                    value={formData.exchange_id}
                    onChange={(e) =>
                      handleInputChange('exchange_id', e.target.value)
                    }
                    className="w-full px-3 py-2 bg-[#0B0E11] border border-[#2B3139] rounded text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none"
                  >
                    {availableExchanges.map((exchange) => (
                      <option key={exchange.id} value={exchange.id}>
                        {getShortName(
                          exchange.name || exchange.id
                        ).toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Configuration */}
          <div className="bg-[#0B0E11] border border-[#2B3139] rounded-lg p-5">
            <h3 className="text-lg font-semibold text-[#EAECEF] mb-5 flex items-center gap-2">
              {t('tradingConfig', language)}
            </h3>
            <div className="space-y-4">
              {/* 第一行：保证金模式和初始余额 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#EAECEF] block mb-2">
                    {t('marginMode', language)}
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleInputChange('is_cross_margin', true)}
                      className={`flex-1 px-3 py-2 rounded text-sm ${
                        formData.is_cross_margin
                          ? 'bg-[#F0B90B] text-black'
                          : 'bg-[#0B0E11] text-[#848E9C] border border-[#2B3139]'
                      }`}
                    >
                      {t('crossMargin', language)}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange('is_cross_margin', false)
                      }
                      className={`flex-1 px-3 py-2 rounded text-sm ${
                        !formData.is_cross_margin
                          ? 'bg-[#F0B90B] text-black'
                          : 'bg-[#0B0E11] text-[#848E9C] border border-[#2B3139]'
                      }`}
                    >
                      {t('isolatedMargin', language)}
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-[#EAECEF]">
                      {t('initialBalanceLabel', language)}
                      {!isEditMode && (
                        <span className="text-[#F0B90B] ml-1">*</span>
                      )}
                    </label>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={handleFetchCurrentBalance}
                        disabled={isFetchingBalance}
                        className="px-3 py-1 text-xs bg-[#F0B90B] text-black rounded hover:bg-[#E1A706] transition-colors disabled:bg-[#848E9C] disabled:cursor-not-allowed"
                      >
                        {isFetchingBalance
                          ? t('fetchingBalance', language)
                          : t('fetchCurrentBalance', language)}
                      </button>
                    )}
                  </div>
                  <input
                    type="number"
                    value={formData.initial_balance}
                    onChange={(e) =>
                      handleInputChange(
                        'initial_balance',
                        Number(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 bg-[#0B0E11] border border-[#2B3139] rounded text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none"
                    min="100"
                    step="0.01"
                  />
                  {!isEditMode && (
                    <p className="text-xs text-[#F0B90B] mt-1 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                        <line x1="12" x2="12" y1="9" y2="13" />
                        <line x1="12" x2="12.01" y1="17" y2="17" />
                      </svg>
                      {t('initialBalanceWarning', language)}
                    </p>
                  )}
                  {isEditMode && (
                    <p className="text-xs text-[#848E9C] mt-1">
                      {t('balanceFetchInstruction', language)}
                    </p>
                  )}
                  {balanceFetchError && (
                    <p className="text-xs text-red-500 mt-1">
                      {balanceFetchError}
                    </p>
                  )}
                </div>
              </div>

              {/* 第二行：AI 扫描决策间隔 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#EAECEF] block mb-2">
                    {t('aiScanInterval', language)}
                  </label>
                  <input
                    type="number"
                    value={formData.scan_interval_minutes}
                    onChange={(e) => {
                      const parsedValue = Number(e.target.value)
                      const safeValue = Number.isFinite(parsedValue)
                        ? Math.max(3, parsedValue)
                        : 3
                      handleInputChange('scan_interval_minutes', safeValue)
                    }}
                    className="w-full px-3 py-2 bg-[#0B0E11] border border-[#2B3139] rounded text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none"
                    min="3"
                    max="60"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('scanIntervalRecommend', language)}
                  </p>
                </div>
                <div></div>
              </div>

              {/* 第三行：杠杆设置 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#EAECEF] block mb-2">
                    {t('btcEthLeverageLabel', language)}
                  </label>
                  <input
                    type="number"
                    value={formData.btc_eth_leverage}
                    onChange={(e) =>
                      handleInputChange(
                        'btc_eth_leverage',
                        Number(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 bg-[#0B0E11] border border-[#2B3139] rounded text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none"
                    min="1"
                    max="125"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#EAECEF] block mb-2">
                    {t('altcoinLeverageLabel', language)}
                  </label>
                  <input
                    type="number"
                    value={formData.altcoin_leverage}
                    onChange={(e) =>
                      handleInputChange(
                        'altcoin_leverage',
                        Number(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 bg-[#0B0E11] border border-[#2B3139] rounded text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none"
                    min="1"
                    max="75"
                  />
                </div>
              </div>

              {/* 第三行：交易币种 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-[#EAECEF]">
                    {t('tradingSymbolsPlaceholderWithHint', language)}
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAutoFillDialog(true)}
                      disabled={isLoadingRecommendations}
                      className="px-3 py-1 text-xs bg-[#3B82F6] text-white rounded hover:bg-[#2563EB] transition-colors disabled:bg-[#848E9C] disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      {isLoadingRecommendations ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          {t('loadingRecommendations', language)}
                        </>
                      ) : (
                        t('autoFillFromRecommendations', language)
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCoinSelector(!showCoinSelector)}
                      className="px-3 py-1 text-xs bg-[#F0B90B] text-black rounded hover:bg-[#E1A706] transition-colors"
                    >
                      {showCoinSelector
                        ? t('collapseSelection', language)
                        : t('quickSelection', language)}
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={formData.trading_symbols}
                  onChange={(e) =>
                    handleInputChange('trading_symbols', e.target.value)
                  }
                  className="w-full px-3 py-2 bg-[#0B0E11] border border-[#2B3139] rounded text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none"
                  placeholder={t('tradingSymbolsExample', language)}
                />
                {autoFillError && (
                  <p className="text-xs text-red-500 mt-1">{autoFillError}</p>
                )}

                {/* 币种选择器 */}
                {showCoinSelector && (
                  <div className="mt-3 p-3 bg-[#0B0E11] border border-[#2B3139] rounded">
                    <div className="text-xs text-[#848E9C] mb-2">
                      {t('clickToSelectCoins', language)}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {availableCoins.map((coin) => (
                        <button
                          key={coin}
                          type="button"
                          onClick={() => handleCoinToggle(coin)}
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            selectedCoins.includes(coin)
                              ? 'bg-[#F0B90B] text-black'
                              : 'bg-[#1E2329] text-[#848E9C] border border-[#2B3139] hover:border-[#F0B90B]'
                          }`}
                        >
                          {coin.replace('USDT', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Signal Sources */}
          <div className="bg-[#0B0E11] border border-[#2B3139] rounded-lg p-5">
            <h3 className="text-lg font-semibold text-[#EAECEF] mb-5 flex items-center gap-2">
              {t('signalSourceConfig', language)}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.use_coin_pool}
                  onChange={(e) =>
                    handleInputChange('use_coin_pool', e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <label className="text-sm text-[#EAECEF]">
                  {t('useCoinPoolSignalLabel', language)}
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.use_oi_top}
                  onChange={(e) =>
                    handleInputChange('use_oi_top', e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <label className="text-sm text-[#EAECEF]">
                  {t('useOiTopSignalLabel', language)}
                </label>
              </div>
            </div>
          </div>

          {/* Trading Prompt */}
          <div className="bg-[#0B0E11] border border-[#2B3139] rounded-lg p-5">
            <h3 className="text-lg font-semibold text-[#EAECEF] mb-5 flex items-center gap-2">
              {t('tradingStrategyPrompt', language)}
            </h3>
            <div className="space-y-4">
              {/* 系统提示词模板选择 */}
              <div>
                <label className="text-sm text-[#EAECEF] block mb-2">
                  {t('systemPromptTemplate', language)}
                </label>
                <select
                  value={formData.system_prompt_template}
                  onChange={(e) =>
                    handleInputChange('system_prompt_template', e.target.value)
                  }
                  className="w-full px-3 py-2 bg-[#0B0E11] border border-[#2B3139] rounded text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none"
                >
                  {promptTemplates.map((template) => (
                    <option key={template.name} value={template.name}>
                      {template.name === 'default'
                        ? t('templateDefault', language)
                        : template.name === 'aggressive'
                          ? t('templateAggressive', language)
                          : template.name.charAt(0).toUpperCase() +
                            template.name.slice(1)}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-[#848E9C] mt-1">
                  {t('systemPromptTemplateHelper', language)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.override_base_prompt}
                  onChange={(e) =>
                    handleInputChange('override_base_prompt', e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <label className="text-sm text-[#EAECEF]">
                  {t('overrideDefaultPrompt', language)}
                </label>
                <span className="text-xs text-[#F0B90B] inline-flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                    <line x1="12" x2="12" y1="9" y2="13" />
                    <line x1="12" x2="12.01" y1="17" y2="17" />
                  </svg>{' '}
                  {t('overrideDefaultPromptWarning', language)}
                </span>
              </div>
              <div>
                <label className="text-sm text-[#EAECEF] block mb-2">
                  {formData.override_base_prompt
                    ? t('customPromptLabel', language)
                    : t('additionalPromptLabel', language)}
                </label>
                <textarea
                  value={formData.custom_prompt}
                  onChange={(e) =>
                    handleInputChange('custom_prompt', e.target.value)
                  }
                  className="w-full px-3 py-2 bg-[#0B0E11] border border-[#2B3139] rounded text-[#EAECEF] focus:border-[#F0B90B] focus:outline-none h-24 resize-none"
                  placeholder={
                    formData.override_base_prompt
                      ? t('customPromptPlaceholder', language)
                      : t('additionalPromptPlaceholder', language)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Fill Dialog */}
        {showAutoFillDialog && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div
              className="bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-2xl max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Dialog Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#2B3139]">
                <h3 className="text-lg font-bold text-[#EAECEF]">
                  {t('autoFillDialogTitle', language)}
                </h3>
                <button
                  onClick={() => {
                    setShowAutoFillDialog(false)
                    setAutoFillError('')
                  }}
                  className="w-8 h-8 rounded-lg text-[#848E9C] hover:text-[#EAECEF] hover:bg-[#2B3139] transition-colors flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* Dialog Content */}
              <div className="p-6 space-y-6">
                {/* Replace/Append Options */}
                <div>
                  <label className="text-sm text-[#EAECEF] block mb-3">
                    {t('autoFillMode', language)}
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setReplaceMode('replace')}
                      className={`flex-1 px-4 py-2 rounded text-sm transition-colors ${
                        replaceMode === 'replace'
                          ? 'bg-[#F0B90B] text-black'
                          : 'bg-[#0B0E11] text-[#848E9C] border border-[#2B3139] hover:border-[#F0B90B]'
                      }`}
                    >
                      {t('replaceExistingCoins', language)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplaceMode('append')}
                      className={`flex-1 px-4 py-2 rounded text-sm transition-colors ${
                        replaceMode === 'append'
                          ? 'bg-[#F0B90B] text-black'
                          : 'bg-[#0B0E11] text-[#848E9C] border border-[#2B3139] hover:border-[#F0B90B]'
                      }`}
                    >
                      {t('appendToExistingCoins', language)}
                    </button>
                  </div>
                </div>

                {/* Coin Categories */}
                <div>
                  <label className="text-sm text-[#EAECEF] block mb-3">
                    {t('selectCoinCategories', language)}
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeMajor}
                        onChange={(e) => setIncludeMajor(e.target.checked)}
                        className="w-4 h-4"
                        style={{ accentColor: '#F0B90B' }}
                      />
                      <span className="text-sm text-[#EAECEF]">
                        {t('includeMajorCoins', language)}
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeAltcoins}
                        onChange={(e) => setIncludeAltcoins(e.target.checked)}
                        className="w-4 h-4"
                        style={{ accentColor: '#F0B90B' }}
                      />
                      <span className="text-sm text-[#EAECEF]">
                        {t('includeAltcoins', language)}
                      </span>
                    </label>
                  </div>
                </div>

                {autoFillError && (
                  <div
                    className="p-3 rounded text-sm"
                    style={{
                      background: 'rgba(246, 70, 93, 0.1)',
                      color: '#F6465D',
                      border: '1px solid rgba(246, 70, 93, 0.2)',
                    }}
                  >
                    {autoFillError}
                  </div>
                )}
              </div>

              {/* Dialog Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-[#2B3139]">
                <button
                  onClick={() => {
                    setShowAutoFillDialog(false)
                    setAutoFillError('')
                  }}
                  className="px-6 py-2 bg-[#2B3139] text-[#EAECEF] rounded-lg hover:bg-[#404750] transition-colors"
                >
                  {t('cancel', language)}
                </button>
                <button
                  onClick={handleAutoFillFromRecommendations}
                  disabled={
                    isLoadingRecommendations ||
                    (!includeMajor && !includeAltcoins)
                  }
                  className="px-6 py-2 bg-gradient-to-r from-[#F0B90B] to-[#E1A706] text-black rounded-lg hover:from-[#E1A706] hover:to-[#D4951E] transition-colors disabled:bg-[#848E9C] disabled:cursor-not-allowed font-medium"
                >
                  {isLoadingRecommendations
                    ? t('loadingRecommendations', language)
                    : t('confirm', language)}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[#2B3139] bg-gradient-to-r from-[#1E2329] to-[#252B35]">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#2B3139] text-[#EAECEF] rounded-lg hover:bg-[#404750] transition-all duration-200 border border-[#404750]"
          >
            {t('cancelButton', language)}
          </button>
          {onSave && (
            <button
              onClick={handleSave}
              disabled={
                isSaving ||
                !formData.trader_name ||
                !formData.ai_model ||
                !formData.exchange_id
              }
              className="px-8 py-3 bg-gradient-to-r from-[#F0B90B] to-[#E1A706] text-black rounded-lg hover:from-[#E1A706] hover:to-[#D4951E] transition-all duration-200 disabled:bg-[#848E9C] disabled:cursor-not-allowed font-medium shadow-lg"
            >
              {isSaving
                ? t('saving', language)
                : isEditMode
                  ? t('saveChanges', language)
                  : t('createTraderButton', language)}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
