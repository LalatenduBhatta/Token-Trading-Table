'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { mockWebSocket } from '@/lib/ws/mockWebSocket';

interface UseWebSocketOptions {
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
  onClose?: (event: CloseEvent) => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export function useWebSocket(url: string, options: UseWebSocketOptions = {}) {
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    // In production, use real WebSocket
    // const ws = new WebSocket(url);
    
    // For mock/demo, use mock WebSocket
    const ws = mockWebSocket(url);
    
    wsRef.current = ws;

    ws.onopen = () => {
      setReadyState(WebSocket.OPEN);
      setReconnectAttempts(0);
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      setLastMessage(event);
      options.onMessage?.(JSON.parse(event.data));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      options.onError?.(error);
    };

    ws.onclose = (event) => {
      setReadyState(WebSocket.CLOSED);
      options.onClose?.(event);
      
      // Attempt reconnection
      if (reconnectAttempts < (options.maxReconnectAttempts || 5)) {
        const interval = options.reconnectInterval || 3000;
        reconnectTimeoutRef.current = setTimeout(() => {
          setReconnectAttempts(prev => prev + 1);
          connect();
        }, interval);
      }
    };
  }, [url, options, reconnectAttempts]);

  const sendMessage = useCallback((data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    lastMessage,
    readyState,
    sendMessage,
    disconnect,
    reconnectAttempts,
  };
}