'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface PriceIndicatorProps {
  price: number;
  change24h: number;
  size?: 'sm' | 'md' | 'lg';
  showChange?: boolean;
  animate?: boolean;
}

export function PriceIndicator({
  price,
  change24h,
  size = 'md',
  showChange = true,
  animate = true,
}: PriceIndicatorProps) {
  const [previousPrice, setPreviousPrice] = useState(price);
  const [flashColor, setFlashColor] = useState<'green' | 'red' | null>(null);
  const prevPriceRef = useRef(price);

  // Format price
  const formatPrice = (value: number) => {
    if (value >= 1000) return `$${value.toFixed(2)}`;
    if (value >= 1) return `$${value.toFixed(3)}`;
    return `$${value.toFixed(6)}`;
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  // Determine color based on value
  const getColorClass = (value: number) => {
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  // Determine background color
  const getBgColorClass = (value: number) => {
    if (value > 0) return 'bg-green-500/20';
    if (value < 0) return 'bg-red-500/20';
    return 'bg-gray-500/20';
  };

  // Size classes
  const sizeClasses = {
    sm: {
      price: 'text-lg font-semibold',
      change: 'text-sm',
      container: 'gap-1',
    },
    md: {
      price: 'text-2xl font-bold',
      change: 'text-base',
      container: 'gap-2',
    },
    lg: {
      price: 'text-3xl font-bold',
      change: 'text-lg',
      container: 'gap-3',
    },
  };

  // Animation for price changes
  useEffect(() => {
    if (animate && price !== prevPriceRef.current) {
      const color = price > prevPriceRef.current ? 'green' : 'red';
      setFlashColor(color);
      
      const timer = setTimeout(() => setFlashColor(null), 1000);
      prevPriceRef.current = price;
      
      return () => clearTimeout(timer);
    }
  }, [price, animate]);

  return (
    <div className={cn('flex flex-col', sizeClasses[size].container)}>
      <div className="flex items-center gap-3">
        <motion.div
          key={price}
          initial={animate ? { scale: 1.05, opacity: 0.8 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'relative',
            flashColor === 'green' && 'animate-pulse-glow',
            flashColor === 'red' && 'animate-pulse-glow'
          )}
        >
          <span className={cn(sizeClasses[size].price, getColorClass(change24h))}>
            {formatPrice(price)}
          </span>
          {flashColor && (
            <div
              className={cn(
                'absolute inset-0 rounded-lg blur-md',
                flashColor === 'green' && 'bg-green-500/30',
                flashColor === 'red' && 'bg-red-500/30'
              )}
            />
          )}
        </motion.div>

        {showChange && (
          <motion.div
            key={change24h}
            initial={animate ? { y: -10, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'rounded-full px-3 py-1 font-medium',
              sizeClasses[size].change,
              getBgColorClass(change24h),
              getColorClass(change24h)
            )}
          >
            {change24h >= 0 ? '↗' : '↘'}
            {formatPercentage(change24h)}
          </motion.div>
        )}
      </div>

      {/* Price movement indicator */}
      <div className="flex items-center gap-2">
        <div className="h-1 flex-1 rounded-full bg-gray-800">
          <motion.div
            className={cn(
              'h-full rounded-full',
              change24h >= 0 ? 'bg-green-500' : 'bg-red-500'
            )}
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(Math.abs(change24h) * 5, 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-xs text-gray-500">
          {change24h >= 0 ? 'Bullish' : 'Bearish'}
        </span>
      </div>
    </div>
  );
}