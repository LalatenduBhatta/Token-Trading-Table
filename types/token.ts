export interface Token {
  id: string;
  pair: string;
  name: string;
  icons: string[];
  price: number;
  previousPrice?: number;
  priceChange: number;
  change24h: number;
  volume24h: number;
  trades24h: number;
  liquidity: number;
  liquidityScore: number;
  age: string;
  tags: string[];
  category: 'new' | 'final-stretch' | 'migrated';
  chain: string;
  isNew: boolean;
  isWatched: boolean;
  chartData: ChartPoint[];
}

export interface TokenUpdate {
  tokenId: string;
  price: number;
  change24h: number;
  volume24h: number;
  timestamp: number;
}

export interface ChartPoint {
  time: number;
  value: number;
}

export interface TokenStats {
  totalTokens: number;
  totalVolume: number;
  activeTraders: number;
  marketCap: number;
}