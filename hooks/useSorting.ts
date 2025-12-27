'use client';

import { useState, useCallback } from 'react';

export interface SortConfig {
  key: string;
  direction: 'ascending' | 'descending';
}

export function useSorting<T>(defaultConfig?: SortConfig) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    defaultConfig || { key: '', direction: 'ascending' }
  );

  const handleSort = useCallback((key: string) => {
    setSortConfig((current) => {
      if (current.key === key) {
        return {
          key,
          direction: current.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }
      return { key, direction: 'ascending' };
    });
  }, []);

  const clearSort = useCallback(() => {
    setSortConfig({ key: '', direction: 'ascending' });
  }, []);

  const sortData = useCallback(
    (data: T[]): T[] => {
      if (!sortConfig.key) return data;

      return [...data].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof T];
        const bValue = b[sortConfig.key as keyof T];

        // Handle different data types
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'ascending'
            ? aValue - bValue
            : bValue - aValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (aValue instanceof Date && bValue instanceof Date) {
          return sortConfig.direction === 'ascending'
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }

        return 0;
      });
    },
    [sortConfig]
  );

  return {
    sortConfig,
    handleSort,
    clearSort,
    sortData,
  };
}