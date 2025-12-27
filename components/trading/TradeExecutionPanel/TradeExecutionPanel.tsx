'use client';

import { useState } from 'react';
import { Zap, Shield, Clock, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tabs';
import { cn } from '@/lib/utils/cn';

interface TradeExecutionPanelProps {
  tokenPair: string;
  onTradeExecute: (trade: TradeOrder) => void;
}

interface TradeOrder {
  side: 'buy' | 'sell';
  amount: number;
  price: number;
  type: 'market' | 'limit';
  slippage: number;
}

export function TradeExecutionPanel({ tokenPair, onTradeExecute }: TradeExecutionPanelProps) {
  const [order, setOrder] = useState<TradeOrder>({
    side: 'buy',
    amount: 0,
    price: 3245.67,
    type: 'market',
    slippage: 0.5,
  });
  const [isExecuting, setIsExecuting] = useState(false);

  const executeTrade = () => {
    setIsExecuting(true);
    // Simulate trade execution
    setTimeout(() => {
      onTradeExecute(order);
      setIsExecuting(false);
      // Reset form
      setOrder(prev => ({ ...prev, amount: 0 }));
    }, 1000);
  };

  const quickAmounts = [0.1, 0.25, 0.5, 0.75, 1];

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Trade Execution</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Shield className="h-3 w-3" />
              Protected
            </Badge>
            <Button variant="ghost" size="sm" className="gap-2">
              <History className="h-4 w-4" />
              History
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="market" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="market">Market Order</TabsTrigger>
            <TabsTrigger value="limit">Limit Order</TabsTrigger>
          </TabsList>

          {/* Side Selection */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={order.side === 'buy' ? 'default' : 'outline'}
              className={cn(
                'py-6 text-lg font-semibold',
                order.side === 'buy'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'hover:bg-gray-800'
              )}
              onClick={() => setOrder({ ...order, side: 'buy' })}
            >
              Buy {tokenPair.split('/')[0]}
            </Button>
            <Button
              variant={order.side === 'sell' ? 'default' : 'outline'}
              className={cn(
                'py-6 text-lg font-semibold',
                order.side === 'sell'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'hover:bg-gray-800'
              )}
              onClick={() => setOrder({ ...order, side: 'sell' })}
            >
              Sell {tokenPair.split('/')[0]}
            </Button>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Amount</label>
              <span className="text-sm text-gray-400">
                Available: <span className="text-white">10.5 ETH</span>
              </span>
            </div>
            <div className="relative">
              <Input
                type="number"
                value={order.amount}
                onChange={(e) => setOrder({ ...order, amount: parseFloat(e.target.value) })}
                placeholder="0.00"
                className="pr-20 text-lg"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                ETH
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              {quickAmounts.map(amount => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setOrder({ ...order, amount })}
                >
                  {amount * 100}%
                </Button>
              ))}
            </div>
          </div>

          {/* Price Input (for limit orders) */}
          <TabsContent value="limit">
            <div>
              <label className="mb-2 block text-sm text-gray-400">Limit Price</label>
              <div className="relative">
                <Input
                  type="number"
                  value={order.price}
                  onChange={(e) => setOrder({ ...order, price: parseFloat(e.target.value) })}
                  placeholder="0.00"
                  className="pr-20"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  USD
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Slippage Settings */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Max Slippage</label>
              <span className="text-sm font-medium text-white">{order.slippage}%</span>
            </div>
            <Slider
              value={[order.slippage]}
              onValueChange={([value]) => setOrder({ ...order, slippage: value })}
              max={5}
              step={0.1}
              className="w-full"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>0.1%</span>
              <span>1%</span>
              <span>2%</span>
              <span>3%</span>
              <span>5%</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-3 rounded-lg bg-gray-800/50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Cost</span>
              <span className="font-medium text-white">
                ${(order.amount * order.price).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Fee (0.3%)</span>
              <span className="text-gray-400">
                ${(order.amount * order.price * 0.003).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Slippage Protection</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Estimated Execution</span>
              <span className="text-white">
                {order.side === 'buy' ? 'Buy' : 'Sell'} {order.amount.toFixed(4)} ETH
              </span>
            </div>
          </div>

          {/* Execute Button */}
          <Button
            onClick={executeTrade}
            disabled={isExecuting || order.amount <= 0}
            className={cn(
              'w-full py-6 text-lg font-semibold',
              order.side === 'buy'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
            )}
          >
            {isExecuting ? (
              <>
                <Clock className="mr-2 h-5 w-5 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                {order.side === 'buy' ? 'Buy Now' : 'Sell Now'}
              </>
            )}
          </Button>

          {/* Advanced Options */}
          <div className="border-t border-gray-800 pt-4">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between text-sm text-gray-400">
                Advanced Options
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm">
                    Post Only
                  </Button>
                  <Button variant="outline" size="sm">
                    Reduce Only
                  </Button>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Time in Force
                  </label>
                  <select className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white">
                    <option>Good Till Cancel (GTC)</option>
                    <option>Immediate or Cancel (IOC)</option>
                    <option>Fill or Kill (FOK)</option>
                  </select>
                </div>
              </div>
            </details>
          </div>
        </Tabs>
      </div>
    </div>
  );
}