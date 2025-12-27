'use client';

import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PriceChangeProps {
  value: number;
  showIcon?: boolean;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export function PriceChange({
  value,
  showIcon = true,
  size = 'md',
  className,
}: PriceChangeProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  const sizeClasses = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-sm px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  const iconSize = {
    xs: 'h-3 w-3',
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
  };

  const formatValue = () => {
    const absValue = Math.abs(value);
    const sign = isPositive ? '+' : '';
    return `${sign}${absValue.toFixed(2)}%`;
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        sizeClasses[size],
        isPositive && 'bg-green-500/20 text-green-400',
        isNegative && 'bg-red-500/20 text-red-400',
        isNeutral && 'bg-gray-500/20 text-gray-400',
        className
      )}
    >
      {showIcon && (
        <>
          {isPositive && <ArrowUp className={iconSize[size]} />}
          {isNegative && <ArrowDown className={iconSize[size]} />}
          {isNeutral && <Minus className={iconSize[size]} />}
        </>
      )}
      <span>{formatValue()}</span>
    </motion.div>
  );
}