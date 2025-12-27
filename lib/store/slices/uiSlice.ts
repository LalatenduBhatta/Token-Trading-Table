'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export type Theme = 'light' | 'dark' | 'system';
export type ChartType = 'candles' | 'line' | 'area' | 'bars';
export type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w' | '1M';
export type Layout = 'default' | 'trading' | 'analysis' | 'simple';
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ModalState {
  type: 'tokenDetails' | 'trade' | 'settings' | 'welcome' | null;
  data?: any;
  isOpen: boolean;
}

export interface ChartSettings {
  type: ChartType;
  timeframe: Timeframe;
  indicators: string[];
  showVolume: boolean;
  showGrid: boolean;
  showCrosshair: boolean;
}

export interface TableSettings {
  visibleColumns: string[];
  itemsPerPage: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  showLiquidityBars: boolean;
  showSparklines: boolean;
}

export interface TradingSettings {
  defaultSlippage: number;
  confirmOrders: boolean;
  showAdvancedOptions: boolean;
  enableSounds: boolean;
  defaultOrderType: 'market' | 'limit';
}

export interface UIState {
  theme: Theme;
  layout: Layout;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  modals: ModalState[];
  notifications: Notification[];
  chartSettings: ChartSettings;
  tableSettings: TableSettings;
  tradingSettings: TradingSettings;
  activeTab: string;
  isLoading: boolean;
  isConnected: boolean;
  lastUpdate: number;
  viewport: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}

// Initial state
const initialState: UIState = {
  theme: 'dark',
  layout: 'trading',
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  modals: [],
  notifications: [],
  chartSettings: {
    type: 'candles',
    timeframe: '1h',
    indicators: ['RSI', 'MACD', 'BB'],
    showVolume: true,
    showGrid: true,
    showCrosshair: true,
  },
  tableSettings: {
    visibleColumns: ['pair', 'price', 'change24h', 'volume24h', 'liquidity', 'age', 'tags', 'actions'],
    itemsPerPage: 20,
    sortBy: 'volume24h',
    sortOrder: 'desc',
    showLiquidityBars: true,
    showSparklines: true,
  },
  tradingSettings: {
    defaultSlippage: 0.5,
    confirmOrders: true,
    showAdvancedOptions: false,
    enableSounds: true,
    defaultOrderType: 'market',
  },
  activeTab: 'overview',
  isLoading: false,
  isConnected: true,
  lastUpdate: Date.now(),
  viewport: {
    width: 1024,
    height: 768,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  },
};

// UI Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Theme actions
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },

    // Layout actions
    setLayout: (state, action: PayloadAction<Layout>) => {
      state.layout = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },

    // Modal actions
    openModal: (state, action: PayloadAction<{
      type: ModalState['type'];
      data?: any;
    }>) => {
      state.modals.push({
        type: action.payload.type,
        data: action.payload.data,
        isOpen: true,
      });
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter(modal => modal.type !== action.payload);
    },
    closeAllModals: (state) => {
      state.modals = [];
    },

    // Notification actions
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const newNotification: Notification = {
        id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...action.payload,
        timestamp: Date.now(),
        read: false,
      };
      state.notifications.unshift(newNotification);
      
      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },

    // Chart settings actions
    setChartType: (state, action: PayloadAction<ChartType>) => {
      state.chartSettings.type = action.payload;
    },
    setTimeframe: (state, action: PayloadAction<Timeframe>) => {
      state.chartSettings.timeframe = action.payload;
    },
    toggleIndicator: (state, action: PayloadAction<string>) => {
      const index = state.chartSettings.indicators.indexOf(action.payload);
      if (index >= 0) {
        state.chartSettings.indicators.splice(index, 1);
      } else {
        state.chartSettings.indicators.push(action.payload);
      }
    },
    toggleChartSetting: (state, action: PayloadAction<keyof Pick<ChartSettings, 'showVolume' | 'showGrid' | 'showCrosshair'>>) => {
      state.chartSettings[action.payload] = !state.chartSettings[action.payload];
    },

    // Table settings actions
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const column = action.payload;
      const index = state.tableSettings.visibleColumns.indexOf(column);
      if (index >= 0) {
        state.tableSettings.visibleColumns.splice(index, 1);
      } else {
        state.tableSettings.visibleColumns.push(column);
      }
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.tableSettings.itemsPerPage = action.payload;
    },
    setSortConfig: (state, action: PayloadAction<{ sortBy: string; sortOrder: 'asc' | 'desc' }>) => {
      state.tableSettings.sortBy = action.payload.sortBy;
      state.tableSettings.sortOrder = action.payload.sortOrder;
    },
    toggleTableSetting: (state, action: PayloadAction<keyof Pick<TableSettings, 'showLiquidityBars' | 'showSparklines'>>) => {
      state.tableSettings[action.payload] = !state.tableSettings[action.payload];
    },

    // Trading settings actions
    setDefaultSlippage: (state, action: PayloadAction<number>) => {
      state.tradingSettings.defaultSlippage = Math.max(0.1, Math.min(5, action.payload));
    },
    toggleTradingSetting: (state, action: PayloadAction<keyof TradingSettings>) => {
      if (action.payload === 'defaultOrderType') {
        state.tradingSettings[action.payload] = 
          state.tradingSettings[action.payload] === 'market' ? 'limit' : 'market';
      } else {
        state.tradingSettings[action.payload] = !state.tradingSettings[action.payload];
      }
    },

    // General UI actions
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    updateLastUpdate: (state) => {
      state.lastUpdate = Date.now();
    },
    setViewport: (state, action: PayloadAction<UIState['viewport']>) => {
      state.viewport = action.payload;
    },

    // Reset actions
    resetChartSettings: (state) => {
      state.chartSettings = initialState.chartSettings;
    },
    resetTableSettings: (state) => {
      state.tableSettings = initialState.tableSettings;
    },
    resetTradingSettings: (state) => {
      state.tradingSettings = initialState.tradingSettings;
    },
    resetUI: (state) => {
      return {
        ...initialState,
        theme: state.theme,
        layout: state.layout,
        notifications: state.notifications,
        viewport: state.viewport,
      };
    },
  },
});

// Export actions
export const {
  setTheme,
  toggleTheme,
  setLayout,
  toggleSidebar,
  setMobileMenuOpen,
  openModal,
  closeModal,
  closeAllModals,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearAllNotifications,
  setChartType,
  setTimeframe,
  toggleIndicator,
  toggleChartSetting,
  toggleColumnVisibility,
  setItemsPerPage,
  setSortConfig,
  toggleTableSetting,
  setDefaultSlippage,
  toggleTradingSetting,
  setActiveTab,
  setLoading,
  setConnected,
  updateLastUpdate,
  setViewport,
  resetChartSettings,
  resetTableSettings,
  resetTradingSettings,
  resetUI,
} = uiSlice.actions;

// Selectors
export const selectTheme = (state: { ui: UIState }) => state.ui.theme;
export const selectLayout = (state: { ui: UIState }) => state.ui.layout;
export const selectSidebarCollapsed = (state: { ui: UIState }) => state.ui.sidebarCollapsed;
export const selectMobileMenuOpen = (state: { ui: UIState }) => state.ui.mobileMenuOpen;
export const selectModals = (state: { ui: UIState }) => state.ui.modals;
export const selectNotifications = (state: { ui: UIState }) => state.ui.notifications;
export const selectUnreadNotifications = (state: { ui: UIState }) => 
  state.ui.notifications.filter(n => !n.read).length;
export const selectChartSettings = (state: { ui: UIState }) => state.ui.chartSettings;
export const selectTableSettings = (state: { ui: UIState }) => state.ui.tableSettings;
export const selectTradingSettings = (state: { ui: UIState }) => state.ui.tradingSettings;
export const selectActiveTab = (state: { ui: UIState }) => state.ui.activeTab;
export const selectIsLoading = (state: { ui: UIState }) => state.ui.isLoading;
export const selectIsConnected = (state: { ui: UIState }) => state.ui.isConnected;
export const selectLastUpdate = (state: { ui: UIState }) => state.ui.lastUpdate;
export const selectViewport = (state: { ui: UIState }) => state.ui.viewport;

// Modal selector helpers
export const selectModalByType = (type: ModalState['type']) => 
  (state: { ui: UIState }) => state.ui.modals.find(modal => modal.type === type);
export const selectIsModalOpen = (type: ModalState['type']) => 
  (state: { ui: UIState }) => state.ui.modals.some(modal => modal.type === type && modal.isOpen);

// Notification selector helpers
export const selectRecentNotifications = (limit: number = 5) => 
  (state: { ui: UIState }) => state.ui.notifications.slice(0, limit);

export default uiSlice.reducer;