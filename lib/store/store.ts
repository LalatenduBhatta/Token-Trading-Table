import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slices/tokenSlice';
import uiReducer from './slices/uiSlice';
import wsReducer from './slices/wsSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    ui: uiReducer,
    ws: wsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['ui/openModal', 'ui/addNotification'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.action.onClick', 'payload.data'],
        // Ignore these paths in the state
        ignoredPaths: ['ui.modals', 'ui.notifications'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;