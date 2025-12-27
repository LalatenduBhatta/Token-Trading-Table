/**
 * Format currency values
 */
export function formatCurrency(value: number, currency = 'USD'): string {
  if (value === 0 || value === null || value === undefined) return '$0.00';
  
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  }
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
}

/**
 * Format percentage values
 */
export function formatPercentage(value: number): string {
  if (value === 0 || value === null || value === undefined) return '0.00%';
  
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Format large numbers with abbreviations
 */
export function formatNumber(value: number): string {
  if (value === 0 || value === null || value === undefined) return '0';
  
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

/**
 * Format date relative to now
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;
  
  if (diff < minute) {
    return 'just now';
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes}m ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours}h ago`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days}d ago`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `${weeks}w ago`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months}mo ago`;
  } else {
    const years = Math.floor(diff / year);
    return `${years}y ago`;
  }
}

/**
 * Format token age
 */
export function formatTokenAge(ageInHours: number): string {
  const days = Math.floor(ageInHours / 24);
  const hours = Math.floor(ageInHours % 24);
  
  if (days > 0 && hours > 0) {
    return `${days}d ${hours}h`;
  } else if (days > 0) {
    return `${days}d`;
  } else {
    return `${hours}h`;
  }
}

/**
 * Format wallet address
 */
export function formatAddress(address: string, start = 6, end = 4): string {
  if (!address || address.length < start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Calculate profit/loss
 */
export function calculatePnl(entryPrice: number, currentPrice: number, amount: number): {
  pnl: number;
  pnlPercentage: number;
} {
  const pnl = (currentPrice - entryPrice) * amount;
  const pnlPercentage = entryPrice > 0 ? (pnl / (entryPrice * amount)) * 100 : 0;
  
  return { pnl, pnlPercentage };
}

/**
 * Calculate liquidation price
 */
export function calculateLiquidationPrice(
  entryPrice: number,
  leverage: number,
  side: 'long' | 'short'
): number {
  const margin = entryPrice / leverage;
  const liquidationDistance = margin * 0.9; // 90% margin utilization
  
  return side === 'long' 
    ? entryPrice - liquidationDistance
    : entryPrice + liquidationDistance;
}

/**
 * Format order size with precision
 */
export function formatOrderSize(amount: number, precision = 4): string {
  return amount.toFixed(precision);
}

/**
 * Calculate trade value
 */
export function calculateTradeValue(price: number, amount: number): number {
  return price * amount;
}

/**
 * Calculate fees
 */
export function calculateFees(tradeValue: number, feeRate = 0.003): number {
  return tradeValue * feeRate;
}