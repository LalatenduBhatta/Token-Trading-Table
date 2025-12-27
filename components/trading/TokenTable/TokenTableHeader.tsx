'use client';

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SortConfig } from '@/hooks/useSorting';
import { cn } from '@/lib/utils/cn';

interface Column {
  key: string;
  label: string;
  sortable: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TokenTableHeaderProps {
  columns: Column[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

export function TokenTableHeader({ columns, sortConfig, onSort }: TokenTableHeaderProps) {
  return (
    <thead className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm">
      <tr className="border-b border-gray-800">
        {columns.map((column) => (
          <th
            key={column.key}
            className={cn(
              'px-4 py-3 text-left text-sm font-medium text-gray-400',
              column.align === 'right' && 'text-right',
              column.align === 'center' && 'text-center',
              column.width && `w-[${column.width}]`
            )}
          >
            {column.sortable ? (
              <button
                onClick={() => onSort(column.key)}
                className="flex items-center gap-1 transition-colors hover:text-white"
              >
                {column.label}
                <div className="relative h-4 w-4">
                  <ArrowUpDown className="h-4 w-4" />
                  {sortConfig.key === column.key && (
                    <>
                      <ArrowUp
                        className={cn(
                          'absolute inset-0 h-4 w-4 transition-all',
                          sortConfig.direction === 'ascending'
                            ? 'text-blue-500'
                            : 'text-gray-600'
                        )}
                      />
                      <ArrowDown
                        className={cn(
                          'absolute inset-0 h-4 w-4 transition-all',
                          sortConfig.direction === 'descending'
                            ? 'text-blue-500'
                            : 'text-gray-600'
                        )}
                      />
                    </>
                  )}
                </div>
              </button>
            ) : (
              <span>{column.label}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}