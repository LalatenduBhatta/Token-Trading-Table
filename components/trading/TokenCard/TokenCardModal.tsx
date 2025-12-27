'use client';

import { useEffect } from 'react';
import { X, ArrowUpRight, BarChart3, Info } from 'lucide-react';
import { Token } from '@/types/token';
import { Button } from '@/components/ui/button';
import { TokenCard } from './TokenCard';
import { TokenChart } from '@/components/trading/TokenChart/TokenChart';
import { TradeForm } from '@/components/trading/TradeForm/TradeForm';
import { OrderBook } from '@/components/trading/OrderBook/OrderBook';
import { motion, AnimatePresence } from 'framer-motion';

interface TokenCardModalProps {
  token: Token;
  isOpen: boolean;
  onClose: () => void;
}

export function TokenCardModal({ token, isOpen, onClose }: TokenCardModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  const orderBookData = {
    bids: Array.from({ length: 10 }, (_, i) => ({
      price: token.price * (0.95 + i * 0.001),
      amount: Math.random() * 100,
      total: Math.random() * 100000,
      type: 'bid' as const,
    })),
    asks: Array.from({ length: 10 }, (_, i) => ({
      price: token.price * (1.05 - i * 0.001),
      amount: Math.random() * 100,
      total: Math.random() * 100000,
      type: 'ask' as const,
    })),
    spread: 0.25,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-4 inset-y-4 z-50 mx-auto overflow-hidden rounded-xl border border-gray-800 bg-gray-900 md:inset-8"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
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
                    <h2 className="text-lg font-semibold text-white">{token.pair}</h2>
                    <p className="text-sm text-gray-400">{token.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Advanced Chart
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Info className="h-4 w-4" />
                    Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto">
                <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                  {/* Left Panel */}
                  <div className="border-r border-gray-800">
                    <div className="p-6">
                      <TokenChart data={token.chartData} height={400} />
                    </div>
                    <div className="border-t border-gray-800 p-6">
                      <OrderBook {...orderBookData} />
                    </div>
                  </div>

                  {/* Right Panel */}
                  <div className="flex flex-col">
                    <div className="border-b border-gray-800 p-6">
                      <TradeForm
                        tokenPair={token.pair}
                        currentPrice={token.price}
                        balance={1000}
                      />
                    </div>
                    <div className="flex-1 overflow-auto p-6">
                      <TokenCard token={token} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-800 px-6 py-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-400">
                    <span>Powered by Axiom Trade</span>
                    <div className="h-4 w-px bg-gray-800" />
                    <span className="flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      <span className="text-green-400">LIVE</span>
                      <span className="text-gray-400">Updates every 1s</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                      Save Chart Layout
                    </Button>
                    <Button variant="ghost" size="sm">
                      Export Data
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}