import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom selector hooks for specific state slices
export const useTokenState = () => {
  return useSelector((state: RootState) => state.token);
};

export const useTokenFilters = () => {
  return useSelector((state: RootState) => state.token.filters);
};

export const useSelectedToken = () => {
  return useSelector((state: RootState) => state.token.selectedToken);
};

export const useUIState = () => {
  return useSelector((state: RootState) => state.ui);
};

export const useTheme = () => {
  return useSelector((state: RootState) => state.ui.theme);
};

export const useNotifications = () => {
  return useSelector((state: RootState) => state.ui.notifications);
};

export const useWebSocketState = () => {
  return useSelector((state: RootState) => state.ws);
};

export const useWebSocketStatus = () => {
  return useSelector((state: RootState) => state.ws.status);
};

// Memoized selectors for performance
import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredTokens = createSelector(
  [(state: RootState) => state.token.tokens, (state: RootState) => state.token.filters],
  (tokens, filters) => {
    let filtered = [...tokens];

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(token => token.category === filters.category);
    }

    // Filter by chain
    if (filters.chain.length > 0) {
      filtered = filtered.filter(token => filters.chain.includes(token.chain));
    }

    // Filter by min liquidity
    if (filters.minLiquidity > 0) {
      filtered = filtered.filter(token => token.liquidity >= filters.minLiquidity);
    }

    return filtered;
  }
);

export const selectTokenStats = createSelector(
  [(state: RootState) => state.token.tokens],
  (tokens) => {
    const totalTokens = tokens.length;
    const totalVolume = tokens.reduce((sum, token) => sum + token.volume24h, 0);
    const totalLiquidity = tokens.reduce((sum, token) => sum + token.liquidity, 0);
    const averageChange = tokens.reduce((sum, token) => sum + token.change24h, 0) / totalTokens;

    return {
      totalTokens,
      totalVolume,
      totalLiquidity,
      averageChange,
      newTokens: tokens.filter(t => t.isNew).length,
      topGainers: [...tokens]
        .sort((a, b) => b.change24h - a.change24h)
        .slice(0, 5),
      topLosers: [...tokens]
        .sort((a, b) => a.change24h - b.change24h)
        .slice(0, 5),
    };
  }
);