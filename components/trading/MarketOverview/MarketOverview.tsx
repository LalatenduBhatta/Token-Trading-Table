'use client';

import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface MarketOverviewProps {
  className?: string;
}

export function MarketOverview({ className }: MarketOverviewProps) {
  const stats = [
    {
      label: 'Total Market Cap',
      value: '$1.2T',
      change: '+2.34%',
      isPositive: true,
      icon: DollarSign,
    },
    {
      label: '24h Volume',
      value: '$42.8B',
      change: '+5.67%',
      isPositive: true,
      icon: BarChart3,
    },
    {
      label: 'BTC Dominance',
      value: '48.2%',
      change: '-0.42%',
      isPositive: false,
      icon: TrendingUp,
    },
    {
      label: 'Fear & Greed Index',
      value: '72',
      change: 'Greed',
      isPositive: true,
      icon: TrendingDown,
    },
  ];

  return (
    <div className={cn('grid grid-cols-2 gap-4 lg:grid-cols-4', className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-800 bg-gray-900/50 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
            </div>
            <div
              className={cn(
                'rounded-lg p-2',
                stat.isPositive
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              )}
            >
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span
              className={cn(
                'text-sm font-medium',
                stat.isPositive ? 'text-green-400' : 'text-red-400'
              )}
            >
              {stat.change}
            </span>
            <span className="text-xs text-gray-500">24h change</span>
          </div>
        </div>
      ))}
    </div>
  );
}