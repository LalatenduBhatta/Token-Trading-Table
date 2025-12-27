export const TOKEN_CATEGORIES = {
  NEW: 'new',
  FINAL_STRETCH: 'final-stretch',
  MIGRATED: 'migrated',
} as const;

export const CHAINS = {
  ETHEREUM: 'ethereum',
  SOLANA: 'solana',
  BASE: 'base',
  ARBITRUM: 'arbitrum',
  POLYGON: 'polygon',
  BSC: 'bsc',
  AVAX: 'avalanche',
  OPTIMISM: 'optimism',
} as const;

export const TRADING_PAIRS = [
  'ETH/USDT',
  'BTC/USDT',
  'SOL/USDT',
  'BNB/USDT',
  'ADA/USDT',
  'XRP/USDT',
  'DOT/USDT',
  'DOGE/USDT',
  'AVAX/USDT',
  'MATIC/USDT',
] as const;

export const CHART_INTERVALS = {
  '1m': '1 minute',
  '5m': '5 minutes',
  '15m': '15 minutes',
  '1h': '1 hour',
  '4h': '4 hours',
  '1d': '1 day',
  '1w': '1 week',
  '1M': '1 month',
} as const;

export const ORDER_TYPES = {
  MARKET: 'market',
  LIMIT: 'limit',
  STOP: 'stop',
  STOP_LIMIT: 'stop_limit',
} as const;

export const ORDER_SIDES = {
  BUY: 'buy',
  SELL: 'sell',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  FILLED: 'filled',
  PARTIALLY_FILLED: 'partially_filled',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
} as const;

export const TRADING_FEES = {
  MAKER: 0.001, // 0.1%
  TAKER: 0.002, // 0.2%
} as const;

export const DEFAULT_SLIPPAGE = 0.5; // 0.5%
export const MAX_SLIPPAGE = 5; // 5%
export const MIN_SLIPPAGE = 0.1; // 0.1%

export const LEVERAGE_OPTIONS = [1, 2, 3, 5, 10, 20, 50, 100] as const;

export const RISK_LEVELS = {
  LOW: { color: 'green', maxLeverage: 5 },
  MEDIUM: { color: 'yellow', maxLeverage: 10 },
  HIGH: { color: 'red', maxLeverage: 20 },
  EXTREME: { color: 'purple', maxLeverage: 100 },
} as const;

export const API_ENDPOINTS = {
  TOKENS: '/api/tokens',
  TOKEN_DETAILS: '/api/tokens/:id',
  MARKET_STATS: '/api/market/stats',
  ORDERS: '/api/orders',
  PORTFOLIO: '/api/portfolio',
  CHAINS: '/api/chains',
  SEARCH: '/api/tokens/search',
  WS: process.env.NEXT_PUBLIC_WS_URL || 'wss://api.axiom.trade/ws',
} as const;

export const LOCAL_STORAGE_KEYS = {
  THEME: 'axiom-theme',
  WATCHLIST: 'axiom-watchlist',
  PREFERENCES: 'axiom-preferences',
  RECENT_TRADES: 'axiom-recent-trades',
  PORTFOLIO: 'axiom-portfolio',
} as const;

export const BREAKPOINTS = {
  XS: 320,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const WEBSOCKET_RECONNECT_DELAYS = [1000, 2000, 5000, 10000, 30000] as const;