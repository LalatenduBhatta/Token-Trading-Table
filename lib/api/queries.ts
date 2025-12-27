import axios from 'axios';
import { Token } from '@/types/token';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchTokens = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  chain?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): Promise<{ tokens: Token[]; total: number; page: number; totalPages: number }> => {
  try {
    const response = await apiClient.get('/tokens', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    throw error;
  }
};

export const fetchTokenDetails = async (tokenId: string): Promise<Token> => {
  try {
    const response = await apiClient.get(`/tokens/${tokenId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching token details:', error);
    throw error;
  }
};

export const fetchTokenHistory = async (
  tokenId: string,
  interval: '1h' | '4h' | '1d' | '1w' | '1m' = '1d'
): Promise<Array<{ time: number; price: number; volume: number }>> => {
  try {
    const response = await apiClient.get(`/tokens/${tokenId}/history`, {
      params: { interval },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token history:', error);
    throw error;
  }
};

export const fetchMarketStats = async (): Promise<{
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  fearGreedIndex: number;
  topGainers: Token[];
  topLosers: Token[];
}> => {
  try {
    const response = await apiClient.get('/market/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching market stats:', error);
    throw error;
  }
};

export const placeOrder = async (order: {
  tokenId: string;
  side: 'buy' | 'sell';
  amount: number;
  price?: number;
  type: 'market' | 'limit' | 'stop';
  slippage?: number;
}): Promise<{ orderId: string; status: string }> => {
  try {
    const response = await apiClient.post('/orders', order);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const cancelOrder = async (orderId: string): Promise<{ success: boolean }> => {
  try {
    const response = await apiClient.delete(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling order:', error);
    throw error;
  }
};

export const fetchOrders = async (params?: {
  status?: 'open' | 'filled' | 'cancelled';
  limit?: number;
}): Promise<Array<any>> => {
  try {
    const response = await apiClient.get('/orders', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const fetchPortfolio = async (): Promise<{
  totalValue: number;
  totalPnl: number;
  positions: Array<{
    tokenId: string;
    amount: number;
    averagePrice: number;
    currentPrice: number;
    pnl: number;
    pnlPercentage: number;
  }>;
}> => {
  try {
    const response = await apiClient.get('/portfolio');
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw error;
  }
};

export const searchTokens = async (query: string): Promise<Token[]> => {
  try {
    const response = await apiClient.get('/tokens/search', { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Error searching tokens:', error);
    throw error;
  }
};

export const fetchChains = async (): Promise<Array<{
  id: string;
  name: string;
  icon: string;
  tokenCount: number;
  volume24h: number;
}>> => {
  try {
    const response = await apiClient.get('/chains');
    return response.data;
  } catch (error) {
    console.error('Error fetching chains:', error);
    throw error;
  }
};