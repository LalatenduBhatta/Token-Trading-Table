'use client';

import { useState, memo } from 'react';
import { Token } from '@/types/token';
import { TokenTableCell } from './TokenTableCell';
import { TokenCardModal } from '@/components/trading/TokenCard/TokenCardModal';
import { Tooltip } from '@/components/common/Tooltip';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils/formatters';

interface TokenTableRowProps {
  token: Token;
}

export const TokenTableRow = memo(function TokenTableRow({ token }: TokenTableRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <tr
        onClick={handleRowClick}
        className="group cursor-pointer border-b border-gray-800 bg-gray-900/50 transition-all duration-200 hover:bg-gray-800/50"
      >
        {/* Pair */}
        <TokenTableCell className="sticky left-0 z-10 bg-gray-900/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {token.icons.map((icon, index) => (
                <img
                  key={index}
                  src={icon}
                  alt="Token icon"
                  className="h-8 w-8 rounded-full border-2 border-gray-900"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">{token.pair}</span>
                {token.isNew && (
                  <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                    NEW
                  </span>
                )}
              </div>
              <Tooltip content={token.name}>
                <p className="text-sm text-gray-400">{token.name}</p>
              </Tooltip>
            </div>
          </div>
        </TokenTableCell>

        {/* Price */}
        <TokenTableCell>
          <div className="flex flex-col">
            <span className="font-semibold text-white">
              {formatCurrency(token.price)}
            </span>
            <span className={`text-xs ${token.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(token.priceChange)}
            </span>
          </div>
        </TokenTableCell>

        {/* 24h Change */}
        <TokenTableCell>
          <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
            token.change24h >= 0 
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {token.change24h >= 0 ? '↑' : '↓'}
            {formatPercentage(Math.abs(token.change24h))}
          </div>
        </TokenTableCell>

        {/* Volume */}
        <TokenTableCell>
          <div className="font-medium text-white">
            {formatCurrency(token.volume24h)}
          </div>
          <div className="text-xs text-gray-400">
            {formatNumber(token.trades24h)} trades
          </div>
        </TokenTableCell>

        {/* Liquidity */}
        <TokenTableCell>
          <div className="font-medium text-white">
            {formatCurrency(token.liquidity)}
          </div>
          <div className="h-1 w-full rounded-full bg-gray-800">
            <div 
              className="h-full rounded-full bg-blue-500"
              style={{ width: `${Math.min(token.liquidityScore * 100, 100)}%` }}
            />
          </div>
        </TokenTableCell>

        {/* Age */}
        <TokenTableCell>
          <div className="text-gray-300">
            {token.age}
          </div>
        </TokenTableCell>

        {/* Tags */}
        <TokenTableCell>
          <div className="flex flex-wrap gap-2">
            {token.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </TokenTableCell>

        {/* Actions */}
        <TokenTableCell className="pr-6">
          <div className="flex items-center justify-end gap-2">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Trade
            </button>
            <button className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800">
              Chart
            </button>
          </div>
        </TokenTableCell>
      </tr>

      {/* Modal */}
      <TokenCardModal
        token={token}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
});