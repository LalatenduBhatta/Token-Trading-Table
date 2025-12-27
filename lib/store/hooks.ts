import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ==================== UI SLICE HOOKS ====================

// Theme hooks
export const useTheme = () => {
  return useSelector((state: RootState) => state.ui.theme);
};

export const useIsDarkMode = () => {
  return useSelector((state: RootState) => state.ui.theme === 'dark');
};

// Layout hooks
export const useLayout = () => {
  return useSelector((state: RootState) => state.ui.layout);
};

export const useSidebarState = () => {
  return useSelector((state: RootState) => ({
    collapsed: state.ui.sidebarCollapsed,
    mobileOpen: state.ui.mobileMenuOpen,
  }));
};

// Modal hooks
export const useModals = () => {
  return useSelector((state: RootState) => state.ui.modals);
};

export const useModal = (type: string) => {
  return useSelector((state: RootState) => 
    state.ui.modals.find(modal => modal.type === type)
  );
};

export const useIsModalOpen = (type: string) => {
  return useSelector((state: RootState) => 
    state.ui.modals.some(modal => modal.type === type && modal.isOpen)
  );
};

// Notification hooks
export const useNotifications = () => {
  return useSelector((state: RootState) => state.ui.notifications);
};

export const useUnreadNotificationsCount = () => {
  return useSelector((state: RootState) => 
    state.ui.notifications.filter(n => !n.read).length
  );
};

export const useRecentNotifications = (limit: number = 5) => {
  return useSelector((state: RootState) => 
    state.ui.notifications.slice(0, limit)
  );
};

// Chart settings hooks
export const useChartSettings = () => {
  return useSelector((state: RootState) => state.ui.chartSettings);
};

export const useTimeframe = () => {
  return useSelector((state: RootState) => state.ui.chartSettings.timeframe);
};

export const useChartType = () => {
  return useSelector((state: RootState) => state.ui.chartSettings.type);
};

export const useActiveIndicators = () => {
  return useSelector((state: RootState) => state.ui.chartSettings.indicators);
};

// Table settings hooks
export const useTableSettings = () => {
  return useSelector((state: RootState) => state.ui.tableSettings);
};

export const useVisibleColumns = () => {
  return useSelector((state: RootState) => state.ui.tableSettings.visibleColumns);
};

export const useItemsPerPage = () => {
  return useSelector((state: RootState) => state.ui.tableSettings.itemsPerPage);
};

// Trading settings hooks
export const useTradingSettings = () => {
  return useSelector((state: RootState) => state.ui.tradingSettings);
};

export const useDefaultSlippage = () => {
  return useSelector((state: RootState) => state.ui.tradingSettings.defaultSlippage);
};

export const useOrderConfirmation = () => {
  return useSelector((state: RootState) => state.ui.tradingSettings.confirmOrders);
};

// General UI hooks
export const useActiveTab = () => {
  return useSelector((state: RootState) => state.ui.activeTab);
};

export const useIsLoading = () => {
  return useSelector((state: RootState) => state.ui.isLoading);
};

export const useIsConnected = () => {
  return useSelector((state: RootState) => state.ui.isConnected);
};

export const useViewport = () => {
  return useSelector((state: RootState) => state.ui.viewport);
};

export const useIsMobile = () => {
  return useSelector((state: RootState) => state.ui.viewport.isMobile);
};

export const useIsTablet = () => {
  return useSelector((state: RootState) => state.ui.viewport.isTablet);
};

export const useIsDesktop = () => {
  return useSelector((state: RootState) => state.ui.viewport.isDesktop);
};

// ==================== TOKEN SLICE HOOKS ====================

export const useTokenState = () => {
  return useSelector((state: RootState) => state.token);
};

export const useTokenFilters = () => {
  return useSelector((state: RootState) => state.token.filters);
};

export const useSelectedToken = () => {
  return useSelector((state: RootState) => state.token.selectedToken);
};

// ==================== WEBSOCKET SLICE HOOKS ====================

export const useWebSocketState = () => {
  return useSelector((state: RootState) => state.ws);
};

export const useWebSocketStatus = () => {
  return useSelector((state: RootState) => state.ws.status);
};

export const useWebSocketConnection = () => {
  return useSelector((state: RootState) => ({
    status: state.ws.status,
    isConnected: state.ws.status === 'connected',
    connectionId: state.ws.connectionId,
    lastConnectionTime: state.ws.lastConnectionTime,
    connectionAttempts: state.ws.connectionAttempts,
  }));
};

export const useSubscribedPairs = () => {
  return useSelector((state: RootState) => state.ws.subscribedPairs);
};

// ==================== PERFORMANCE-OPTIMIZED SELECTORS ====================

import { createSelector } from '@reduxjs/toolkit';

// Memoized selector for filtered tokens
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

// Memoized selector for token statistics
export const selectTokenStats = createSelector(
  [(state: RootState) => state.token.tokens],
  (tokens) => {
    const totalTokens = tokens.length;
    const totalVolume = tokens.reduce((sum, token) => sum + token.volume24h, 0);
    const totalLiquidity = tokens.reduce((sum, token) => sum + token.liquidity, 0);
    const averageChange = totalTokens > 0 
      ? tokens.reduce((sum, token) => sum + token.change24h, 0) / totalTokens 
      : 0;

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

// Memoized selector for paginated tokens
export const selectPaginatedTokens = createSelector(
  [
    selectFilteredTokens,
    (state: RootState) => state.ui.tableSettings.sortBy,
    (state: RootState) => state.ui.tableSettings.sortOrder,
    (state: RootState) => state.ui.tableSettings.itemsPerPage,
    (state: RootState) => state.token.currentPage || 1,
  ],
  (tokens, sortBy, sortOrder, itemsPerPage, currentPage) => {
    // Sort tokens
    const sortedTokens = [...tokens].sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

    // Paginate tokens
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      tokens: sortedTokens.slice(startIndex, endIndex),
      total: sortedTokens.length,
      currentPage,
      totalPages: Math.ceil(sortedTokens.length / itemsPerPage),
    };
  }
);

// Memoized selector for active indicators
export const selectActiveIndicatorsMap = createSelector(
  [(state: RootState) => state.ui.chartSettings.indicators],
  (indicators) => ({
    RSI: indicators.includes('RSI'),
    MACD: indicators.includes('MACD'),
    BB: indicators.includes('BB'),
    VWAP: indicators.includes('VWAP'),
    EMA: indicators.includes('EMA'),
    SMA: indicators.includes('SMA'),
  })
);