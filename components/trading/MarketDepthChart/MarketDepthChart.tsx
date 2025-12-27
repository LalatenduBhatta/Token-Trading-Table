'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils/cn';

interface DepthData {
  price: number;
  bidAmount: number;
  askAmount: number;
}

interface MarketDepthChartProps {
  bids: Array<{ price: number; amount: number }>;
  asks: Array<{ price: number; amount: number }>;
  height?: number;
  className?: string;
}

export function MarketDepthChart({ bids, asks, height = 300, className }: MarketDepthChartProps) {
  const depthData = useMemo(() => {
    const data: DepthData[] = [];
    const allPrices = [...bids.map(b => b.price), ...asks.map(a => a.price)];
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const priceStep = (maxPrice - minPrice) / 50;

    for (let price = minPrice; price <= maxPrice; price += priceStep) {
      const bid = bids.find(b => Math.abs(b.price - price) < priceStep / 2);
      const ask = asks.find(a => Math.abs(a.price - price) < priceStep / 2);
      
      data.push({
        price,
        bidAmount: bid?.amount || 0,
        askAmount: ask?.amount || 0,
      });
    }

    return data;
  }, [bids, asks]);

  const maxAmount = useMemo(() => {
    return Math.max(
      ...depthData.map(d => d.bidAmount),
      ...depthData.map(d => d.askAmount)
    );
  }, [depthData]);

  const currentPrice = useMemo(() => {
    const midBid = bids[Math.floor(bids.length / 2)];
    const midAsk = asks[Math.floor(asks.length / 2)];
    return ((midBid?.price || 0) + (midAsk?.price || 0)) / 2;
  }, [bids, asks]);

  const spread = useMemo(() => {
    const bestBid = bids[0]?.price || 0;
    const bestAsk = asks[0]?.price || 0;
    return ((bestAsk - bestBid) / bestBid) * 100;
  }, [bids, asks]);

  return (
    <div className={cn('rounded-xl border border-gray-800 bg-gray-900', className)}>
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Market Depth</h3>
          <div className="flex items-center gap-4">
            <div>
              <span className="text-sm text-gray-400">Spread: </span>
              <span className="font-medium text-yellow-400">{spread.toFixed(3)}%</span>
            </div>
            <div>
              <span className="text-sm text-gray-400">Mid Price: </span>
              <span className="font-medium text-white">${currentPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-6" style={{ height: `${height}px` }}>
        {/* Y-axis */}
        <div className="absolute left-0 top-0 bottom-0 w-16 border-r border-gray-800">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <div
              key={ratio}
              className="absolute flex items-center text-xs text-gray-500"
              style={{ bottom: `${ratio * 100}%` }}
            >
              ${(maxAmount * ratio).toFixed(0)}
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="absolute left-16 right-0 top-0 bottom-0">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
              <div
                key={ratio}
                className="absolute left-0 right-0 border-t border-gray-800"
                style={{ bottom: `${ratio * 100}%` }}
              />
            ))}
          </div>

          {/* Bid depth (left side) */}
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="bid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`
                M 0,${height}
                ${depthData.map((d, i) => {
                  const x = (i / (depthData.length - 1)) * 100;
                  const y = height - (d.bidAmount / maxAmount) * height;
                  return `L ${x}%,${y}`;
                }).join(' ')}
                L 50%,${height}
                Z
              `}
              fill="url(#bid-gradient)"
            />
            <path
              d={`
                M 0,${height}
                ${depthData.map((d, i) => {
                  const x = (i / (depthData.length - 1)) * 100;
                  const y = height - (d.bidAmount / maxAmount) * height;
                  return `L ${x}%,${y}`;
                }).join(' ')}
              `}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
            />
          </svg>

          {/* Ask depth (right side) */}
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="ask-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`
                M 50%,${height}
                ${depthData.map((d, i) => {
                  const x = (i / (depthData.length - 1)) * 100;
                  const y = height - (d.askAmount / maxAmount) * height;
                  return `L ${x}%,${y}`;
                }).join(' ')}
                L 100%,${height}
                Z
              `}
              fill="url(#ask-gradient)"
            />
            <path
              d={`
                M 50%,${height}
                ${depthData.map((d, i) => {
                  const x = (i / (depthData.length - 1)) * 100;
                  const y = height - (d.askAmount / maxAmount) * height;
                  return `L ${x}%,${y}`;
                }).join(' ')}
              `}
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
            />
          </svg>

          {/* Current price line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-blue-500"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white">
              ${currentPrice.toFixed(2)}
            </div>
          </div>

          {/* Hover tooltip */}
          <div className="absolute inset-0">
            <div className="group relative h-full w-full">
              <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-gray-800 p-3 shadow-lg group-hover:block">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-400">Best Bid:</span>
                    <span className="font-medium text-green-400">
                      ${bids[0]?.price.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-400">Best Ask:</span>
                    <span className="font-medium text-red-400">
                      ${asks[0]?.price.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-400">Spread:</span>
                    <span className="font-medium text-yellow-400">
                      {spread.toFixed(3)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* X-axis */}
        <div className="absolute bottom-0 left-16 right-0 border-t border-gray-800 pt-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>${Math.min(...depthData.map(d => d.price)).toFixed(2)}</span>
            <span>Price</span>
            <span>${Math.max(...depthData.map(d => d.price)).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="border-t border-gray-800 px-6 py-3">
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500/20">
              <div className="h-full w-1/2 rounded-l-full bg-green-500" />
            </div>
            <span className="text-sm text-gray-400">Bids</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/20">
              <div className="ml-auto h-full w-1/2 rounded-r-full bg-red-500" />
            </div>
            <span className="text-sm text-gray-400">Asks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-400">Current Price</span>
          </div>
        </div>
      </div>
    </div>
  );
}