'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface TokenTableCellProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  colSpan?: number;
}

export function TokenTableCell({
  children,
  className,
  onClick,
  colSpan,
}: TokenTableCellProps) {
  return (
    <td
      colSpan={colSpan}
      onClick={onClick}
      className={cn(
        'px-4 py-3 text-sm transition-colors group-hover:bg-gray-800/30',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </td>
  );
}