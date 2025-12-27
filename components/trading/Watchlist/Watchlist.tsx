'use client';

import { useState } from 'react';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface WatchlistToken {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  isWatched: boolean;
}

export function Watchlist() {
  const [tokens, setTokens] = useState<WatchlistToken[]>([
    {
      id: '1',
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3245.67,
      change24h: 2.34,
      isWatched: true,
    },
    {
      id: '2',
      symbol: 'SOL',
      name: 'Solana',
      price: 98.45,
      change24h: -1.23,
      isWatched: true,
    },
    {
      id: '3',
      symbol: 'BNB',
      name: 'Binance Coin',
      price: 312.56,
      change24h: 0.89,
      isWatched: true,
    },
    {
      id: '4',
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.45,
      change24h: 3.21,
      isWatched: true,
    },
  ]);

  const toggleWatch = (id: string) => {
    setTokens(
      tokens.map((token) =>
        token.id === id ? { ...token, isWatched: !token.isWatched } : token
      )
    );
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
        <h3 className="font-semibold text-white">Your Watchlist</h3>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </div>
      <div className="divide-y divide-gray-800">
        {tokens
          .filter((token) => token.isWatched)
          .map((token) => (
            <div
              key={token.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-800/30"
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleWatch(token.id)}
                >
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </Button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">
                      {token.symbol}
                    </span>
                    <span className="text-sm text-gray-400">{token.name}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-lg font-bold text-white">
                      ${token.price.toFixed(2)}
                    </span>
                    <span
                      className={cn(
                        'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                        token.change24h >= 0
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      )}
                    >
                      {token.change24h >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(token.change24h).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Trade
              </Button>
            </div>
          ))}
      </div>
      {tokens.filter((t) => t.isWatched).length === 0 && (
        <div className="px-6 py-12 text-center">
          <Star className="mx-auto h-12 w-12 text-gray-600" />
          <p className="mt-4 text-gray-400">No tokens in watchlist</p>
          <Button variant="outline" className="mt-4">
            Add Tokens
          </Button>
        </div>
      )}
    </div>
  );
}