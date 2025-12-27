'use client';

import { useState } from 'react';
import { Token } from '@/types/token';
import { Star, ExternalLink, Copy, Share2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TokenChart } from '@/components/trading/TokenChart/TokenChart';
import { PriceIndicator } from '@/components/trading/PriceIndicator/PriceIndicator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tabs';
import { cn } from '@/lib/utils/cn';

interface TokenCardProps {
  token: Token;
  className?: string;
}

export function TokenCard({ token, className }: TokenCardProps) {
  const [isWatched, setIsWatched] = useState(token.isWatched);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('rounded-xl border border-gray-800 bg-gray-900', className)}>
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex -space-x-2">
              {token.icons.map((icon, index) => (
                <img
                  key={index}
                  src={icon}
                  alt={`${token.name} icon`}
                  className="h-12 w-12 rounded-full border-2 border-gray-900"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">{token.pair}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{token.chain}</Badge>
                  {token.isNew && (
                    <Badge className="bg-green-500/20 text-green-400">NEW</Badge>
                  )}
                  {token.category === 'migrated' && (
                    <Badge className="bg-purple-500/20 text-purple-400">MIGRATED</Badge>
                  )}
                </div>
              </div>
              <p className="mt-1 text-gray-400">{token.name}</p>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <span>Age:</span>
                  <span className="text-white">{token.age}</span>
                </div>
                <div className="h-4 w-px bg-gray-800" />
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <span>Market Cap:</span>
                  <span className="text-white">
                    ${(token.liquidity * 2.5).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsWatched(!isWatched)}
            >
              <Star className={cn(
                'h-5 w-5',
                isWatched ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
              )} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="default">
              Trade Now
            </Button>
          </div>
        </div>
      </div>

      {/* Price & Stats */}
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h4 className="mb-4 text-sm font-medium text-gray-400">Current Price</h4>
            <PriceIndicator price={token.price} change24h={token.change24h} />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">24h High</span>
              <span className="font-medium text-green-400">
                ${(token.price * 1.05).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">24h Low</span>
              <span className="font-medium text-red-400">
                ${(token.price * 0.95).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">24h Volume</span>
              <span className="font-medium text-white">
                ${token.volume24h.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Liquidity</span>
              <span className="font-medium text-white">
                ${token.liquidity.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Mini Chart */}
        <div className="h-full min-h-[200px] rounded-lg bg-gray-800/50 p-4">
          <TokenChart data={token.chartData} height={180} />
        </div>
      </div>

      {/* Contract & Links */}
      <div className="border-t border-gray-800 p-6">
        <h4 className="mb-4 text-sm font-medium text-gray-400">Contract & Links</h4>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2">
            <span className="text-sm text-gray-300">0x742d...c5a9</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard('0x742d...c5a9')}
              className="h-6 w-6 p-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Explorer
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Chart
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Report
          </Button>
        </div>
      </div>

      {/* Tags */}
      <div className="border-t border-gray-800 p-6">
        <h4 className="mb-4 text-sm font-medium text-gray-400">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {token.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}