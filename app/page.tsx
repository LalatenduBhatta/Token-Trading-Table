'use client';

import { Suspense } from 'react';
import { TokenTable } from '@/components/trading/TokenTable/TokenTable';
import { TokenTableSkeleton } from '@/components/trading/TokenTable/TokenTableSkeleton';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { TradingViewWidget } from '@/components/trading/TradingViewWidget/TradingViewWidget';
import { useResponsive } from '@/hooks/useResponsive';

export default function HomePage() {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Token Discovery
          </h1>
          <p className="text-sm text-gray-400">
            Real-time token prices, trends, and trading opportunities
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gray-900 px-4 py-2">
            <span className="text-sm font-medium text-gray-300">Total Tokens:</span>
            <span className="ml-2 text-lg font-bold text-white">1,248</span>
          </div>
          <div className="rounded-lg bg-blue-500/10 px-4 py-2">
            <span className="text-sm font-medium text-blue-400">24h Volume:</span>
            <span className="ml-2 text-lg font-bold text-white">$2.4B</span>
          </div>
        </div>
      </div>

      {/* Trading View Chart */}
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
        <TradingViewWidget />
      </div>

      {/* Token Table Section */}
      <ErrorBoundary>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
          <div className="border-b border-gray-800 px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-white">Token Pairs</h2>
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
                  Live Updates
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex rounded-lg bg-gray-800 p-1">
                  <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                    New Pairs
                  </button>
                  <button className="rounded-md px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">
                    Final Stretch
                  </button>
                  <button className="rounded-md px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">
                    Migrated
                  </button>
                </div>
                
                <select className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white">
                  <option>All Chains</option>
                  <option>Ethereum</option>
                  <option>Solana</option>
                  <option>Base</option>
                </select>
              </div>
            </div>
          </div>

          <Suspense fallback={<TokenTableSkeleton />}>
            <TokenTable />
          </Suspense>
        </div>
      </ErrorBoundary>

      {/* Mobile Responsive Info */}
      {isMobile && (
        <div className="fixed bottom-4 left-4 right-4 rounded-lg bg-gray-900 p-4 shadow-lg">
          <p className="text-center text-sm text-gray-400">
            Swipe horizontally to view all columns
          </p>
        </div>
      )}
    </div>
  );
}