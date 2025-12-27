'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { TokenTableHeader } from './TokenTableHeader';
import { TokenTableRow } from './TokenTableRow';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useSorting } from '@/hooks/useSorting';
import { usePagination } from '@/hooks/usePagination';
import { fetchTokens } from '@/lib/api/queries';
import { AppDispatch, RootState } from '@/lib/store/store';
import { setTokens, updateTokenPrice } from '@/lib/store/slices/tokenSlice';
import { Token } from '@/types/token';
import { Pagination } from '@/components/common/Pagination';

const COLUMNS = [
  { key: 'pair', label: 'Pair', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'change24h', label: '24h', sortable: true },
  { key: 'volume24h', label: 'Volume 24h', sortable: true },
  { key: 'liquidity', label: 'Liquidity', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'tags', label: 'Tags', sortable: false },
  { key: 'actions', label: '', sortable: false },
];

export function TokenTable() {
  const dispatch = useDispatch<AppDispatch>();
  const tokens = useSelector((state: RootState) => state.token.tokens);
  const { sortConfig, handleSort } = useSorting<Token>();
  const { currentPage, itemsPerPage, totalPages, paginate, setCurrentPage } = usePagination();

  // Fetch tokens with React Query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Setup WebSocket for real-time updates
  const { lastMessage, readyState } = useWebSocket('wss://api.axiom.trade/ws');

  // Update tokens when data is fetched
  useEffect(() => {
    if (data) {
      dispatch(setTokens(data));
    }
  }, [data, dispatch]);

  // Handle real-time price updates
  useEffect(() => {
    if (lastMessage) {
      try {
        const update = JSON.parse(lastMessage.data);
        if (update.type === 'price_update') {
          dispatch(updateTokenPrice(update));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  }, [lastMessage, dispatch]);

  // Sort tokens
  const sortedTokens = useMemo(() => {
    const sortableTokens = [...tokens];
    if (sortConfig.key) {
      sortableTokens.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Token];
        const bValue = b[sortConfig.key as keyof Token];
        
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableTokens;
  }, [tokens, sortConfig]);

  // Paginate tokens
  const paginatedTokens = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedTokens.slice(startIndex, endIndex);
  }, [sortedTokens, currentPage, itemsPerPage]);

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Failed to load tokens</p>
          <button
            onClick={() => refetch()}
            className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <TokenTableHeader
          columns={COLUMNS}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
        <tbody className="divide-y divide-gray-800">
          {paginatedTokens.map((token) => (
            <TokenTableRow key={token.id} token={token} />
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      {sortedTokens.length > itemsPerPage && (
        <div className="border-t border-gray-800 px-6 py-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={sortedTokens.length}
          />
        </div>
      )}
    </div>
  );
}