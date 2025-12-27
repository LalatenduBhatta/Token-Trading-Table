'use client';

import { useState, useMemo } from 'react';

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export function usePagination(defaultItemsPerPage = 20) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback((totalPages: number) => {
    setCurrentPage(totalPages);
  }, []);

  const updateItemsPerPage = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when items per page changes
  }, []);

  const getPaginatedData = useCallback(
    <T>(data: T[]): T[] => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex);
    },
    [currentPage, itemsPerPage]
  );

  const getTotalPages = useCallback(
    (totalItems: number) => {
      return Math.ceil(totalItems / itemsPerPage);
    },
    [itemsPerPage]
  );

  return {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    paginate,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    updateItemsPerPage,
    getPaginatedData,
    getTotalPages,
  };
}