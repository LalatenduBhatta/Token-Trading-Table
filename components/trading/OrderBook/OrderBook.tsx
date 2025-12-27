'use client';

import { useState, useMemo } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
  type: 'bid' | 'ask';
}

interface OrderBookProps {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  spread: number;
  className?: string;
}

export function OrderBook({ bids, asks, spread, className }: OrderBookProps) {
  const [isDepthVisible, setIsDepthVisible] = useState(true);

  const maxTotal = useMemo(() => {
    const bidMax = bids.reduce((max, bid) => Math.max(max, bid.total), 0);
    const askMax = asks.reduce((max, ask) => Math.max(max, ask.total), 0);
    return Math.max(bidMax, askMax);
  }, [bids, asks]);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toFixed(2);
  };

  return (
    <div className={cn('rounded-xl border border-gray-800 bg-gray-900', className)}>
      <div className="border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Order Book</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDepthVisible(!isDepthVisible)}
              className="text-sm text-gray-400 hover:text-white"
            >
              {isDepthVisible ? 'Hide Depth' : 'Show Depth'}
            </button>
            <div className="text-sm">
              <span className="text-gray-400">Spread:</span>
              <span className="ml-2 font-medium text-yellow-400">{spread.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Bids */}
        <div className="border-r border-gray-800">
          <div className="border-b border-gray-800 px-4 py-2">
            <div className="grid grid-cols-3 text-sm font-medium text-gray-400">
              <span>Price (USD)</span>
              <span className="text-right">Amount</span>
              <span className="text-right">Total</span>
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {bids.map((bid, index) => (
              <div
                key={index}
                className="group relative px-4 py-2 hover:bg-gray-800/50"
              >
                {isDepthVisible && (
                  <div
                    className="absolute inset-y-0 right-0 bg-green-500/10"
                    style={{ width: `${(bid.total / maxTotal) * 100}%` }}
                  />
                )}
                <div className="relative grid grid-cols-3 text-sm">
                  <span className="font-medium text-green-400 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    {bid.price.toFixed(2)}
                  </span>
                  <span className="text-right text-gray-300">
                    {formatNumber(bid.amount)}
                  </span>
                  <span className="text-right text-gray-300">
                    {formatNumber(bid.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Asks */}
        <div>
          <div className="border-b border-gray-800 px-4 py-2">
            <div className="grid grid-cols-3 text-sm font-medium text-gray-400">
              <span>Price (USD)</span>
              <span className="text-right">Amount</span>
              <span className="text-right">Total</span>
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {asks.map((ask, index) => (
              <div
                key={index}
                className="group relative px-4 py-2 hover:bg-gray-800/50"
              >
                {isDepthVisible && (
                  <div
                    className="absolute inset-y-0 left-0 bg-red-500/10"
                    style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                  />
                )}
                <div className="relative grid grid-cols-3 text-sm">
                  <span className="font-medium text-red-400 flex items-center gap-1">
                    <ArrowDown className="h-3 w-3" />
                    {ask.price.toFixed(2)}
                  </span>
                  <span className="text-right text-gray-300">
                    {formatNumber(ask.amount)}
                  </span>
                  <span className="text-right text-gray-300">
                    {formatNumber(ask.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}