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
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;