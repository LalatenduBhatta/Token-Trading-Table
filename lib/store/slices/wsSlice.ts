'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
}

export interface WebSocketState {
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastMessage: WebSocketMessage | null;
  connectionAttempts: number;
  lastConnectionTime: number | null;
  errors: string[];
  subscribedPairs: string[];
  connectionId: string | null;
}

const initialState: WebSocketState = {
  status: 'disconnected',
  lastMessage: null,
  connectionAttempts: 0,
  lastConnectionTime: null,
  errors: [],
  subscribedPairs: [],
  connectionId: null,
};

const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    // Connection actions
    setStatus: (state, action: PayloadAction<WebSocketState['status']>) => {
      state.status = action.payload;
    },
    setConnected: (state, action: PayloadAction<{ connectionId: string }>) => {
      state.status = 'connected';
      state.connectionId = action.payload.connectionId;
      state.lastConnectionTime = Date.now();
      state.connectionAttempts = 0;
      state.errors = [];
    },
    setDisconnected: (state) => {
      state.status = 'disconnected';
      state.connectionId = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'error';
      state.errors.push(action.payload);
    },
    incrementConnectionAttempts: (state) => {
      state.connectionAttempts += 1;
    },
    resetConnectionAttempts: (state) => {
      state.connectionAttempts = 0;
    },

    // Message actions
    setLastMessage: (state, action: PayloadAction<WebSocketMessage>) => {
      state.lastMessage = action.payload;
    },
    clearLastMessage: (state) => {
      state.lastMessage = null;
    },

    // Subscription actions
    addSubscribedPair: (state, action: PayloadAction<string>) => {
      if (!state.subscribedPairs.includes(action.payload)) {
        state.subscribedPairs.push(action.payload);
      }
    },
    removeSubscribedPair: (state, action: PayloadAction<string>) => {
      state.subscribedPairs = state.subscribedPairs.filter(pair => pair !== action.payload);
    },
    setSubscribedPairs: (state, action: PayloadAction<string[]>) => {
      state.subscribedPairs = action.payload;
    },
    clearSubscriptions: (state) => {
      state.subscribedPairs = [];
    },

    // Reset actions
    resetWebSocket: (state) => {
      return initialState;
    },
  },
});

export const {
  setStatus,
  setConnected,
  setDisconnected,
  setError,
  incrementConnectionAttempts,
  resetConnectionAttempts,
  setLastMessage,
  clearLastMessage,
  addSubscribedPair,
  removeSubscribedPair,
  setSubscribedPairs,
  clearSubscriptions,
  resetWebSocket,
} = wsSlice.actions;

// Selectors
export const selectWebSocketStatus = (state: { ws: WebSocketState }) => state.ws.status;
export const selectIsConnected = (state: { ws: WebSocketState }) => state.ws.status === 'connected';
export const selectLastMessage = (state: { ws: WebSocketState }) => state.ws.lastMessage;
export const selectConnectionAttempts = (state: { ws: WebSocketState }) => state.ws.connectionAttempts;
export const selectSubscribedPairs = (state: { ws: WebSocketState }) => state.ws.subscribedPairs;
export const selectConnectionId = (state: { ws: WebSocketState }) => state.ws.connectionId;
export const selectLastConnectionTime = (state: { ws: WebSocketState }) => state.ws.lastConnectionTime;
export const selectWebSocketErrors = (state: { ws: WebSocketState }) => state.ws.errors;

export default wsSlice.reducer;