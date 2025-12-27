'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchTokens,
  fetchTokenDetails,
  fetchTokenHistory,
  fetchMarketStats,
  placeOrder,
  cancelOrder,
  fetchOrders,
  fetchPortfolio,
  searchTokens,
} from '@/lib/api/queries';
import { updateTokenPrice } from '@/lib/store/slices/tokenSlice';
import { useDebounce } from './useDebounce';
import { Token } from '@/types/token';

export function useTokenData(params?: {
  page?: number;
  limit?: number;
  category?: string;
  chain?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    data: tokensData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['tokens', params],
    queryFn: () => fetchTokens(params),
    staleTime: 30000, // 30 seconds
    gcTime: 60000, // 1 minute
  });

  // Update Redux store when data changes
  useEffect(() => {
    if (tokensData?.tokens) {
      // Dispatch tokens to Redux store
      // tokensData.tokens.forEach(token => {
      //   dispatch(setToken(token));
      // });
    }
  }, [tokensData, dispatch]);

  return {
    tokens: tokensData?.tokens || [],
    total: tokensData?.total || 0,
    page: tokensData?.page || 1,
    totalPages: tokensData?.totalPages || 0,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}

export function useTokenDetails(tokenId: string) {
  return useQuery({
    queryKey: ['token', tokenId],
    queryFn: () => fetchTokenDetails(tokenId),
    enabled: !!tokenId,
    staleTime: 30000,
  });
}

export function useTokenHistory(tokenId: string, interval: string) {
  return useQuery({
    queryKey: ['token-history', tokenId, interval],
    queryFn: () => fetchTokenHistory(tokenId, interval as any),
    enabled: !!tokenId,
    staleTime: 60000,
  });
}

export function useMarketStats() {
  return useQuery({
    queryKey: ['market-stats'],
    queryFn: fetchMarketStats,
    staleTime: 60000, // 1 minute
    refetchInterval: 60000, // Refetch every minute
  });
}

export function useTokenSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const {
    data: searchResults,
    isLoading: isSearching,
    error: searchError,
  } = useQuery({
    queryKey: ['token-search', debouncedQuery],
    queryFn: () => searchTokens(debouncedQuery),
    enabled: debouncedQuery.length > 1,
    staleTime: 30000,
  });

  return {
    searchQuery,
    setSearchQuery,
    searchResults: searchResults || [],
    isSearching,
    searchError,
  };
}

export function useOrderManagement() {
  const queryClient = useQueryClient();

  const placeOrderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
    onError: (error) => {
      console.error('Failed to place order:', error);
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetchOrders(),
    staleTime: 30000,
  });

  const { data: portfolio, isLoading: portfolioLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolio,
    staleTime: 30000,
  });

  return {
    placeOrder: placeOrderMutation.mutate,
    placeOrderAsync: placeOrderMutation.mutateAsync,
    isPlacingOrder: placeOrderMutation.isPending,
    cancelOrder: cancelOrderMutation.mutate,
    isCancellingOrder: cancelOrderMutation.isPending,
    orders: orders || [],
    portfolio: portfolio || null,
    isLoading: ordersLoading || portfolioLoading,
  };
}

export function useWebSocketUpdates() {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/ws');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'price_update':
            dispatch(updateTokenPrice(data));
            break;
          case 'trade_execution':
            // Handle trade execution
            break;
          case 'orderbook_update':
            // Handle orderbook update
            break;
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);
}