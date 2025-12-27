import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, TokenUpdate } from '@/types/token';

interface TokenState {
  tokens: Token[];
  selectedToken: Token | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: 'all' | 'new' | 'final-stretch' | 'migrated';
    chain: string[];
    minLiquidity: number;
  };
}

const initialState: TokenState = {
  tokens: [],
  selectedToken: null,
  loading: false,
  error: null,
  filters: {
    category: 'all',
    chain: [],
    minLiquidity: 10000,
  },
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateTokenPrice: (state, action: PayloadAction<TokenUpdate>) => {
      const { tokenId, price, change24h, volume24h } = action.payload;
      const tokenIndex = state.tokens.findIndex(t => t.id === tokenId);
      if (tokenIndex !== -1) {
        const token = state.tokens[tokenIndex];
        // Smooth transition by keeping previous price for comparison
        token.previousPrice = token.price;
        token.price = price;
        token.change24h = change24h;
        token.volume24h = volume24h;
      }
    },
    selectToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<TokenState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addToWatchlist: (state, action: PayloadAction<string>) => {
      const token = state.tokens.find(t => t.id === action.payload);
      if (token) {
        token.isWatched = !token.isWatched;
      }
    },
  },
});

export const {
  setTokens,
  setLoading,
  setError,
  updateTokenPrice,
  selectToken,
  updateFilters,
  addToWatchlist,
} = tokenSlice.actions;

export default tokenSlice.reducer;