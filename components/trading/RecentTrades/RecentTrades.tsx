'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Trade {
  id: string;
  side: 'buy' | 'sell';
  price: number;
  amount: number;
  time: string;
}

interface RecentTradesProps {
  trades: Trade[];
  className?: string;
}

export function RecentTrades({ trades, className }: RecentTradesProps) {
  return (
    <div className={cn('rounded-xl border border-gray-800 bg-gray-900', className)}>
      <div className="border-b border-gray-800 px-6 py-4">
        <h3 className="font-semibold text-white">Recent Trades</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
              <th className="px-6 py-3">Side</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-b border-gray-800 text-sm last:border-0"
              >
                <td className="px-6 py-3">
                  <div
                    className={cn(
                      'flex items-center gap-2 font-medium',
                      trade.side === 'buy' ? 'text-green-400' : 'text-red-400'
                    )}
                  >
                    {trade.side === 'buy' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {trade.side.toUpperCase()}
                  </div>
                </td>
                <td className="px-6 py-3 font-medium text-white">
                  ${trade.price.toFixed(2)}
                </td>
                <td className="px-6 py-3 text-gray-300">{trade.amount}</td>
                <td className="px-6 py-3 text-gray-500">{trade.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}