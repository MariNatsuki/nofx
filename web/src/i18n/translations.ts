export type Language = 'en' | 'zh'

export const translations = {
  en: {
    // Header
    appTitle: 'NOFX',
    subtitle: 'Multi-AI Model Trading Platform',
    aiTraders: 'AI Traders',
    details: 'Details',
    tradingPanel: 'Trading Panel',
    competition: 'Competition',
    running: 'RUNNING',
    stopped: 'STOPPED',
    adminMode: 'Admin Mode',
    logout: 'Logout',
    switchTrader: 'Switch Trader:',
    view: 'View',

    // Navigation
    realtimeNav: 'Live',
    configNav: 'Config',
    dashboardNav: 'Dashboard',
    recommendationsNav: 'Recommendations',
    faqNav: 'FAQ',
    strategiesNav: 'Strategies',

    // Footer
    footerTitle: 'NOFX - AI Trading System',
    footerWarning: '⚠️ Trading involves risk. Use at your own discretion.',

    // Stats Cards
    totalEquity: 'Total Equity',
    availableBalance: 'Available Balance',
    totalPnL: 'Total P&L',
    positions: 'Positions',
    margin: 'Margin',
    free: 'Free',

    // Positions Table
    currentPositions: 'Current Positions',
    active: 'Active',
    symbol: 'Symbol',
    side: 'Side',
    entryPrice: 'Entry Price',
    markPrice: 'Mark Price',
    quantity: 'Quantity',
    positionValue: 'Position Value',
    leverage: 'Leverage',
    unrealizedPnL: 'Unrealized P&L',
    liqPrice: 'Liq. Price',
    long: 'LONG',
    short: 'SHORT',
    noPositions: 'No Positions',
    noActivePositions: 'No active trading positions',

    // Recent Decisions
    recentDecisions: 'Recent Decisions',
    lastCycles: 'Last {count} trading cycles',
    noDecisionsYet: 'No Decisions Yet',
    aiDecisionsWillAppear: 'AI trading decisions will appear here',
    cycle: 'Cycle',
    success: 'Success',
    failed: 'Failed',
    inputPrompt: 'Input Prompt',
    aiThinking: 'AI Chain of Thought',
    collapse: 'Collapse',
    expand: 'Expand',
    translate: 'Translate',
    translating: 'Translating...',
    translationError: 'Translation failed',
    showOriginal: 'Show Original',
    showTranslated: 'Show Translated',

    // Equity Chart
    accountEquityCurve: 'Account Equity Curve',
    noHistoricalData: 'No Historical Data',
    dataWillAppear: 'Equity curve will appear after running a few cycles',
    initialBalance: 'Initial Balance',
    currentEquity: 'Current Equity',
    historicalCycles: 'Historical Cycles',
    displayRange: 'Display Range',
    recent: 'Recent',
    allData: 'All Data',
    cycles: 'Cycles',

    // Comparison Chart
    comparisonMode: 'Comparison Mode',
    dataPoints: 'Data Points',
    currentGap: 'Current Gap',
    count: '{count} pts',

    // Competition Page
    aiCompetition: 'AI Competition',
    traders: 'traders',
    liveBattle: 'Live Battle',
    realTimeBattle: 'Real-time Battle',
    leader: 'Leader',
    leaderboard: 'Leaderboard',
    live: 'LIVE',
    realTime: 'LIVE',
    performanceComparison: 'Performance Comparison',
    realTimePnL: 'Real-time PnL %',
    realTimePnLPercent: 'Real-time PnL %',
    headToHead: 'Head-to-Head Battle',
    leadingBy: 'Leading by {gap}%',
    behindBy: 'Behind by {gap}%',
    equity: 'Equity',
    pnl: 'P&L',
    pos: 'Pos',

    // AI Learning
    aiLearning: 'AI Learning & Reflection',
    tradesAnalyzed: '{count} trades analyzed · Real-time evolution',
    latestReflection: 'Latest Reflection',
    fullCoT: 'Full Chain of Thought',
    totalTrades: 'Total Trades',
    winRate: 'Win Rate',
    avgWin: 'Avg Win',
    avgLoss: 'Avg Loss',
    profitFactor: 'Profit Factor',
    avgWinDivLoss: 'Avg Win ÷ Avg Loss',
    excellent: '🔥 Excellent - Strong profitability',
    good: '✓ Good - Stable profits',
    fair: '⚠️ Fair - Needs optimization',
    poor: '❌ Poor - Losses exceed gains',
    bestPerformer: 'Best Performer',
    worstPerformer: 'Worst Performer',
    symbolPerformance: 'Symbol Performance',
    tradeHistory: 'Trade History',
    completedTrades: 'Recent {count} completed trades',
    noCompletedTrades: 'No completed trades yet',
    completedTradesWillAppear: 'Completed trades will appear here',
    entry: 'Entry',
    exit: 'Exit',
    stopLoss: 'Stop Loss',
    latest: 'Latest',

    // AI Learning Description
    howAILearns: 'How AI Learns & Evolves',
    aiLearningPoint1: 'Analyzes last 20 trading cycles before each decision',
    aiLearningPoint2: 'Identifies best & worst performing symbols',
    aiLearningPoint3: 'Optimizes position sizing based on win rate',
    aiLearningPoint4: 'Avoids repeating past mistakes',

    // AI Traders Management
    manageAITraders: 'Manage your AI trading bots',
    aiModels: 'AI Models',
    exchanges: 'Exchanges',
    createTrader: 'Create Trader',
    modelConfiguration: 'Model Configuration',
    configured: 'Configured',
    notConfigured: 'Not Configured',
    currentTraders: 'Current Traders',
    noTraders: 'No AI Traders',
    createFirstTrader: 'Create your first AI trader to get started',
    configureModelsFirst: 'Please configure AI models first',
    configureExchangesFirst: 'Please configure exchanges first',
    configureModelsAndExchangesFirst:
      'Please configure AI models and exchanges first',
    modelNotConfigured: 'Selected model is not configured',
    exchangeNotConfigured: 'Selected exchange is not configured',
    confirmDeleteTrader: 'Are you sure you want to delete this trader?',
    status: 'Status',
    start: 'Start',
    stop: 'Stop',
    createNewTrader: 'Create New AI Trader',
    selectAIModel: 'Select AI Model',
    selectExchange: 'Select Exchange',
    traderName: 'Trader Name',
    enterTraderName: 'Enter trader name',
    cancel: 'Cancel',
    create: 'Create',
    configureAIModels: 'Configure AI Models',
    configureExchanges: 'Configure Exchanges',
    aiScanInterval: 'AI Scan Decision Interval (minutes)',
    scanIntervalRecommend: 'Recommended: 3-10 minutes',
    useTestnet: 'Use Testnet',
    enabled: 'Enabled',
    save: 'Save',

    // AI Model Configuration
    officialAPI: 'Official API',
    customAPI: 'Custom API',
    apiKey: 'API Key',
    customAPIURL: 'Custom API URL',
    enterAPIKey: 'Enter API Key',
    enterCustomAPIURL: 'Enter custom API endpoint URL',
    useOfficialAPI: 'Use official API service',
    useCustomAPI: 'Use custom API endpoint',

    // Exchange Configuration
    secretKey: 'Secret Key',
    privateKey: 'Private Key',
    walletAddress: 'Wallet Address',
    user: 'User',
    signer: 'Signer',
    passphrase: 'Passphrase',
    enterPrivateKey: 'Enter Private Key',
    enterWalletAddress: 'Enter Wallet Address',
    enterUser: 'Enter User',
    enterSigner: 'Enter Signer Address',
    enterSecretKey: 'Enter Secret Key',
    enterPassphrase: 'Enter Passphrase (Required for OKX)',
    hyperliquidPrivateKeyDesc:
      'Hyperliquid uses private key for trading authentication',
    hyperliquidWalletAddressDesc:
      'Wallet address corresponding to the private key',
    asterUserDesc:
      'Main wallet address - The EVM wallet address you use to log in to Aster (Note: Only EVM wallets are supported, Solana wallets are not supported)',
    asterSignerDesc:
      'API wallet address - Generate from https://www.asterdex.com/en/api-wallet',
    asterPrivateKeyDesc:
      'API wallet private key - Get from https://www.asterdex.com/en/api-wallet (only used locally for signing, never transmitted)',
    asterUsdtWarning:
      'Important: Aster only tracks USDT balance. Please ensure you use USDT as margin currency to avoid P&L calculation errors caused by price fluctuations of other assets (BNB, ETH, etc.)',
    testnetDescription:
      'Enable to connect to exchange test environment for simulated trading',
    securityWarning: 'Security Warning',
    saveConfiguration: 'Save Configuration',

    // Trader Configuration
    positionMode: 'Position Mode',
    crossMarginMode: 'Cross Margin',
    isolatedMarginMode: 'Isolated Margin',
    crossMarginDescription:
      'Cross margin: All positions share account balance as collateral',
    isolatedMarginDescription:
      'Isolated margin: Each position manages collateral independently, risk isolation',
    leverageConfiguration: 'Leverage Configuration',
    btcEthLeverage: 'BTC/ETH Leverage',
    altcoinLeverage: 'Altcoin Leverage',
    leverageRecommendation:
      'Recommended: BTC/ETH 5-10x, Altcoins 3-5x for risk control',
    tradingSymbols: 'Trading Symbols',
    tradingSymbolsPlaceholder:
      'Enter symbols, comma separated (e.g., BTCUSDT,ETHUSDT,SOLUSDT)',
    selectSymbols: 'Select Symbols',
    selectTradingSymbols: 'Select Trading Symbols',
    selectedSymbolsCount: 'Selected {count} symbols',
    clearSelection: 'Clear All',
    confirmSelection: 'Confirm',
    tradingSymbolsDescription:
      'Empty = use default symbols. Must end with USDT (e.g., BTCUSDT, ETHUSDT)',
    btcEthLeverageValidation: 'BTC/ETH leverage must be between 1-50x',
    altcoinLeverageValidation: 'Altcoin leverage must be between 1-20x',
    invalidSymbolFormat: 'Invalid symbol format: {symbol}, must end with USDT',

    // Loading & Error
    loading: 'Loading...',
    loadingError: '⚠️ Failed to load AI learning data',
    noCompleteData:
      'No complete trading data (needs to complete open → close cycle)',

    // AI Traders Page - Additional
    inUse: 'In Use',
    noModelsConfigured: 'No configured AI models',
    noExchangesConfigured: 'No configured exchanges',
    signalSource: 'Signal Source',
    signalSourceConfig: 'Signal Source Configuration',
    coinPoolDescription:
      'API endpoint for coin pool data, leave blank to disable this signal source',
    oiTopDescription:
      'API endpoint for open interest rankings, leave blank to disable this signal source',
    information: 'Information',
    signalSourceInfo1:
      '• Signal source configuration is per-user, each user can set their own URLs',
    signalSourceInfo2:
      '• When creating traders, you can choose whether to use these signal sources',
    signalSourceInfo3:
      '• Configured URLs will be used to fetch market data and trading signals',
    editAIModel: 'Edit AI Model',
    addAIModel: 'Add AI Model',
    confirmDeleteModel:
      'Are you sure you want to delete this AI model configuration?',
    cannotDeleteModelInUse:
      'Cannot delete this AI model because it is being used by traders',
    tradersUsing: 'Traders using this configuration',
    pleaseDeleteTradersFirst:
      'Please delete or reconfigure these traders first',
    selectModel: 'Select AI Model',
    pleaseSelectModel: 'Please select a model',
    customBaseURL: 'Base URL (Optional)',
    customBaseURLPlaceholder:
      'Custom API base URL, e.g.: https://api.openai.com/v1',
    leaveBlankForDefault: 'Leave blank to use default API address',
    modelConfigInfo1:
      '• API Key will be encrypted and stored, please ensure it is valid',
    modelConfigInfo2: '• Base URL is used for custom API server address',
    modelConfigInfo3:
      '• After deleting configuration, traders using this model will not work properly',
    saveConfig: 'Save Configuration',
    editExchange: 'Edit Exchange',
    addExchange: 'Add Exchange',
    confirmDeleteExchange:
      'Are you sure you want to delete this exchange configuration?',
    cannotDeleteExchangeInUse:
      'Cannot delete this exchange because it is being used by traders',
    pleaseSelectExchange: 'Please select an exchange',
    exchangeConfigWarning1:
      '• API keys will be encrypted, recommend using read-only or futures trading permissions',
    exchangeConfigWarning2:
      '• Do not grant withdrawal permissions to ensure fund security',
    exchangeConfigWarning3:
      '• After deleting configuration, related traders will not be able to trade',
    edit: 'Edit',
    viewGuide: 'View Guide',
    binanceSetupGuide: 'Binance Setup Guide',
    closeGuide: 'Close',
    whitelistIP: 'Whitelist IP',
    whitelistIPDesc: 'Binance requires adding server IP to API whitelist',
    serverIPAddresses: 'Server IP Addresses',
    copyIP: 'Copy',
    ipCopied: 'IP Copied',
    loadingServerIP: 'Loading server IP...',

    // Error Messages
    createTraderFailed: 'Failed to create trader',
    getTraderConfigFailed: 'Failed to get trader configuration',
    modelConfigNotExist: 'Model configuration does not exist or is not enabled',
    exchangeConfigNotExist:
      'Exchange configuration does not exist or is not enabled',
    updateTraderFailed: 'Failed to update trader',
    deleteTraderFailed: 'Failed to delete trader',
    operationFailed: 'Operation failed',
    deleteConfigFailed: 'Failed to delete configuration',
    modelNotExist: 'Model does not exist',
    saveConfigFailed: 'Failed to save configuration',
    exchangeNotExist: 'Exchange does not exist',
    deleteExchangeConfigFailed: 'Failed to delete exchange configuration',
    saveSignalSourceFailed: 'Failed to save signal source configuration',

    // Login & Register
    login: 'Sign In',
    register: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: 'Enter your password',
    confirmPasswordPlaceholder: 'Re-enter your password',
    otpPlaceholder: '000000',
    loginTitle: 'Sign in to your account',
    registerTitle: 'Create a new account',
    loginButton: 'Sign In',
    registerButton: 'Sign Up',
    back: 'Back',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    registerNow: 'Sign up now',
    loginNow: 'Sign in now',
    forgotPassword: 'Forgot password?',
    rememberMe: 'Remember me',
    otpCode: 'OTP Code',
    resetPassword: 'Reset Password',
    resetPasswordTitle: 'Reset your password',
    newPassword: 'New Password',
    newPasswordPlaceholder: 'Enter new password (at least 6 characters)',
    resetPasswordButton: 'Reset Password',
    resetPasswordSuccess:
      'Password reset successful! Please login with your new password',
    resetPasswordFailed: 'Password reset failed',
    backToLogin: 'Back to Login',
    scanQRCode: 'Scan QR Code',
    enterOTPCode: 'Enter 6-digit OTP code',
    verifyOTP: 'Verify OTP',
    setupTwoFactor: 'Set up two-factor authentication',
    setupTwoFactorDesc:
      'Follow the steps below to secure your account with Google Authenticator',
    scanQRCodeInstructions:
      'Scan this QR code with Google Authenticator or Authy',
    otpSecret: 'Or enter this secret manually:',
    qrCodeHint: 'QR code (if scanning fails, use the secret below):',
    authStep1Title: 'Step 1: Install Google Authenticator',
    authStep1Desc:
      'Download and install Google Authenticator from your app store',
    authStep2Title: 'Step 2: Add account',
    authStep2Desc: 'Tap "+", then choose "Scan QR code" or "Enter a setup key"',
    authStep3Title: 'Step 3: Verify setup',
    authStep3Desc: 'After setup, continue to enter the 6-digit code',
    setupCompleteContinue: 'I have completed setup, continue',
    copy: 'Copy',
    completeRegistration: 'Complete Registration',
    completeRegistrationSubtitle: 'to complete registration',
    loginSuccess: 'Login successful',
    registrationSuccess: 'Registration successful',
    loginFailed: 'Login failed',
    registrationFailed: 'Registration failed',
    verificationFailed: 'OTP verification failed',
    invalidCredentials: 'Invalid email or password',
    passwordMismatch: 'Passwords do not match',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    invalidEmail: 'Invalid email format',
    passwordTooShort: 'Password must be at least 6 characters',

    // Landing Page
    features: 'Features',
    howItWorks: 'How it Works',
    community: 'Community',
    language: 'Language',
    loggedInAs: 'Logged in as',
    exitLogin: 'Sign Out',
    signIn: 'Sign In',
    signUp: 'Sign Up',

    // Hero Section
    githubStarsInDays: '2.5K+ GitHub Stars in 3 days',
    heroTitle1: 'Read the Market.',
    heroTitle2: 'Write the Trade.',
    heroDescription:
      'NOFX is the future standard for AI trading — an open, community-driven agentic trading OS. Supporting Binance, Aster DEX and other exchanges, self-hosted, multi-agent competition, let AI automatically make decisions, execute and optimize trades for you.',
    poweredBy:
      'Powered by Aster DEX and Binance, strategically invested by Amber.ac.',

    // Landing Page CTA
    readyToDefine: 'Ready to define the future of AI trading?',
    startWithCrypto:
      'Starting with crypto markets, expanding to TradFi. NOFX is the infrastructure of AgentFi.',
    getStartedNow: 'Get Started Now',
    viewSourceCode: 'View Source Code',

    // Features Section
    coreFeatures: 'Core Features',
    whyChooseNofx: 'Why Choose NOFX?',
    openCommunityDriven:
      'Open source, transparent, community-driven AI trading OS',
    openSourceSelfHosted: '100% Open Source & Self-Hosted',
    openSourceDesc:
      'Your framework, your rules. Non-black box, supports custom prompts and multi-models.',
    openSourceFeatures1: 'Fully open source code',
    openSourceFeatures2: 'Self-hosting deployment support',
    openSourceFeatures3: 'Custom AI prompts',
    openSourceFeatures4: 'Multi-model support (DeepSeek, Qwen)',
    multiAgentCompetition: 'Multi-Agent Intelligent Competition',
    multiAgentDesc:
      'AI strategies battle at high speed in sandbox, survival of the fittest, achieving strategy evolution.',
    multiAgentFeatures1: 'Multiple AI agents running in parallel',
    multiAgentFeatures2: 'Automatic strategy optimization',
    multiAgentFeatures3: 'Sandbox security testing',
    multiAgentFeatures4: 'Cross-market strategy porting',
    secureReliableTrading: 'Secure and Reliable Trading',
    secureDesc:
      'Enterprise-grade security, complete control over your funds and trading strategies.',
    secureFeatures1: 'Local private key management',
    secureFeatures2: 'Fine-grained API permission control',
    secureFeatures3: 'Real-time risk monitoring',
    secureFeatures4: 'Trading log auditing',

    // About Section
    aboutNofx: 'About NOFX',
    whatIsNofx: 'What is NOFX?',
    nofxNotAnotherBot:
      "NOFX is not another trading bot, but the 'Linux' of AI trading —",
    nofxDescription1:
      'a transparent, trustworthy open source OS that provides a unified',
    nofxDescription2:
      "'decision-risk-execution' layer, supporting all asset classes.",
    nofxDescription3:
      'Starting with crypto markets (24/7, high volatility perfect testing ground), future expansion to stocks, futures, forex. Core: open architecture, AI',
    nofxDescription4:
      'Darwinism (multi-agent self-competition, strategy evolution), CodeFi',
    nofxDescription5:
      'flywheel (developers get point rewards for PR contributions).',
    youFullControl: 'You 100% Control',
    fullControlDesc: 'Complete control over AI prompts and funds',
    startupMessages1: 'Starting automated trading system...',
    startupMessages2: 'API server started on port 8080',
    startupMessages3: 'Web console http://localhost:3000',

    // How It Works Section
    howToStart: 'How to Get Started with NOFX',
    fourSimpleSteps:
      'Four simple steps to start your AI automated trading journey',
    step1Title: 'Clone GitHub Repository',
    step1Desc:
      'git clone https://github.com/tinkle-community/nofx and switch to dev branch to test new features.',
    step2Title: 'Configure Environment',
    step2Desc:
      'Frontend setup for exchange APIs (like Binance, Hyperliquid), AI models and custom prompts.',
    step3Title: 'Deploy & Run',
    step3Desc:
      'One-click Docker deployment, start AI agents. Note: High-risk market, only test with money you can afford to lose.',
    step4Title: 'Optimize & Contribute',
    step4Desc:
      'Monitor trading, submit PRs to improve framework. Join Telegram to share strategies.',
    importantRiskWarning: 'Important Risk Warning',
    riskWarningText:
      'Dev branch is unstable, do not use funds you cannot afford to lose. NOFX is non-custodial, no official strategies. Trading involves risks, invest carefully.',

    // Community Section (testimonials are kept as-is since they are quotes)

    // Footer Section
    futureStandardAI: 'The future standard of AI trading',
    links: 'Links',
    resources: 'Resources',
    documentation: 'Documentation',
    supporters: 'Supporters',
    strategicInvestment: '(Strategic Investment)',

    // Login Modal
    accessNofxPlatform: 'Access NOFX Platform',
    loginRegisterPrompt:
      'Please login or register to access the full AI trading platform',
    registerNewAccount: 'Register New Account',

    // Candidate Coins Warnings
    candidateCoins: 'Candidate Coins',
    candidateCoinsZeroWarning: 'Candidate Coins Count is 0',
    possibleReasons: 'Possible Reasons:',
    coinPoolApiNotConfigured:
      'Coin pool API not configured or inaccessible (check signal source settings)',
    apiConnectionTimeout: 'API connection timeout or returned empty data',
    noCustomCoinsAndApiFailed:
      'No custom coins configured and API fetch failed',
    solutions: 'Solutions:',
    setCustomCoinsInConfig: 'Set custom coin list in trader configuration',
    orConfigureCorrectApiUrl: 'Or configure correct coin pool API address',
    orDisableCoinPoolOptions:
      'Or disable "Use Coin Pool" and "Use OI Top" options',
    signalSourceNotConfigured: 'Signal Source Not Configured',
    signalSourceWarningMessage:
      'You have traders that enabled "Use Coin Pool" or "Use OI Top", but signal source API address is not configured yet. This will cause candidate coins count to be 0, and traders cannot work properly.',
    configureSignalSourceNow: 'Configure Signal Source Now',

    // FAQ Page
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find answers to common questions about NOFX',
    faqStillHaveQuestions: 'Still Have Questions?',
    faqContactUs: 'Join our community or check our GitHub for more help',

    // FAQ Categories
    faqCategoryBasics: 'General Questions',
    faqCategoryContributing: 'Contributing & Tasks',
    faqCategorySetup: 'Setup & Configuration',
    faqCategoryTrading: 'Trading Questions',
    faqCategoryTechnical: 'Technical Issues',
    faqCategoryAI: 'AI & Model Questions',
    faqCategoryData: 'Data & Privacy',
    faqCategoryStrategies: 'Trading Strategies',

    // FAQ Questions & Answers - General
    faqWhatIsNOFX: 'What is NOFX?',
    faqWhatIsNOFXAnswer:
      'NOFX is an AI-powered cryptocurrency trading bot that uses large language models (LLMs) to make trading decisions on futures markets.',

    faqSupportedExchanges: 'Which exchanges are supported?',
    faqSupportedExchangesAnswer:
      'Binance Futures, Hyperliquid, and Aster DEX are supported. More exchanges coming soon.',

    faqIsProfitable: 'Is NOFX profitable?',
    faqIsProfitableAnswer:
      'AI trading is experimental and not guaranteed to be profitable. Always start with small amounts and never invest more than you can afford to lose.',

    faqMultipleTraders: 'Can I run multiple traders simultaneously?',
    faqMultipleTradersAnswer:
      'Yes! NOFX supports running multiple traders with different configurations, AI models, and trading strategies.',

    // Contributing & Community
    faqGithubProjectsTasks: 'How to use GitHub Projects and pick up tasks?',
    faqGithubProjectsTasksAnswer:
      'Roadmap: https://github.com/orgs/NoFxAiOS/projects/3  • Task Dashboard: https://github.com/orgs/NoFxAiOS/projects/5  • Steps: Open links → filter by labels (good first issue / help wanted / frontend / backend) → read Description & Acceptance Criteria → comment "assign me" or self-assign → Fork the repo → sync your fork\'s dev with upstream/dev → create a feature branch from your fork\'s dev → push to your fork → open PR (base: NoFxAiOS/nofx:dev ← compare: your-username/nofx:feat/your-topic) → reference Issue (Closes #123) and use the proper template.',

    faqContributePR: 'How to properly submit PRs and contribute?',
    faqContributePRAnswer:
      "Guidelines: • Fork first; branch from your fork's dev (avoid direct commits to upstream main) • Branch naming: feat/..., fix/..., docs/...; Conventional Commits • Run checks before PR: npm --prefix web run lint && npm --prefix web run build • For UI changes, attach screenshots or a short video • Choose the proper PR template (frontend/backend/docs/general) • Open PR from your fork to NoFxAiOS/nofx:dev and link Issue (Closes #123) • Keep rebasing onto upstream/dev; ensure CI passes; prefer small, focused PRs • Read CONTRIBUTING.md and .github/PR_TITLE_GUIDE.md",

    // Setup & Configuration
    faqSystemRequirements: 'What are the system requirements?',
    faqSystemRequirementsAnswer:
      'OS: Linux, macOS, or Windows (Docker recommended); RAM: 2GB minimum, 4GB recommended; Disk: 1GB for application + logs; Network: Stable internet connection.',

    faqNeedCoding: 'Do I need coding experience?',
    faqNeedCodingAnswer:
      'No! NOFX has a web UI for all configuration. However, basic command line knowledge helps with setup and troubleshooting.',

    faqGetApiKeys: 'How do I get API keys?',
    faqGetApiKeysAnswer:
      'For Binance: Account → API Management → Create API → Enable Futures. For Hyperliquid: Visit Hyperliquid App → API Settings. For Aster DEX: Configure main wallet address (User), API wallet address (Signer), and private key (Private Key).',

    faqUseSubaccount: 'Should I use a subaccount?',
    faqUseSubaccountAnswer:
      'Recommended: Yes, use a subaccount dedicated to NOFX for better risk isolation. However, note that some subaccounts have restrictions (e.g., 5x max leverage on Binance).',

    faqDockerDeployment: 'Docker deployment keeps failing',
    faqDockerDeploymentAnswer:
      'Common issues: Network connection problems, dependency installation failures, insufficient memory (needs at least 2C2G). If stuck at "go build", try: docker compose down && docker compose build --no-cache && docker compose up -d',

    faqBalanceZero: 'Account balance shows 0',
    faqBalanceZeroAnswer:
      'Funds are likely in spot account instead of futures account, or locked in savings products. You need to manually transfer funds to futures account in Binance.',

    faqTestnet: 'Can I use testnet for testing?',
    faqTestnetAnswer:
      'Testnet is not supported at the moment. We recommend using real trading with small amounts (10-50 USDT) for testing.',

    // Trading Questions
    faqNoTrades: "Why isn't my trader making any trades?",
    faqNoTradesAnswer:
      'Common reasons: AI decided to "wait" due to market conditions; Insufficient balance or margin; Position limits reached (default: max 3 positions); Check troubleshooting guide for detailed diagnostics.',

    faqDecisionFrequency: 'How often does the AI make decisions?',
    faqDecisionFrequencyAnswer:
      'Configurable! Default is every 3-5 minutes. Too frequent = overtrading, too slow = missed opportunities.',

    faqCustomStrategy: 'Can I customize the trading strategy?',
    faqCustomStrategyAnswer:
      'Yes! You can adjust leverage settings, modify coin selection pool, change decision intervals, and customize system prompts (advanced).',

    faqMaxPositions: "What's the maximum number of concurrent positions?",
    faqMaxPositionsAnswer:
      'Default: 3 positions. This is a soft limit defined in the AI prompt, not hard-coded.',

    faqMarginInsufficient: 'Margin is insufficient error (code=-2019)',
    faqMarginInsufficientAnswer:
      'Common causes: Funds not transferred to futures account; Leverage set too high (default 20-50x); Existing positions using margin; Need to transfer USDT from spot to futures account first.',

    faqHighFees: 'Trading fees are too high',
    faqHighFeesAnswer:
      'NOFX default 3-minute scan interval can cause frequent trading. Solutions: Increase decision interval to 5-10 minutes; Optimize system prompt to reduce overtrading; Adjust leverage to reduce position sizes.',

    faqNoTakeProfit: "AI doesn't close profitable positions",
    faqNoTakeProfitAnswer:
      'AI may believe the trend will continue. The system lacks trailing stop-loss feature currently. You can manually close positions or adjust the system prompt to be more conservative with profit-taking.',

    // Technical Issues
    faqBinanceApiFailed: 'Binance API call failed (code=-2015)',
    faqBinanceApiFailedAnswer:
      'Error: "Invalid API-key, IP, or permissions for action". Solutions: Add server IP to Binance API whitelist; Check API permissions (needs Read + Futures Trading); Ensure using futures API not unified account API; VPN IP might be unstable.',

    faqBinancePositionMode: 'Binance Position Mode Error (code=-4061)',
    faqBinancePositionModeAnswer:
      'Error: "Order\'s position side does not match user\'s setting". Solution: Switch to Hedge Mode (双向持仓) in Binance Futures settings. You must close all positions first before switching.',

    faqPortInUse: "Backend won't start / Port already in use",
    faqPortInUseAnswer:
      'Check what\'s using port 8080 with "lsof -i :8080" and change the port in your .env file with NOFX_BACKEND_PORT=8081.',

    faqFrontendLoading: 'Frontend shows "Loading..." forever',
    faqFrontendLoadingAnswer:
      'Check if backend is running with "curl http://localhost:8080/api/health". Should return {"status":"ok"}. If not, check the troubleshooting guide.',

    faqDatabaseLocked: 'Database locked error',
    faqDatabaseLockedAnswer:
      'Stop all NOFX processes with "docker compose down" or "pkill nofx", then restart with "docker compose up -d".',

    faqAiLearningFailed: 'AI learning data failed to load',
    faqAiLearningFailedAnswer:
      'Causes: TA-Lib library not properly installed; Insufficient historical data (need completed trades); Environment configuration issues. Install TA-Lib: pip install TA-Lib or check system dependencies.',

    faqConfigNotEffective: 'Configuration changes not taking effect',
    faqConfigNotEffectiveAnswer:
      'For Docker: Need to rebuild with "docker compose down && docker compose up -d --build". For PM2: Restart with "pm2 restart all". Check configuration file format and path are correct.',

    // AI & Model Questions
    faqWhichModels: 'Which AI models are supported?',
    faqWhichModelsAnswer:
      'DeepSeek (recommended for cost/performance), Qwen (Alibaba Cloud), and Custom OpenAI-compatible APIs (can be used for OpenAI, Claude via proxy, or other providers).',

    faqApiCosts: 'How much do API calls cost?',
    faqApiCostsAnswer:
      'Depends on your model and decision frequency: DeepSeek: ~$0.10-0.50 per day (1 trader, 5min intervals); Qwen: ~$0.20-0.80 per day; Custom API (e.g., OpenAI GPT-4): ~$2-5 per day. Estimates based on typical usage.',

    faqMultipleModels: 'Can I use multiple AI models?',
    faqMultipleModelsAnswer:
      'Yes! Each trader can use a different AI model. You can even A/B test different models.',

    faqAiLearning: 'Does the AI learn from its mistakes?',
    faqAiLearningAnswer:
      'Yes, to some extent. NOFX provides historical performance feedback in each decision prompt, allowing the AI to adjust its strategy.',

    faqOnlyShort: 'AI only opens short positions, no long positions',
    faqOnlyShortAnswer:
      'The default system prompt contains "Don\'t have a long bias! Shorting is one of your core tools" which may cause this. Also affected by 4-hour timeframe data and model training bias. You can modify the system prompt to be more balanced.',

    faqModelSelection: 'Which DeepSeek version should I use?',
    faqModelSelectionAnswer:
      "DeepSeek V3 is recommended for best performance. Alternatives: DeepSeek R1 (reasoning model, slower but better logic), SiliconFlow's DeepSeek (alternative API provider). Most users report good results with V3.",

    // Data & Privacy
    faqDataStorage: 'Where is my data stored?',
    faqDataStorageAnswer:
      'All data is stored locally on your machine in SQLite databases: config.db (trader configurations), trading.db (trade history), and decision_logs/ (AI decision records).',

    faqApiKeySecurity: 'Is my API key secure?',
    faqApiKeySecurityAnswer:
      'API keys are stored in local databases. Never share your databases or .env files. We recommend using API keys with IP whitelist restrictions.',

    faqExportHistory: 'Can I export my trading history?',
    faqExportHistoryAnswer:
      'Yes! Trading data is in SQLite format. You can query it directly with: sqlite3 trading.db "SELECT * FROM trades;"',

    faqGetHelp: 'Where can I get help?',
    faqGetHelpAnswer:
      'Check GitHub Discussions, join our Telegram Community, or open an issue on GitHub.',

    // Trading Strategies
    faqHowToChooseStrategy: 'How do I choose a trading strategy?',
    faqHowToChooseStrategyAnswer:
      'NOFX offers 7 strategies: default (balanced), adaptive (maximum safety, confidence ≥85), adaptive_relaxed (more trading, confidence ≥80), risk_first (capital preservation priority), nof1 (conservative quality), Hansen (English/Hyperliquid), and taro_long (advanced autonomous). Choose based on your risk tolerance: Maximum safety → adaptive; Balanced safety + activity → adaptive_relaxed; Capital preservation → risk_first; Advanced users → taro_long; Simple/beginner → default or nof1.',

    faqStrategyDifferences: 'What are the differences between strategies?',
    faqStrategyDifferencesAnswer:
      'Strategies differ in: 1) Confidence thresholds (adaptive: ≥85, adaptive_relaxed: ≥80, others: ≥75-80); 2) Trade frequency (adaptive: very low, adaptive_relaxed: 8-15/day, others: 2-4/day); 3) Risk level (adaptive/risk_first: very low, taro_long: medium-high); 4) Features (adaptive: BTC status check, 8-item checklist, anti-fake-breakout; risk_first: volatility adaptation, TP ladder; taro_long: full AI autonomy). All prioritize capital preservation and quality over quantity.',

    faqSafestStrategy: 'Which strategy is the safest?',
    faqSafestStrategyAnswer:
      'The adaptive strategy is the safest with: Highest confidence threshold (≥85), strictest validation (5/8 checklist items, BTC status check), anti-fake-breakout detection, continuous loss protection (2 losses = 45min pause, 3 = 24h), and objective confidence scoring. The risk_first strategy is also very safe, prioritizing capital preservation with volatility-adaptive position sizing and systematic exit strategies.',

    faqMostFrequentStrategy: 'Which strategy trades most frequently?',
    faqMostFrequentStrategyAnswer:
      'The adaptive_relaxed strategy trades most frequently (8-15 trades/day expected) while maintaining core risk controls. It has relaxed thresholds: confidence ≥80 (vs 85), cooldown 6min (vs 9min), 2 timeframes (vs 3), 4/8 checklist (vs 5/8), and shorter loss pauses. The taro_long strategy can also trade frequently but frequency varies based on AI autonomous decisions.',

    faqSwitchStrategies: 'Can I switch strategies for an existing trader?',
    faqSwitchStrategiesAnswer:
      'Yes! You can change the system prompt template in the trader configuration. Go to the trader settings, select a different "System Prompt Template" from the dropdown (default, adaptive, adaptive_relaxed, risk_first, nof1, Hansen, or taro_long). The change takes effect when the trader restarts or on the next decision cycle. Note: Changing strategies doesn\'t affect existing positions, but new decisions will follow the new strategy rules.',

    faqStrategyRiskPriority: 'How do strategies prioritize risk vs profit?',
    faqStrategyRiskPriorityAnswer:
      'All strategies prioritize capital preservation first, but with different emphasis: adaptive/risk_first/nof1 → Capital preservation > Profit (very conservative); adaptive_relaxed → Balanced (more trading but still safe); default/Hansen → Balanced (standard risk management); taro_long → AI-determined (autonomous risk assessment). The risk_first strategy explicitly states "Capital Preservation > Profit" and uses volatility-adaptive sizing. The adaptive strategy uses "doubt-first principle" - when uncertain, always choose wait.',

    faqStrategyComparison: 'Can you compare all strategies in a table?',
    faqStrategyComparisonAnswer:
      'Quick comparison: | Strategy | Confidence | Frequency | Risk | Best For | |----------|------------|-----------|------|----------| | adaptive | ≥85 | Very low | Very low | Maximum protection | | adaptive_relaxed | ≥80 | 8-15/day | Low | More activity, still safe | | risk_first | ≥75 | 2-4/day | Very low | Capital preservation | | nof1 | ≥80-85 | 2-4/day | Low | Conservative quality | | default | ≥75 | 2-4/day | Medium | Beginners | | Hansen | Variable | 2-4/day | Medium | English/Hyperliquid | | taro_long | AI-determined | Variable | Medium-High | Advanced autonomy |',

    faqStrategyCustomization: 'Can I customize or modify strategies?',
    faqStrategyCustomizationAnswer:
      'Yes! You can customize strategies in two ways: 1) Custom Prompt: Add your own trading rules that supplement or override the base prompt. Go to trader settings → "Custom Prompt" field. You can choose to override the base prompt entirely or supplement it. 2) System Prompt Template: Select from 7 pre-built templates. For advanced users, you can edit the prompt files in the prompts/ directory (default.txt, adaptive.txt, etc.) to create your own custom strategy templates.',

    // Trading Strategies Page
    strategiesTitle: 'Trading Strategies',
    strategiesSubtitle:
      'Learn about all available trading strategies and choose the one that fits your risk tolerance',
    strategiesIntroductionTitle: 'Introduction',
    strategiesIntroduction:
      'NOFX offers 7 different trading strategies, each designed for different risk profiles and trading styles. All strategies prioritize capital preservation and quality over quantity, but they differ in confidence thresholds, trade frequency, and risk management approaches.',
    strategiesComparisonTitle: 'Strategy Comparison',
    strategiesComparisonIntro:
      'Here is a quick comparison of all available strategies:',
    strategiesComparisonTable:
      'Strategy          | Confidence | Frequency      | Risk Level    | Best For\n' +
      '------------------|------------|----------------|---------------|-------------------\n' +
      'adaptive          | ≥85        | Very low       | Very low      | Maximum protection\n' +
      'adaptive_relaxed  | ≥80        | 8-15/day       | Low           | More activity, still safe\n' +
      'risk_first        | ≥75        | 2-4/day        | Very low      | Capital preservation\n' +
      'nof1              | ≥80-85     | 2-4/day        | Low           | Conservative quality\n' +
      'default           | ≥75        | 2-4/day        | Medium        | Beginners\n' +
      'Hansen            | Variable   | 2-4/day        | Medium        | English/Hyperliquid\n' +
      'taro_long         | AI-determined | Variable   | Medium-High   | Advanced autonomy',
    strategiesDetailsTitle: 'Strategy Details',
    strategyDefaultTitle: 'Default Strategy',
    strategyDefaultDescription:
      'A balanced strategy suitable for beginners. Uses confidence threshold ≥75, trades 2-4 times per day, with medium risk level. This is the standard strategy that provides a good balance between safety and trading activity.',
    strategyAdaptiveTitle: 'Adaptive Strategy',
    strategyAdaptiveDescription:
      'The safest strategy with maximum protection. Uses highest confidence threshold (≥85), very low trade frequency, and strictest validation including BTC status check, 8-item checklist (requires 5/8), anti-fake-breakout detection, and continuous loss protection (2 losses = 45min pause, 3 = 24h). Best for users who prioritize capital preservation above all else.',
    strategyAdaptiveRelaxedTitle: 'Adaptive Relaxed Strategy',
    strategyAdaptiveRelaxedDescription:
      'A more active version of the adaptive strategy while maintaining core risk controls. Uses confidence threshold ≥80 (vs 85), cooldown 6min (vs 9min), 2 timeframes (vs 3), 4/8 checklist (vs 5/8), and shorter loss pauses. Expected to trade 8-15 times per day. Best for users who want more trading activity but still prioritize safety.',
    strategyRiskFirstTitle: 'Risk First Strategy',
    strategyRiskFirstDescription:
      'Prioritizes capital preservation with explicit "Capital Preservation > Profit" principle. Uses confidence threshold ≥75, trades 2-4 times per day, with very low risk level. Features volatility-adaptive position sizing and systematic exit strategies. Best for users who want maximum capital protection.',
    strategyNof1Title: 'NOF1 Strategy',
    strategyNof1Description:
      'A conservative quality-focused strategy. Uses confidence threshold ≥80-85, trades 2-4 times per day, with low risk level. Emphasizes quality over quantity in trading decisions. Best for users who prefer conservative, high-quality trades.',
    strategyHansenTitle: 'Hansen Strategy',
    strategyHansenDescription:
      'Designed for English-speaking users and Hyperliquid exchange. Uses variable confidence thresholds, trades 2-4 times per day, with medium risk level. Optimized for specific exchange characteristics and English language prompts.',
    strategyTaroLongTitle: 'Taro Long Strategy',
    strategyTaroLongDescription:
      'An advanced autonomous strategy with full AI decision-making. Uses AI-determined confidence thresholds, variable trade frequency, with medium-high risk level. Provides maximum autonomy to the AI for risk assessment and trading decisions. Best for advanced users who want full AI autonomy.',
    strategiesHowToChooseTitle: 'How to Choose a Strategy',
    strategiesHowToChoose:
      'Choose based on your risk tolerance: Maximum safety → adaptive; Balanced safety + activity → adaptive_relaxed; Capital preservation → risk_first; Advanced users → taro_long; Simple/beginner → default or nof1. You can switch strategies at any time in the trader configuration settings.',
    strategiesCustomizationTitle: 'Customizing Strategies',
    strategiesCustomization:
      'You can customize strategies in two ways: 1) Custom Prompt: Add your own trading rules that supplement or override the base prompt. Go to trader settings → "Custom Prompt" field. You can choose to override the base prompt entirely or supplement it. 2) System Prompt Template: Select from 7 pre-built templates. For advanced users, you can edit the prompt files in the prompts/ directory (default.txt, adaptive.txt, etc.) to create your own custom strategy templates.',
    strategiesStillHaveQuestions: 'Still have questions?',
    strategiesContactUs:
      'Join our community or check GitHub for more help and detailed documentation.',

    // Error Messages (API)
    errorGetTradersFailed: 'Failed to get trader list',
    errorGetPublicTradersFailed: 'Failed to get public trader list',
    errorCreateTraderFailed: 'Failed to create trader',
    errorDeleteTraderFailed: 'Failed to delete trader',
    errorStartTraderFailed: 'Failed to start trader',
    errorStopTraderFailed: 'Failed to stop trader',
    errorUpdateTraderPromptFailed: 'Failed to update custom strategy',
    errorGetTraderConfigFailed: 'Failed to get trader configuration',
    errorUpdateTraderFailed: 'Failed to update trader',
    errorGetModelConfigsFailed: 'Failed to get model configuration',
    errorGetSupportedModelsFailed: 'Failed to get supported models',
    errorUpdateModelConfigsFailed: 'Failed to update model configuration',
    errorGetExchangeConfigsFailed: 'Failed to get exchange configuration',
    errorGetSupportedExchangesFailed: 'Failed to get supported exchanges',
    errorUpdateExchangeConfigsFailed: 'Failed to update exchange configuration',
    errorGetStatusFailed: 'Failed to get system status',
    errorGetAccountFailed: 'Failed to get account information',
    errorGetPositionsFailed: 'Failed to get positions list',
    errorGetDecisionsFailed: 'Failed to get decision logs',
    errorGetLatestDecisionsFailed: 'Failed to get latest decisions',
    errorGetStatisticsFailed: 'Failed to get statistics',
    errorGetEquityHistoryFailed: 'Failed to get historical data',
    errorGetEquityHistoryBatchFailed: 'Failed to get batch historical data',
    errorGetTopTradersFailed: 'Failed to get top 5 traders',
    errorGetPublicTraderConfigFailed:
      'Failed to get public trader configuration',
    errorGetPerformanceFailed: 'Failed to get AI learning data',
    errorGetCompetitionFailed: 'Failed to get competition data',
    errorGetUserSignalSourceFailed:
      'Failed to get user signal source configuration',
    errorSaveUserSignalSourceFailed:
      'Failed to save user signal source configuration',
    errorGetServerIPFailed: 'Failed to get server IP',

    // Solution List Items
    signalSourceSolution1:
      "Click '📡 {signalSource}' button to configure API address",
    signalSourceSolution2:
      "Or disable 'Use Coin Pool' and 'Use OI Top' in trader configuration",
    signalSourceSolution3: 'Or set custom coin list in trader configuration',

    // Auth Error Messages
    errorLoginFailed: 'Login failed',
    errorLoginFailedRetry: 'Login failed, please retry',
    errorUnknownError: 'Unknown error',
    errorRegisterFailed: 'Registration failed, please retry',
    errorRegisterFailedRetry: 'Registration failed, please retry',
    errorVerifyOTPFailed: 'OTP verification failed, please retry',
    errorCompleteRegistrationFailed:
      'Registration completion failed, please retry',
    errorResetPasswordFailed: 'Password reset failed, please retry',

    // Language Labels
    languageChinese: '中文',
    languageEnglish: 'English',

    // AI Learning Strategy Feedback Messages
    sharpeRatioExcellent:
      '✨ AI strategy is highly effective! Risk-adjusted returns are excellent, can moderately increase position size but maintain discipline.',
    sharpeRatioGood:
      '✅ Strategy performance is stable, risk-return balance is good, continue with current strategy.',
    sharpeRatioFair:
      '⚠️ Returns are positive but volatility is high, AI is optimizing strategy and reducing risk.',
    sharpeRatioPoor:
      '🚨 Current strategy needs adjustment! AI has automatically entered conservative mode, reducing position size and trading frequency.',
    profitFactorExcellent:
      '🔥 Profitability is excellent! For every $1 lost, can earn {factor}, AI strategy performance is excellent.',
    profitFactorGood:
      '✓ Strategy is consistently profitable, profit-loss ratio is healthy, continue disciplined trading.',
    profitFactorFair:
      '⚠️ Strategy is slightly profitable but needs optimization, AI is adjusting position size and stop-loss strategy.',
    profitFactorPoor:
      '❌ Average loss exceeds profit, need to adjust strategy or reduce trading frequency.',

    // Sharpe Ratio Labels
    sharpeRatio: 'Sharpe Ratio',
    sharpeRatioSubtitle: 'Risk-adjusted returns · AI self-evolution indicator',
    sharpeRatioStatusExcellent: '🟢 Excellent performance',
    sharpeRatioStatusGood: '🟢 Good performance',
    sharpeRatioStatusVolatile: '🟡 High volatility',
    sharpeRatioStatusNeedsAdjustment: '🔴 Needs adjustment',

    // Trader Config Modal
    traderConfig: 'Trader Configuration',
    traderConfigInfo: "{name}'s configuration information",
    copied: '✓ Copied',
    copyButton: '📋 Copy',
    yes: 'Yes',
    no: 'No',
    basicInfo: '🤖 Basic Information',
    traderId: 'Trader ID',
    aiModel: 'AI Model',
    aiModelLabel: 'AI Model',
    exchange: 'Exchange',
    exchangeLabel: 'Exchange',
    basicConfig: '🤖 Basic Configuration',
    tradingConfig: '⚖️ Trading Configuration',
    marginMode: 'Margin Mode',
    crossMargin: 'Cross Margin',
    isolatedMargin: 'Isolated Margin',
    initialBalanceLabel: 'Initial Balance ($)',
    btcEthLeverageLabel: 'BTC/ETH Leverage',
    altcoinLeverageLabel: 'Altcoin Leverage',
    tradingSymbolsLabel: 'Trading Symbols',
    tradingSymbolsPlaceholderWithHint:
      'Trading Symbols (comma-separated, leave empty to use default)',
    tradingSymbolsExample: 'Example: BTCUSDT,ETHUSDT,ADAUSDT',
    clickToSelectCoins: 'Click to select coins:',
    useDefaultSymbols: 'Use default symbols',
    coinPoolSignal: 'Coin Pool Signal',
    useCoinPoolSignalLabel: 'Use Coin Pool Signal',
    oiTopSignal: 'OI Top Signal',
    useOiTopSignalLabel: 'Use OI Top Signal',
    tradingStrategyPrompt: '💬 Trading Strategy Prompt',
    systemPromptTemplate: 'System Prompt Template',
    systemPromptTemplateHelper:
      'Select a preset trading strategy template (includes trading philosophy, risk control principles, etc.)',
    templateDefault: 'Default (Conservative)',
    templateAggressive: 'Aggressive',
    overrideDefaultPrompt: 'Override Default Prompt',
    overrideDefaultPromptWarning:
      'When enabled, will completely replace the default strategy',
    customPrompt: 'Custom Prompt',
    additionalPrompt: 'Additional Prompt',
    noCustomPromptSet: 'No custom prompt set, using system default strategy',
    close: 'Close',
    copiedConfig: '✓ Copied Configuration',
    copyFullConfig: '📋 Copy Full Configuration',

    // Registration Form
    betaCodeRequired: 'Beta code required during beta period',
    betaCodeLabel: 'Beta Code *',
    betaCodePlaceholder: 'Enter 6-digit beta code',
    betaCodeDescription:
      'Beta code consists of 6 alphanumeric characters, case-sensitive',

    // Login Page
    loginSubtitleLogin: 'Please enter your email and password',
    loginSubtitleOTP: 'Please enter the two-factor verification code',
    adminPasswordLabel: 'Admin Password',
    adminPasswordPlaceholder: 'Please enter admin password',

    // Trader Config Modal
    balanceFetchEditOnly: 'Can only fetch current balance in edit mode',
    balanceFetchFailed: 'Failed to fetch account balance',
    balanceFetchErrorNetwork:
      'Failed to fetch balance, please check network connection',
    editTraderTitle: 'Edit Trader',
    createTraderTitle: 'Create Trader',
    editTraderSubtitle: 'Edit trader configuration parameters',
    createTraderSubtitle: 'Configure new AI trader',
    traderNameLabel: 'Trader Name',
    traderNamePlaceholder: 'Please enter trader name',
    fetchingBalance: 'Fetching...',
    fetchCurrentBalance: 'Fetch Current Balance',
    balanceFetchInstruction:
      'Click "Fetch Current Balance" button to automatically get your exchange account current equity',
    initialBalanceWarning:
      'Please enter your exchange account current actual balance. If input is inaccurate, P&L statistics will be incorrect.',
    collapseSelection: 'Collapse Selection',
    quickSelection: 'Quick Selection',
    customPromptLabel: 'Custom Prompt',
    additionalPromptLabel: 'Additional Prompt',
    customPromptPlaceholder: 'Enter complete trading strategy prompt...',
    additionalPromptPlaceholder: 'Enter additional trading strategy prompt...',
    cancelButton: 'Cancel',
    saving: 'Saving...',
    saveChanges: 'Save Changes',
    createTraderButton: 'Create Trader',

    // Model Configuration
    modelNameOptional: 'Model Name (Optional)',
    modelNamePlaceholder: 'Example: deepseek-chat, qwen3-max, gpt-5',
    modelNameHelper: 'Leave empty to use default model name',

    // Binance Configuration Guide
    binanceUserRequired: 'Binance Users Must Read:',
    binanceApiType:
      'Use "Spot & Futures Trading" API, do not use "Unified Account API"',
    binanceReason:
      'Reason: Unified Account API has different permission structure, which will cause order submission to fail',
    binanceConfigSteps: 'Correct Configuration Steps:',
    binanceStep1: 'Log in to Binance → Personal Center → API Management',
    binanceStep2: 'Create API → Select "System Generated API Key"',
    binanceStep3:
      'Check "Spot & Futures Trading" (do not select unified account)',
    binanceStep4: 'IP restriction: Select "No Restriction" or add server IP',
    binanceMultiAssetWarning:
      '💡 Multi-Asset Mode Users Note: If you have enabled multi-asset mode, it will force cross margin mode. It is recommended to disable multi-asset mode to support isolated margin trading.',
    binanceOfficialTutorial: '📖 View Binance Official Tutorial ↗',

    // Duration Formatting
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',

    // FAQ Components
    faqSearchPlaceholder: 'Search FAQ...',
    faqNoMatches: 'No matching questions found',
    faqClearSearch: 'Clear Search',
    faqLinksLabel: 'Links:',
    faqRoadmap: 'Roadmap',
    faqTaskDashboard: 'Task Dashboard',
    faqReferencesLabel: 'References:',

    // Recommendations
    'recommendations.title': 'Coin Recommendations',
    'recommendations.autoRefresh': 'Auto-refresh',
    'recommendations.nextUpdate': 'Next update',
    'recommendations.refreshNow': 'Refresh Now',
    'recommendations.majorCoins': 'Major Coins (BTC/ETH)',
    'recommendations.altcoins': 'Altcoins',
    'recommendations.performance': 'Historical Performance',
    'common.loading': 'Loading...',
  },
  zh: {
    // Header
    appTitle: 'NOFX',
    subtitle: '多AI模型交易平台',
    aiTraders: 'AI交易员',
    details: '详情',
    tradingPanel: '交易面板',
    competition: '竞赛',
    running: '运行中',
    stopped: '已停止',
    adminMode: '管理员模式',
    logout: '退出',
    switchTrader: '切换交易员:',
    view: '查看',

    // Navigation
    realtimeNav: '实时',
    configNav: '配置',
    dashboardNav: '看板',
    recommendationsNav: '推荐',
    faqNav: '常见问题',
    strategiesNav: '交易策略',

    // Footer
    footerTitle: 'NOFX - AI交易系统',
    footerWarning: '⚠️ 交易有风险，请谨慎使用。',

    // Stats Cards
    totalEquity: '总净值',
    availableBalance: '可用余额',
    totalPnL: '总盈亏',
    positions: '持仓',
    margin: '保证金',
    free: '空闲',

    // Positions Table
    currentPositions: '当前持仓',
    active: '活跃',
    symbol: '币种',
    side: '方向',
    entryPrice: '入场价',
    markPrice: '标记价',
    quantity: '数量',
    positionValue: '仓位价值',
    leverage: '杠杆',
    unrealizedPnL: '未实现盈亏',
    liqPrice: '强平价',
    long: '多头',
    short: '空头',
    noPositions: '无持仓',
    noActivePositions: '当前没有活跃的交易持仓',

    // Recent Decisions
    recentDecisions: '最近决策',
    lastCycles: '最近 {count} 个交易周期',
    noDecisionsYet: '暂无决策',
    aiDecisionsWillAppear: 'AI交易决策将显示在这里',
    cycle: '周期',
    success: '成功',
    failed: '失败',
    inputPrompt: '输入提示',
    aiThinking: '💭 AI思维链分析',
    collapse: '▼ 收起',
    expand: '▶ 展开',
    translate: '翻译',
    translating: '翻译中...',
    translationError: '翻译失败',
    showOriginal: '显示原文',
    showTranslated: '显示翻译',

    // Equity Chart
    accountEquityCurve: '账户净值曲线',
    noHistoricalData: '暂无历史数据',
    dataWillAppear: '运行几个周期后将显示收益率曲线',
    initialBalance: '初始余额',
    currentEquity: '当前净值',
    historicalCycles: '历史周期',
    displayRange: '显示范围',
    recent: '最近',
    allData: '全部数据',
    cycles: '个',

    // Comparison Chart
    comparisonMode: '对比模式',
    dataPoints: '数据点数',
    currentGap: '当前差距',
    count: '{count} 个',

    // Competition Page
    aiCompetition: 'AI竞赛',
    traders: '交易员',
    liveBattle: '实时对战',
    realTimeBattle: '实时对战',
    leader: '领先者',
    leaderboard: '排行榜',
    live: '实时',
    realTime: '实时',
    performanceComparison: '表现对比',
    realTimePnL: '实时收益率',
    realTimePnLPercent: '实时收益率',
    headToHead: '正面对决',
    leadingBy: '领先 {gap}%',
    behindBy: '落后 {gap}%',
    equity: '权益',
    pnl: '收益',
    pos: '持仓',

    // AI Learning
    aiLearning: 'AI学习与反思',
    tradesAnalyzed: '已分析 {count} 笔交易 · 实时演化',
    latestReflection: '最新反思',
    fullCoT: '📋 完整思维链',
    totalTrades: '总交易数',
    winRate: '胜率',
    avgWin: '平均盈利',
    avgLoss: '平均亏损',
    profitFactor: '盈亏比',
    avgWinDivLoss: '平均盈利 ÷ 平均亏损',
    excellent: '🔥 优秀 - 盈利能力强',
    good: '✓ 良好 - 稳定盈利',
    fair: '⚠️ 一般 - 需要优化',
    poor: '❌ 较差 - 亏损超过盈利',
    bestPerformer: '最佳表现',
    worstPerformer: '最差表现',
    symbolPerformance: '📊 币种表现',
    tradeHistory: '历史成交',
    completedTrades: '最近 {count} 笔已完成交易',
    noCompletedTrades: '暂无完成的交易',
    completedTradesWillAppear: '已完成的交易将显示在这里',
    entry: '入场',
    exit: '出场',
    stopLoss: '止损',
    latest: '最新',

    // AI Learning Description
    howAILearns: '💡 AI如何学习和进化',
    aiLearningPoint1: '每次决策前分析最近20个交易周期',
    aiLearningPoint2: '识别表现最好和最差的币种',
    aiLearningPoint3: '根据胜率优化仓位大小',
    aiLearningPoint4: '避免重复过去的错误',

    // AI Traders Management
    manageAITraders: '管理您的AI交易机器人',
    aiModels: 'AI模型',
    exchanges: '交易所',
    createTrader: '创建交易员',
    modelConfiguration: '模型配置',
    configured: '已配置',
    notConfigured: '未配置',
    currentTraders: '当前交易员',
    noTraders: '暂无AI交易员',
    createFirstTrader: '创建您的第一个AI交易员开始使用',
    configureModelsFirst: '请先配置AI模型',
    configureExchangesFirst: '请先配置交易所',
    configureModelsAndExchangesFirst: '请先配置AI模型和交易所',
    modelNotConfigured: '所选模型未配置',
    exchangeNotConfigured: '所选交易所未配置',
    confirmDeleteTrader: '确定要删除这个交易员吗？',
    status: '状态',
    start: '启动',
    stop: '停止',
    createNewTrader: '创建新的AI交易员',
    selectAIModel: '选择AI模型',
    selectExchange: '选择交易所',
    traderName: '交易员名称',
    enterTraderName: '输入交易员名称',
    cancel: '取消',
    create: '创建',
    configureAIModels: '配置AI模型',
    configureExchanges: '配置交易所',
    aiScanInterval: 'AI 扫描决策间隔 (分钟)',
    scanIntervalRecommend: '建议: 3-10分钟',
    useTestnet: '使用测试网',
    enabled: '启用',
    save: '保存',

    // AI Model Configuration
    officialAPI: '官方API',
    customAPI: '自定义API',
    apiKey: 'API密钥',
    customAPIURL: '自定义API地址',
    enterAPIKey: '请输入API密钥',
    enterCustomAPIURL: '请输入自定义API端点地址',
    useOfficialAPI: '使用官方API服务',
    useCustomAPI: '使用自定义API端点',

    // Exchange Configuration
    secretKey: '密钥',
    privateKey: '私钥',
    walletAddress: '钱包地址',
    user: '用户名',
    signer: '签名者',
    passphrase: '口令',
    enterSecretKey: '输入密钥',
    enterPrivateKey: '输入私钥',
    enterWalletAddress: '输入钱包地址',
    enterUser: '输入用户名',
    enterSigner: '输入签名者地址',
    enterPassphrase: '输入Passphrase (OKX必填)',
    hyperliquidPrivateKeyDesc: 'Hyperliquid 使用私钥进行交易认证',
    hyperliquidWalletAddressDesc: '与私钥对应的钱包地址',
    asterUserDesc:
      '主钱包地址 - 您用于登录 Aster 的 EVM 钱包地址（注意：仅支持 EVM 钱包，不支持 Solana 钱包）',
    asterSignerDesc:
      'API 钱包地址 - 从 https://www.asterdex.com/zh-CN/api-wallet 生成',
    asterPrivateKeyDesc:
      'API 钱包私钥 - 从 https://www.asterdex.com/zh-CN/api-wallet 获取（仅在本地用于签名，不会被传输）',
    asterUsdtWarning:
      '重要提示：Aster 仅统计 USDT 余额。请确保您使用 USDT 作为保证金币种，避免其他资产（BNB、ETH等）的价格波动导致盈亏统计错误',
    testnetDescription: '启用后将连接到交易所测试环境,用于模拟交易',
    securityWarning: '安全提示',
    saveConfiguration: '保存配置',

    // Trader Configuration
    positionMode: '仓位模式',
    crossMarginMode: '全仓模式',
    isolatedMarginMode: '逐仓模式',
    crossMarginDescription: '全仓模式：所有仓位共享账户余额作为保证金',
    isolatedMarginDescription: '逐仓模式：每个仓位独立管理保证金，风险隔离',
    leverageConfiguration: '杠杆配置',
    btcEthLeverage: 'BTC/ETH杠杆',
    altcoinLeverage: '山寨币杠杆',
    leverageRecommendation: '推荐：BTC/ETH 5-10倍，山寨币 3-5倍，控制风险',
    tradingSymbols: '交易币种',
    tradingSymbolsPlaceholder:
      '输入币种，逗号分隔（如：BTCUSDT,ETHUSDT,SOLUSDT）',
    selectSymbols: '选择币种',
    selectTradingSymbols: '选择交易币种',
    selectedSymbolsCount: '已选择 {count} 个币种',
    clearSelection: '清空选择',
    confirmSelection: '确认选择',
    tradingSymbolsDescription:
      '留空 = 使用默认币种。必须以USDT结尾（如：BTCUSDT, ETHUSDT）',
    btcEthLeverageValidation: 'BTC/ETH杠杆必须在1-50倍之间',
    altcoinLeverageValidation: '山寨币杠杆必须在1-20倍之间',
    invalidSymbolFormat: '无效的币种格式：{symbol}，必须以USDT结尾',

    // Loading & Error
    loading: '加载中...',
    loadingError: '⚠️ 加载AI学习数据失败',
    noCompleteData: '暂无完整交易数据（需要完成开仓→平仓的完整周期）',

    // AI Traders Page - Additional
    inUse: '正在使用',
    noModelsConfigured: '暂无已配置的AI模型',
    noExchangesConfigured: '暂无已配置的交易所',
    signalSource: '信号源',
    signalSourceConfig: '信号源配置',
    coinPoolDescription: '用于获取币种池数据的API地址，留空则不使用此信号源',
    oiTopDescription: '用于获取持仓量排行数据的API地址，留空则不使用此信号源',
    information: '说明',
    signalSourceInfo1:
      '• 信号源配置为用户级别，每个用户可以设置自己的信号源URL',
    signalSourceInfo2: '• 在创建交易员时可以选择是否使用这些信号源',
    signalSourceInfo3: '• 配置的URL将用于获取市场数据和交易信号',
    editAIModel: '编辑AI模型',
    addAIModel: '添加AI模型',
    confirmDeleteModel: '确定要删除此AI模型配置吗？',
    cannotDeleteModelInUse: '无法删除此AI模型，因为有交易员正在使用',
    tradersUsing: '正在使用此配置的交易员',
    pleaseDeleteTradersFirst: '请先删除或重新配置这些交易员',
    selectModel: '选择AI模型',
    pleaseSelectModel: '请选择模型',
    customBaseURL: 'Base URL (可选)',
    customBaseURLPlaceholder: '自定义API基础URL，如: https://api.openai.com/v1',
    leaveBlankForDefault: '留空则使用默认API地址',
    modelConfigInfo1: '• API Key将被加密存储，请确保密钥有效',
    modelConfigInfo2: '• Base URL用于自定义API服务器地址',
    modelConfigInfo3: '• 删除配置后，使用此模型的交易员将无法正常工作',
    saveConfig: '保存配置',
    editExchange: '编辑交易所',
    addExchange: '添加交易所',
    confirmDeleteExchange: '确定要删除此交易所配置吗？',
    cannotDeleteExchangeInUse: '无法删除此交易所，因为有交易员正在使用',
    pleaseSelectExchange: '请选择交易所',
    exchangeConfigWarning1: '• API密钥将被加密存储，建议使用只读或期货交易权限',
    exchangeConfigWarning2: '• 不要授予提现权限，确保资金安全',
    exchangeConfigWarning3: '• 删除配置后，相关交易员将无法正常交易',
    edit: '编辑',
    viewGuide: '查看教程',
    binanceSetupGuide: '币安配置教程',
    closeGuide: '关闭',
    whitelistIP: '白名单IP',
    whitelistIPDesc: '币安交易所需要填写白名单IP',
    serverIPAddresses: '服务器IP地址',
    copyIP: '复制',
    ipCopied: 'IP已复制',
    loadingServerIP: '正在加载服务器IP...',

    // Error Messages
    createTraderFailed: '创建交易员失败',
    getTraderConfigFailed: '获取交易员配置失败',
    modelConfigNotExist: 'AI模型配置不存在或未启用',
    exchangeConfigNotExist: '交易所配置不存在或未启用',
    updateTraderFailed: '更新交易员失败',
    deleteTraderFailed: '删除交易员失败',
    operationFailed: '操作失败',
    deleteConfigFailed: '删除配置失败',
    modelNotExist: '模型不存在',
    saveConfigFailed: '保存配置失败',
    exchangeNotExist: '交易所不存在',
    deleteExchangeConfigFailed: '删除交易所配置失败',
    saveSignalSourceFailed: '保存信号源配置失败',

    // Login & Register
    login: '登录',
    register: '注册',
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    emailPlaceholder: '请输入邮箱地址',
    passwordPlaceholder: '请输入密码（至少6位）',
    confirmPasswordPlaceholder: '请再次输入密码',
    otpPlaceholder: '000000',
    loginTitle: '登录到您的账户',
    registerTitle: '创建新账户',
    loginButton: '登录',
    registerButton: '注册',
    back: '返回',
    noAccount: '还没有账户？',
    hasAccount: '已有账户？',
    registerNow: '立即注册',
    loginNow: '立即登录',
    forgotPassword: '忘记密码？',
    rememberMe: '记住我',
    resetPassword: '重置密码',
    resetPasswordTitle: '重置您的密码',
    newPassword: '新密码',
    newPasswordPlaceholder: '请输入新密码（至少6位）',
    resetPasswordButton: '重置密码',
    resetPasswordSuccess: '密码重置成功！请使用新密码登录',
    resetPasswordFailed: '密码重置失败',
    backToLogin: '返回登录',
    otpCode: 'OTP验证码',
    scanQRCode: '扫描二维码',
    enterOTPCode: '输入6位OTP验证码',
    verifyOTP: '验证OTP',
    setupTwoFactor: '设置双因素认证',
    setupTwoFactorDesc: '请按以下步骤设置Google验证器以保护您的账户安全',
    scanQRCodeInstructions: '使用Google Authenticator或Authy扫描此二维码',
    otpSecret: '或手动输入此密钥：',
    qrCodeHint: '二维码（如果无法扫描，请使用下方密钥）：',
    authStep1Title: '步骤1：下载Google Authenticator',
    authStep1Desc: '在手机应用商店下载并安装Google Authenticator应用',
    authStep2Title: '步骤2：添加账户',
    authStep2Desc: '在应用中点击“+”，选择“扫描二维码”或“手动输入密钥”',
    authStep3Title: '步骤3：验证设置',
    authStep3Desc: '设置完成后，点击下方按钮输入6位验证码',
    setupCompleteContinue: '我已完成设置，继续',
    copy: '复制',
    completeRegistration: '完成注册',
    completeRegistrationSubtitle: '以完成注册',
    loginSuccess: '登录成功',
    registrationSuccess: '注册成功',
    loginFailed: '登录失败',
    registrationFailed: '注册失败',
    verificationFailed: 'OTP验证失败',
    invalidCredentials: '邮箱或密码错误',
    passwordMismatch: '两次输入的密码不一致',
    emailRequired: '请输入邮箱',
    passwordRequired: '请输入密码',
    invalidEmail: '邮箱格式不正确',
    passwordTooShort: '密码至少需要6个字符',

    // Landing Page
    features: '功能',
    howItWorks: '如何运作',
    community: '社区',
    language: '语言',
    loggedInAs: '已登录为',
    exitLogin: '退出登录',
    signIn: '登录',
    signUp: '注册',

    // Hero Section
    githubStarsInDays: '3 天内 2.5K+ GitHub Stars',
    heroTitle1: 'Read the Market.',
    heroTitle2: 'Write the Trade.',
    heroDescription:
      'NOFX 是 AI 交易的未来标准——一个开放、社区驱动的代理式交易操作系统。支持 Binance、Aster DEX 等交易所，自托管、多代理竞争，让 AI 为你自动决策、执行和优化交易。',
    poweredBy: '由 Aster DEX 和 Binance 提供支持，Amber.ac 战略投资。',

    // Landing Page CTA
    readyToDefine: '准备好定义 AI 交易的未来吗？',
    startWithCrypto:
      '从加密市场起步，扩展到 TradFi。NOFX 是 AgentFi 的基础架构。',
    getStartedNow: '立即开始',
    viewSourceCode: '查看源码',

    // Features Section
    coreFeatures: '核心功能',
    whyChooseNofx: '为什么选择 NOFX？',
    openCommunityDriven: '开源、透明、社区驱动的 AI 交易操作系统',
    openSourceSelfHosted: '100% 开源与自托管',
    openSourceDesc: '你的框架，你的规则。非黑箱，支持自定义提示词和多模型。',
    openSourceFeatures1: '完全开源代码',
    openSourceFeatures2: '支持自托管部署',
    openSourceFeatures3: '自定义 AI 提示词',
    openSourceFeatures4: '多模型支持（DeepSeek、Qwen）',
    multiAgentCompetition: '多代理智能竞争',
    multiAgentDesc: 'AI 策略在沙盒中高速战斗，最优者生存，实现策略进化。',
    multiAgentFeatures1: '多 AI 代理并行运行',
    multiAgentFeatures2: '策略自动优化',
    multiAgentFeatures3: '沙盒安全测试',
    multiAgentFeatures4: '跨市场策略移植',
    secureReliableTrading: '安全可靠交易',
    secureDesc: '企业级安全保障，完全掌控你的资金和交易策略。',
    secureFeatures1: '本地私钥管理',
    secureFeatures2: 'API 权限精细控制',
    secureFeatures3: '实时风险监控',
    secureFeatures4: '交易日志审计',

    // About Section
    aboutNofx: '关于 NOFX',
    whatIsNofx: '什么是 NOFX？',
    nofxNotAnotherBot: "NOFX 不是另一个交易机器人，而是 AI 交易的 'Linux' ——",
    nofxDescription1: "一个透明、可信任的开源 OS，提供统一的 '决策-风险-执行'",
    nofxDescription2: '层，支持所有资产类别。',
    nofxDescription3:
      '从加密市场起步（24/7、高波动性完美测试场），未来扩展到股票、期货、外汇。核心：开放架构、AI',
    nofxDescription4:
      '达尔文主义（多代理自竞争、策略进化）、CodeFi 飞轮（开发者 PR',
    nofxDescription5: '贡献获积分奖励）。',
    youFullControl: '你 100% 掌控',
    fullControlDesc: '完全掌控 AI 提示词和资金',
    startupMessages1: '启动自动交易系统...',
    startupMessages2: 'API服务器启动在端口 8080',
    startupMessages3: 'Web 控制台 http://localhost:3000',

    // How It Works Section
    howToStart: '如何开始使用 NOFX',
    fourSimpleSteps: '四个简单步骤，开启 AI 自动交易之旅',
    step1Title: '拉取 GitHub 仓库',
    step1Desc:
      'git clone https://github.com/tinkle-community/nofx 并切换到 dev 分支测试新功能。',
    step2Title: '配置环境',
    step2Desc:
      '前端设置交易所 API（如 Binance、Hyperliquid）、AI 模型和自定义提示词。',
    step3Title: '部署与运行',
    step3Desc:
      '一键 Docker 部署，启动 AI 代理。注意：高风险市场，仅用闲钱测试。',
    step4Title: '优化与贡献',
    step4Desc: '监控交易，提交 PR 改进框架。加入 Telegram 分享策略。',
    importantRiskWarning: '重要风险提示',
    riskWarningText:
      'dev 分支不稳定，勿用无法承受损失的资金。NOFX 非托管，无官方策略。交易有风险，投资需谨慎。',

    // Community Section (testimonials are kept as-is since they are quotes)

    // Footer Section
    futureStandardAI: 'AI 交易的未来标准',
    links: '链接',
    resources: '资源',
    documentation: '文档',
    supporters: '支持方',
    strategicInvestment: '(战略投资)',

    // Login Modal
    accessNofxPlatform: '访问 NOFX 平台',
    loginRegisterPrompt: '请选择登录或注册以访问完整的 AI 交易平台',
    registerNewAccount: '注册新账号',

    // Candidate Coins Warnings
    candidateCoins: '候选币种',
    candidateCoinsZeroWarning: '候选币种数量为 0',
    possibleReasons: '可能原因：',
    coinPoolApiNotConfigured: '币种池API未配置或无法访问（请检查信号源设置）',
    apiConnectionTimeout: 'API连接超时或返回数据为空',
    noCustomCoinsAndApiFailed: '未配置自定义币种且API获取失败',
    solutions: '解决方案：',
    setCustomCoinsInConfig: '在交易员配置中设置自定义币种列表',
    orConfigureCorrectApiUrl: '或者配置正确的币种池API地址',
    orDisableCoinPoolOptions: '或者禁用"使用币种池"和"使用OI Top"选项',
    signalSourceNotConfigured: '信号源未配置',
    signalSourceWarningMessage:
      '您有交易员启用了"使用币种池"或"使用OI Top"，但尚未配置信号源API地址。这将导致候选币种数量为0，交易员无法正常工作。',
    configureSignalSourceNow: '立即配置信号源',

    // FAQ Page
    faqTitle: '常见问题',
    faqSubtitle: '查找关于 NOFX 的常见问题解答',
    faqStillHaveQuestions: '还有其他问题？',
    faqContactUs: '加入我们的社区或查看 GitHub 获取更多帮助',

    // FAQ Categories
    faqCategoryBasics: '基础问题',
    faqCategoryContributing: '贡献与任务',
    faqCategorySetup: '安装与配置',
    faqCategoryTrading: '交易问题',
    faqCategoryTechnical: '技术问题',
    faqCategoryAI: 'AI与模型问题',
    faqCategoryData: '数据与隐私',
    faqCategoryStrategies: '交易策略',

    // FAQ Questions & Answers - General
    faqWhatIsNOFX: 'NOFX 是什么？',
    faqWhatIsNOFXAnswer:
      'NOFX 是一个 AI 驱动的加密货币交易机器人，使用大语言模型（LLM）在期货市场进行交易决策。',

    faqSupportedExchanges: '支持哪些交易所？',
    faqSupportedExchangesAnswer:
      '支持币安合约（Binance Futures）、Hyperliquid 和 Aster DEX。更多交易所开发中。',

    faqIsProfitable: 'NOFX 能盈利吗？',
    faqIsProfitableAnswer:
      'AI 交易是实验性的，不保证盈利。请始终用小额资金测试，不要投入超过您承受能力的资金。',

    faqMultipleTraders: '可以同时运行多个交易员吗？',
    faqMultipleTradersAnswer:
      '可以！NOFX 支持运行多个交易员，每个可配置不同的 AI 模型和交易策略。',

    // Contributing & Community
    faqGithubProjectsTasks: '如何在 GitHub Projects 中领取任务？',
    faqGithubProjectsTasksAnswer:
      '路线图：https://github.com/orgs/NoFxAiOS/projects/3 ｜ 任务看板：https://github.com/orgs/NoFxAiOS/projects/5 ｜ 步骤：打开链接 → 按标签筛选（good first issue / help wanted / frontend / backend）→ 阅读描述与验收标准 → 评论“assign me”或自助分配 → Fork 仓库 → 同步你 fork 的 dev 与 upstream/dev → 从你 fork 的 dev 创建特性分支 → 推送到你的 fork → 打开 PR（base：NoFxAiOS/nofx:dev ← compare：你的用户名/nofx:feat/your-topic）→ 关联 Issue（Closes #123）并选择正确模板。',

    faqContributePR: '如何规范地提交 PR 并参与贡献？',
    faqContributePRAnswer:
      '规范：• 先 Fork；在你的 fork 的 dev 分支上创建特性分支（避免直接向上游 main 提交）• 分支命名：feat/...、fix/...、docs/...；提交信息遵循 Conventional Commits • PR 前运行检查：npm --prefix web run lint && npm --prefix web run build • 涉及 UI 变更请附截图/短视频 • 选择正确 PR 模板（frontend/backend/docs/general）• 从你的 fork 发起到 NoFxAiOS/nofx:dev，并在 PR 中关联 Issue（Closes #123）• 持续 rebase 到 upstream/dev，确保 CI 通过；尽量保持 PR 小而聚焦 • 参考 CONTRIBUTING.md 与 .github/PR_TITLE_GUIDE.md',

    // Setup & Configuration
    faqSystemRequirements: '系统要求是什么？',
    faqSystemRequirementsAnswer:
      '操作系统：Linux、macOS 或 Windows（推荐 Docker）；内存：最低 2GB，推荐 4GB；硬盘：应用 + 日志需要 1GB；网络：稳定的互联网连接。',

    faqNeedCoding: '需要编程经验吗？',
    faqNeedCodingAnswer:
      '不需要！NOFX 有 Web 界面进行所有配置。但基础的命令行知识有助于安装和故障排查。',

    faqGetApiKeys: '如何获取 API 密钥？',
    faqGetApiKeysAnswer:
      '币安：账户 → API 管理 → 创建 API → 启用合约。Hyperliquid：访问 Hyperliquid App → API 设置。Aster DEX：配置主钱包地址（User）、API 钱包地址（Signer）和私钥（Private Key）。',

    faqUseSubaccount: '应该使用子账户吗？',
    faqUseSubaccountAnswer:
      '推荐：是的，使用专门的子账户运行 NOFX 可以更好地隔离风险。但请注意，某些子账户有限制（例如币安子账户最高 5 倍杠杆）。',

    faqDockerDeployment: 'Docker 部署一直失败',
    faqDockerDeploymentAnswer:
      '常见问题：网络连接问题、依赖安装失败、内存不足（需要至少 2C2G）。如果卡在 "go build" 不动，尝试：docker compose down && docker compose build --no-cache && docker compose up -d',

    faqBalanceZero: '账户余额显示为 0',
    faqBalanceZeroAnswer:
      '资金可能在现货账户而非合约账户，或被理财功能锁定。您需要在币安手动将资金划转到合约账户。',

    faqTestnet: '可以使用测试网测试吗？',
    faqTestnetAnswer:
      '暂时不支持测试网。我们建议使用真实交易但小额资金（10-50 USDT）进行测试。',

    // Trading Questions
    faqNoTrades: '为什么我的交易员不开仓？',
    faqNoTradesAnswer:
      '常见原因：AI 根据市场情况决定"等待"；余额或保证金不足；达到持仓上限（默认最多 3 个仓位）；查看故障排查指南了解详细诊断。',

    faqDecisionFrequency: 'AI 多久做一次决策？',
    faqDecisionFrequencyAnswer:
      '可配置！默认是每 3-5 分钟。太频繁 = 过度交易，太慢 = 错过机会。',

    faqCustomStrategy: '可以自定义交易策略吗？',
    faqCustomStrategyAnswer:
      '可以！您可以调整杠杆设置、修改币种选择池、更改决策间隔、自定义系统提示词（高级）。',

    faqMaxPositions: '最多可以同时持有多少个仓位？',
    faqMaxPositionsAnswer:
      '默认：3 个仓位。这是 AI 提示词中的软限制，不是硬编码。',

    faqMarginInsufficient: '保证金不足错误 (code=-2019)',
    faqMarginInsufficientAnswer:
      '常见原因：资金未划转到合约账户；杠杆倍数设置过高（默认 20-50 倍）；已有持仓占用保证金；需要先从现货账户划转 USDT 到合约账户。',

    faqHighFees: '交易手续费太高',
    faqHighFeesAnswer:
      'NOFX 默认 3 分钟扫描间隔会导致频繁交易。解决方案：将决策间隔增加到 5-10 分钟；优化系统提示词减少过度交易；调整杠杆降低仓位大小。',

    faqNoTakeProfit: 'AI 不平掉盈利的仓位',
    faqNoTakeProfitAnswer:
      'AI 可能认为趋势会继续。系统目前缺少移动止盈功能。您可以手动平仓或调整系统提示词使其在获利时更保守。',

    // Technical Issues
    faqBinanceApiFailed: '币安 API 调用失败 (code=-2015)',
    faqBinanceApiFailedAnswer:
      '错误："Invalid API-key, IP, or permissions for action"。解决方案：将服务器 IP 添加到币安 API 白名单；检查 API 权限（需要读取 + 合约交易）；确保使用合约 API 而非统一账户 API；VPN IP 可能不稳定。',

    faqBinancePositionMode: '币安持仓模式错误 (code=-4061)',
    faqBinancePositionModeAnswer:
      '错误信息："Order\'s position side does not match user\'s setting"。解决方法：切换为双向持仓模式。登录币安合约 → 点击右上角偏好设置 → 选择持仓模式 → 双向持仓。注意：先平掉所有持仓。',

    faqPortInUse: '后端无法启动 / 端口被占用',
    faqPortInUseAnswer:
      '使用 "lsof -i :8080" 查看占用端口的进程，在 .env 中修改端口：NOFX_BACKEND_PORT=8081。',

    faqFrontendLoading: '前端一直显示"加载中..."',
    faqFrontendLoadingAnswer:
      '使用 "curl http://localhost:8080/api/health" 检查后端是否运行。应该返回 {"status":"ok"}。如果不是，查看故障排查指南。',

    faqDatabaseLocked: '数据库锁定错误',
    faqDatabaseLockedAnswer:
      '使用 "docker compose down" 或 "pkill nofx" 停止所有 NOFX 进程，然后使用 "docker compose up -d" 重启。',

    faqAiLearningFailed: 'AI 学习数据加载失败',
    faqAiLearningFailedAnswer:
      '原因：TA-Lib 库未正确安装；历史数据不足（需要完成交易）；环境配置问题。安装 TA-Lib：pip install TA-Lib 或检查系统依赖。',

    faqConfigNotEffective: '配置文件修改不生效',
    faqConfigNotEffectiveAnswer:
      'Docker 需要重新构建："docker compose down && docker compose up -d --build"。PM2 需要重启："pm2 restart all"。检查配置文件格式和路径是否正确。',

    // AI & Model Questions
    faqWhichModels: '支持哪些 AI 模型？',
    faqWhichModelsAnswer:
      'DeepSeek（推荐性价比）、Qwen（阿里云通义千问）、自定义 OpenAI 兼容 API（可用于 OpenAI、通过代理的 Claude 或其他提供商）。',

    faqApiCosts: 'API 调用成本是多少？',
    faqApiCostsAnswer:
      '取决于您的模型和决策频率：DeepSeek：每天约 $0.10-0.50（1 个交易员，5 分钟间隔）；Qwen：每天约 $0.20-0.80；自定义 API（例如 OpenAI GPT-4）：每天约 $2-5。基于典型使用的估算。',

    faqMultipleModels: '可以使用多个 AI 模型吗？',
    faqMultipleModelsAnswer:
      '可以！每个交易员可以使用不同的 AI 模型。您甚至可以 A/B 测试不同模型。',

    faqAiLearning: 'AI 会从错误中学习吗？',
    faqAiLearningAnswer:
      '会的，在一定程度上。NOFX 在每次决策提示中提供历史表现反馈，允许 AI 调整策略。',

    faqOnlyShort: 'AI 只开空单，不开多单',
    faqOnlyShortAnswer:
      '默认系统提示词包含"不要有做多偏见！做空是你的核心工具之一"，可能导致此问题。还受 4 小时周期数据和模型训练偏向性影响。您可以修改系统提示词使其更平衡。',

    faqModelSelection: '应该使用哪个 DeepSeek 版本？',
    faqModelSelectionAnswer:
      '推荐使用 DeepSeek V3 以获得最佳性能。备选：DeepSeek R1（推理模型，较慢但逻辑更好）、SiliconFlow 的 DeepSeek（备用 API 提供商）。大多数用户反馈 V3 效果良好。',

    // Data & Privacy
    faqDataStorage: '我的数据存储在哪里？',
    faqDataStorageAnswer:
      '所有数据都本地存储在您的机器上，使用 SQLite 数据库：config.db（交易员配置）、trading.db（交易历史）、decision_logs/（AI 决策记录）。',

    faqApiKeySecurity: 'API 密钥安全吗？',
    faqApiKeySecurityAnswer:
      'API 密钥存储在本地数据库中。永远不要分享您的数据库或 .env 文件。我们建议使用带 IP 白名单限制的 API 密钥。',

    faqExportHistory: '可以导出交易历史吗？',
    faqExportHistoryAnswer:
      '可以！交易数据是 SQLite 格式。您可以直接查询：sqlite3 trading.db "SELECT * FROM trades;"',

    faqGetHelp: '在哪里可以获得帮助？',
    faqGetHelpAnswer:
      '查看 GitHub Discussions、加入 Telegram 社区或在 GitHub 上提出 issue。',

    // Trading Strategies
    faqHowToChooseStrategy: '如何选择交易策略？',
    faqHowToChooseStrategyAnswer:
      'NOFX 提供 7 种策略：default（平衡型）、adaptive（最高安全性，信心度≥85）、adaptive_relaxed（更多交易，信心度≥80）、risk_first（资本保全优先）、nof1（保守质量型）、Hansen（英文/Hyperliquid）、taro_long（高级自主型）。根据风险承受能力选择：最高安全性 → adaptive；平衡安全性与活跃度 → adaptive_relaxed；资本保全 → risk_first；高级用户 → taro_long；简单/初学者 → default 或 nof1。',

    faqStrategyDifferences: '策略之间有什么区别？',
    faqStrategyDifferencesAnswer:
      '策略在以下方面不同：1) 信心度阈值（adaptive：≥85，adaptive_relaxed：≥80，其他：≥75-80）；2) 交易频率（adaptive：极低，adaptive_relaxed：8-15 笔/天，其他：2-4 笔/天）；3) 风险水平（adaptive/risk_first：极低，taro_long：中高）；4) 特性（adaptive：BTC 状态检查、8 项清单、防假突破；risk_first：波动性适应、TP 阶梯；taro_long：完全 AI 自主）。所有策略都优先考虑资本保全和质量而非数量。',

    faqSafestStrategy: '哪种策略最安全？',
    faqSafestStrategyAnswer:
      'adaptive 策略最安全，具有：最高信心度阈值（≥85）、最严格的验证（5/8 清单项、BTC 状态检查）、防假突破检测、连续亏损保护（2 次亏损 = 45 分钟暂停，3 次 = 24 小时）、客观信心度评分。risk_first 策略也非常安全，优先考虑资本保全，具有波动性适应仓位大小和系统性退出策略。',

    faqMostFrequentStrategy: '哪种策略交易最频繁？',
    faqMostFrequentStrategyAnswer:
      'adaptive_relaxed 策略交易最频繁（预期 8-15 笔/天），同时保持核心风险控制。它具有放宽的阈值：信心度≥80（vs 85）、冷却期 6 分钟（vs 9 分钟）、2 个时间框架（vs 3 个）、4/8 清单（vs 5/8）、更短的亏损暂停。taro_long 策略也可以频繁交易，但频率根据 AI 自主决策而变化。',

    faqSwitchStrategies: '我可以为现有交易员切换策略吗？',
    faqSwitchStrategiesAnswer:
      '可以！您可以在交易员配置中更改系统提示词模板。进入交易员设置，从下拉菜单中选择不同的"系统提示词模板"（default、adaptive、adaptive_relaxed、risk_first、nof1、Hansen 或 taro_long）。更改在交易员重启或下一个决策周期生效。注意：更改策略不会影响现有持仓，但新决策将遵循新策略规则。',

    faqStrategyRiskPriority: '策略如何平衡风险与利润？',
    faqStrategyRiskPriorityAnswer:
      '所有策略都优先考虑资本保全，但侧重点不同：adaptive/risk_first/nof1 → 资本保全 > 利润（非常保守）；adaptive_relaxed → 平衡（更多交易但仍安全）；default/Hansen → 平衡（标准风险管理）；taro_long → AI 自主决定（自主风险评估）。risk_first 策略明确声明"资本保全 > 利润"并使用波动性适应大小。adaptive 策略使用"疑惑优先原则"——不确定时，总是选择等待。',

    faqStrategyComparison: '可以用表格对比所有策略吗？',
    faqStrategyComparisonAnswer:
      '快速对比：| 策略 | 信心度 | 频率 | 风险 | 适合 | |----------|------------|-----------|------|----------| | adaptive | ≥85 | 极低 | 极低 | 最高保护 | | adaptive_relaxed | ≥80 | 8-15 笔/天 | 低 | 更多活跃度，仍安全 | | risk_first | ≥75 | 2-4 笔/天 | 极低 | 资本保全 | | nof1 | ≥80-85 | 2-4 笔/天 | 低 | 保守质量 | | default | ≥75 | 2-4 笔/天 | 中 | 初学者 | | Hansen | 可变 | 2-4 笔/天 | 中 | 英文/Hyperliquid | | taro_long | AI 决定 | 可变 | 中高 | 高级自主 |',

    faqStrategyCustomization: '我可以自定义或修改策略吗？',
    faqStrategyCustomizationAnswer:
      '可以！您可以通过两种方式自定义策略：1) 自定义提示词：添加您自己的交易规则，补充或覆盖基础提示词。进入交易员设置 → "自定义提示词"字段。您可以选择完全覆盖基础提示词或补充它。2) 系统提示词模板：从 7 个预构建模板中选择。对于高级用户，您可以编辑 prompts/ 目录中的提示词文件（default.txt、adaptive.txt 等）以创建自己的自定义策略模板。',

    // Trading Strategies Page
    strategiesTitle: '交易策略',
    strategiesSubtitle: '了解所有可用的交易策略，选择适合您风险承受能力的策略',
    strategiesIntroductionTitle: '介绍',
    strategiesIntroduction:
      'NOFX 提供 7 种不同的交易策略，每种策略针对不同的风险状况和交易风格设计。所有策略都优先考虑资本保全和质量而非数量，但它们在信心度阈值、交易频率和风险管理方法上有所不同。',
    strategiesComparisonTitle: '策略对比',
    strategiesComparisonIntro: '以下是所有可用策略的快速对比：',
    strategiesComparisonTable:
      '策略              | 信心度      | 频率          | 风险水平      | 适合\n' +
      '------------------|------------|---------------|---------------|-------------------\n' +
      'adaptive          | ≥85        | 极低          | 极低          | 最高保护\n' +
      'adaptive_relaxed  | ≥80        | 8-15 笔/天    | 低            | 更多活跃度，仍安全\n' +
      'risk_first        | ≥75        | 2-4 笔/天     | 极低          | 资本保全\n' +
      'nof1              | ≥80-85     | 2-4 笔/天     | 低            | 保守质量\n' +
      'default           | ≥75        | 2-4 笔/天     | 中            | 初学者\n' +
      'Hansen            | 可变       | 2-4 笔/天     | 中            | 英文/Hyperliquid\n' +
      'taro_long         | AI 决定    | 可变          | 中高          | 高级自主',
    strategiesDetailsTitle: '策略详情',
    strategyDefaultTitle: '默认策略',
    strategyDefaultDescription:
      '适合初学者的平衡策略。使用信心度阈值≥75，每天交易 2-4 次，风险水平中等。这是标准策略，在安全性和交易活跃度之间提供良好平衡。',
    strategyAdaptiveTitle: '自适应策略',
    strategyAdaptiveDescription:
      '最安全的策略，提供最高保护。使用最高信心度阈值（≥85），交易频率极低，最严格的验证包括 BTC 状态检查、8 项清单（需要 5/8）、防假突破检测和连续亏损保护（2 次亏损 = 45 分钟暂停，3 次 = 24 小时）。最适合优先考虑资本保全的用户。',
    strategyAdaptiveRelaxedTitle: '自适应宽松策略',
    strategyAdaptiveRelaxedDescription:
      '自适应策略的更活跃版本，同时保持核心风险控制。使用信心度阈值≥80（vs 85）、冷却期 6 分钟（vs 9 分钟）、2 个时间框架（vs 3 个）、4/8 清单（vs 5/8）和更短的亏损暂停。预期每天交易 8-15 次。最适合想要更多交易活跃度但仍优先考虑安全性的用户。',
    strategyRiskFirstTitle: '风险优先策略',
    strategyRiskFirstDescription:
      '优先考虑资本保全，明确"资本保全 > 利润"原则。使用信心度阈值≥75，每天交易 2-4 次，风险水平极低。具有波动性适应仓位大小和系统性退出策略。最适合想要最大资本保护的用户。',
    strategyNof1Title: 'NOF1 策略',
    strategyNof1Description:
      '保守的质量导向策略。使用信心度阈值≥80-85，每天交易 2-4 次，风险水平低。强调质量而非数量。最适合偏好保守、高质量交易的用户。',
    strategyHansenTitle: 'Hansen 策略',
    strategyHansenDescription:
      '专为英语用户和 Hyperliquid 交易所设计。使用可变信心度阈值，每天交易 2-4 次，风险水平中等。针对特定交易所特性和英语提示词优化。',
    strategyTaroLongTitle: 'Taro Long 策略',
    strategyTaroLongDescription:
      '具有完全 AI 决策的高级自主策略。使用 AI 决定的信心度阈值，可变交易频率，风险水平中高。为 AI 提供最大自主权进行风险评估和交易决策。最适合想要完全 AI 自主的高级用户。',
    strategiesHowToChooseTitle: '如何选择策略',
    strategiesHowToChoose:
      '根据您的风险承受能力选择：最高安全性 → adaptive；平衡安全性与活跃度 → adaptive_relaxed；资本保全 → risk_first；高级用户 → taro_long；简单/初学者 → default 或 nof1。您可以随时在交易员配置设置中切换策略。',
    strategiesCustomizationTitle: '自定义策略',
    strategiesCustomization:
      '您可以通过两种方式自定义策略：1) 自定义提示词：添加您自己的交易规则，补充或覆盖基础提示词。进入交易员设置 → "自定义提示词"字段。您可以选择完全覆盖基础提示词或补充它。2) 系统提示词模板：从 7 个预构建模板中选择。对于高级用户，您可以编辑 prompts/ 目录中的提示词文件（default.txt、adaptive.txt 等）以创建自己的自定义策略模板。',
    strategiesStillHaveQuestions: '还有其他问题？',
    strategiesContactUs: '加入我们的社区或查看 GitHub 获取更多帮助和详细文档。',

    // Error Messages (API)
    errorGetTradersFailed: '获取trader列表失败',
    errorGetPublicTradersFailed: '获取公开trader列表失败',
    errorCreateTraderFailed: '创建交易员失败',
    errorDeleteTraderFailed: '删除交易员失败',
    errorStartTraderFailed: '启动交易员失败',
    errorStopTraderFailed: '停止交易员失败',
    errorUpdateTraderPromptFailed: '更新自定义策略失败',
    errorGetTraderConfigFailed: '获取交易员配置失败',
    errorUpdateTraderFailed: '更新交易员失败',
    errorGetModelConfigsFailed: '获取模型配置失败',
    errorGetSupportedModelsFailed: '获取支持的模型失败',
    errorUpdateModelConfigsFailed: '更新模型配置失败',
    errorGetExchangeConfigsFailed: '获取交易所配置失败',
    errorGetSupportedExchangesFailed: '获取支持的交易所失败',
    errorUpdateExchangeConfigsFailed: '更新交易所配置失败',
    errorGetStatusFailed: '获取系统状态失败',
    errorGetAccountFailed: '获取账户信息失败',
    errorGetPositionsFailed: '获取持仓列表失败',
    errorGetDecisionsFailed: '获取决策日志失败',
    errorGetLatestDecisionsFailed: '获取最新决策失败',
    errorGetStatisticsFailed: '获取统计信息失败',
    errorGetEquityHistoryFailed: '获取历史数据失败',
    errorGetEquityHistoryBatchFailed: '获取批量历史数据失败',
    errorGetTopTradersFailed: '获取前5名交易员失败',
    errorGetPublicTraderConfigFailed: '获取公开交易员配置失败',
    errorGetPerformanceFailed: '获取AI学习数据失败',
    errorGetCompetitionFailed: '获取竞赛数据失败',
    errorGetUserSignalSourceFailed: '获取用户信号源配置失败',
    errorSaveUserSignalSourceFailed: '保存用户信号源配置失败',
    errorGetServerIPFailed: '获取服务器IP失败',

    // Solution List Items
    signalSourceSolution1: '点击"📡 {signalSource}"按钮配置API地址',
    signalSourceSolution2: '或在交易员配置中禁用"使用币种池"和"使用OI Top"',
    signalSourceSolution3: '或在交易员配置中设置自定义币种列表',

    // Auth Error Messages
    errorLoginFailed: '登录失败',
    errorLoginFailedRetry: '登录失败，请重试',
    errorUnknownError: '未知错误',
    errorRegisterFailed: '注册失败',
    errorRegisterFailedRetry: '注册失败，请重试',
    errorVerifyOTPFailed: 'OTP验证失败，请重试',
    errorCompleteRegistrationFailed: '注册完成失败，请重试',
    errorResetPasswordFailed: '密码重置失败，请重试',

    // Language Labels
    languageChinese: '中文',
    languageEnglish: 'English',

    // AI Learning Strategy Feedback Messages
    sharpeRatioExcellent:
      '✨ AI策略非常有效！风险调整后收益优异，可适度扩大仓位但保持纪律。',
    sharpeRatioGood: '✅ 策略表现稳健，风险收益平衡良好，继续保持当前策略。',
    sharpeRatioFair: '⚠️ 收益为正但波动较大，AI正在优化策略，降低风险。',
    sharpeRatioPoor:
      '🚨 当前策略需要调整！AI已自动进入保守模式，减少仓位和交易频率。',
    profitFactorExcellent:
      '🔥 盈利能力出色！每亏1元能赚{factor}元，AI策略表现优异。',
    profitFactorGood: '✓ 策略稳定盈利，盈亏比健康，继续保持纪律性交易。',
    profitFactorFair: '⚠️ 策略略有盈利但需优化，AI正在调整仓位和止损策略。',
    profitFactorPoor: '❌ 平均亏损大于盈利，需要调整策略或降低交易频率。',

    // Sharpe Ratio Labels
    sharpeRatio: '夏普比率',
    sharpeRatioSubtitle: '风险调整后收益 · AI自我进化指标',
    sharpeRatioStatusExcellent: '🟢 卓越表现',
    sharpeRatioStatusGood: '🟢 良好表现',
    sharpeRatioStatusVolatile: '🟡 波动较大',
    sharpeRatioStatusNeedsAdjustment: '🔴 需要调整',

    // Trader Config Modal
    traderConfig: '交易员配置',
    traderConfigInfo: '{name} 的配置信息',
    copied: '✓ 已复制',
    copyButton: '📋 复制',
    yes: '是',
    no: '否',
    basicInfo: '🤖 基础信息',
    traderId: '交易员ID',
    aiModel: 'AI模型',
    aiModelLabel: 'AI模型',
    exchange: '交易所',
    exchangeLabel: '交易所',
    basicConfig: '🤖 基础配置',
    tradingConfig: '⚖️ 交易配置',
    marginMode: '保证金模式',
    crossMargin: '全仓',
    isolatedMargin: '逐仓',
    initialBalanceLabel: '初始余额 ($)',
    btcEthLeverageLabel: 'BTC/ETH 杠杆',
    altcoinLeverageLabel: '山寨币杠杆',
    tradingSymbolsLabel: '交易币种',
    tradingSymbolsPlaceholderWithHint: '交易币种 (用逗号分隔，留空使用默认)',
    tradingSymbolsExample: '例如: BTCUSDT,ETHUSDT,ADAUSDT',
    clickToSelectCoins: '点击选择币种：',
    useDefaultSymbols: '使用默认币种',
    coinPoolSignal: 'Coin Pool 信号',
    useCoinPoolSignalLabel: '使用 Coin Pool 信号',
    oiTopSignal: 'OI Top 信号',
    useOiTopSignalLabel: '使用 OI Top 信号',
    tradingStrategyPrompt: '💬 交易策略提示词',
    systemPromptTemplate: '系统提示词模板',
    systemPromptTemplateHelper:
      '选择预设的交易策略模板（包含交易哲学、风控原则等）',
    templateDefault: 'Default (默认稳健)',
    templateAggressive: 'Aggressive (激进)',
    overrideDefaultPrompt: '覆盖默认提示词',
    overrideDefaultPromptWarning: '启用后将完全替换默认策略',
    customPrompt: '自定义提示词',
    additionalPrompt: '附加提示词',
    noCustomPromptSet: '未设置自定义提示词，使用系统默认策略',
    close: '关闭',
    copiedConfig: '✓ 已复制配置',
    copyFullConfig: '📋 复制完整配置',

    // Registration Form
    betaCodeRequired: '内测期间，注册需要提供内测码',
    betaCodeLabel: '内测码 *',
    betaCodePlaceholder: '请输入6位内测码',
    betaCodeDescription: '内测码由6位字母数字组成，区分大小写',

    // Login Page
    loginSubtitleLogin: '请输入您的邮箱和密码',
    loginSubtitleOTP: '请输入两步验证码',
    adminPasswordLabel: '管理员密码',
    adminPasswordPlaceholder: '请输入管理员密码',

    // Trader Config Modal
    balanceFetchEditOnly: '只有在编辑模式下才能获取当前余额',
    balanceFetchFailed: '获取账户余额失败',
    balanceFetchErrorNetwork: '获取余额失败，请检查网络连接',
    editTraderTitle: '修改交易员',
    createTraderTitle: '创建交易员',
    editTraderSubtitle: '修改交易员配置参数',
    createTraderSubtitle: '配置新的AI交易员',
    traderNameLabel: '交易员名称',
    traderNamePlaceholder: '请输入交易员名称',
    fetchingBalance: '获取中...',
    fetchCurrentBalance: '获取当前余额',
    balanceFetchInstruction:
      '点击"获取当前余额"按钮可自动获取您交易所账户的当前净值',
    initialBalanceWarning:
      '请输入您交易所账户的当前实际余额。如果输入不准确，P&L统计将会错误。',
    collapseSelection: '收起选择',
    quickSelection: '快速选择',
    customPromptLabel: '自定义提示词',
    additionalPromptLabel: '附加提示词',
    customPromptPlaceholder: '输入完整的交易策略提示词...',
    additionalPromptPlaceholder: '输入额外的交易策略提示...',
    cancelButton: '取消',
    saving: '保存中...',
    saveChanges: '保存修改',
    createTraderButton: '创建交易员',

    // Model Configuration
    modelNameOptional: 'Model Name (可选)',
    modelNamePlaceholder: '例如: deepseek-chat, qwen3-max, gpt-5',
    modelNameHelper: '留空使用默认模型名称',

    // Binance Configuration Guide
    binanceUserRequired: '币安用户必读：',
    binanceApiType: '使用「现货与合约交易」API，不要用「统一账户 API」',
    binanceReason: '原因：统一账户 API 权限结构不同，会导致订单提交失败',
    binanceConfigSteps: '正确配置步骤：',
    binanceStep1: '登录币安 → 个人中心 → API 管理',
    binanceStep2: '创建 API → 选择「系统生成的 API 密钥」',
    binanceStep3: '勾选「现货与合约交易」（不选统一账户）',
    binanceStep4: 'IP 限制选「无限制」或添加服务器 IP',
    binanceMultiAssetWarning:
      '💡 多资产模式用户注意：如果您开启了多资产模式，将强制使用全仓模式。建议关闭多资产模式以支持逐仓交易。',
    binanceOfficialTutorial: '📖 查看币安官方教程 ↗',

    // Duration Formatting
    hours: '小时',
    minutes: '分',
    seconds: '秒',

    // FAQ Components
    faqSearchPlaceholder: '搜索常见问题...',
    faqNoMatches: '没有找到匹配的问题',
    faqClearSearch: '清除搜索',
    faqLinksLabel: '链接：',
    faqRoadmap: '路线图',
    faqTaskDashboard: '任务看板',
    faqReferencesLabel: '参考文档：',

    // Recommendations
    'recommendations.title': '币种推荐',
    'recommendations.autoRefresh': '自动刷新',
    'recommendations.nextUpdate': '下次更新',
    'recommendations.refreshNow': '立即刷新',
    'recommendations.majorCoins': '主流币种 (BTC/ETH)',
    'recommendations.altcoins': '山寨币',
    'recommendations.performance': '历史表现',
    'common.loading': '加载中...',
  },
}

export function t(
  key: string,
  lang: Language,
  params?: Record<string, string | number>
): string {
  let text = (translations[lang] as Record<string, string>)[key] || key

  // Replace parameters like {count}, {gap}, etc.
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, String(value))
    })
  }

  return text
}

// Helper function to translate error messages
// If the error message is a translation key (starts with 'error'), translate it
// Otherwise return the message as-is
export function translateError(
  errorMessage: string | undefined | null,
  language: Language
): string {
  if (!errorMessage) return ''

  // If it's a translation key (starts with 'error'), translate it
  if (errorMessage.startsWith('error')) {
    return t(errorMessage, language)
  }

  // Otherwise return as-is (might be a server error message or already translated)
  return errorMessage
}
