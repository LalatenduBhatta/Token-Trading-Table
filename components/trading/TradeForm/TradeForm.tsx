'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Percent, Maximize2, Minus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface TradeFormProps {
  tokenPair: string;
  currentPrice: number;
  balance: number;
  className?: string;
}

export function TradeForm({ tokenPair, currentPrice, balance, className }: TradeFormProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState(currentPrice.toString());
  const [percentage, setPercentage] = useState(0);

  const handlePercentageChange = (value: number) => {
    setPercentage(value);
    const calculatedAmount = (balance * value) / 100;
    setAmount(calculatedAmount.toFixed(4));
  };

  const totalCost = parseFloat(amount) * parseFloat(price) || 0;

  return (
    <div className={cn('rounded-xl border border-gray-800 bg-gray-900', className)}>
      <div className="border-b border-gray-800 px-6 py-4">
        <h3 className="font-semibold text-white">Trade {tokenPair}</h3>
      </div>

      <Tabs
        defaultValue="buy"
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as 'buy' | 'sell')}
        className="p-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="buy"
            className={cn(
              'data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400'
            )}
          >
            Buy
          </TabsTrigger>
          <TabsTrigger
            value="sell"
            className={cn(
              'data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400'
            )}
          >
            Sell
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Amount</label>
              <span className="text-sm text-gray-400">
                Balance: <span className="text-white">{balance.toFixed(4)}</span>
              </span>
            </div>
            <div className="relative">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="pr-20"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                ETH
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">Price</label>
            <div className="relative">
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="pr-20"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                USD
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Percentage: {percentage}%
            </label>
            <div className="space-y-2">
              <Slider
                value={[percentage]}
                onValueChange={([value]) => handlePercentageChange(value)}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex gap-2">
                {[25, 50, 75, 100].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handlePercentageChange(value)}
                    className="flex-1"
                  >
                    {value}%
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-lg bg-gray-800/50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Cost</span>
              <span className="font-medium text-white">
                ${totalCost.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Fee (0.3%)</span>
              <span className="text-gray-400">
                ${(totalCost * 0.003).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">You Receive</span>
              <span className="font-medium text-white">
                {((totalCost - totalCost * 0.003) / parseFloat(price) || 0).toFixed(4)} ETH
              </span>
            </div>
          </div>

          <Button
            type="button"
            className={cn(
              'w-full py-6 text-base font-semibold',
              activeTab === 'buy'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            )}
          >
            {activeTab === 'buy' ? 'Buy ETH' : 'Sell ETH'}
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setPrice((currentPrice * 0.99).toFixed(2))}
            >
              <Minus className="mr-2 h-4 w-4" />
              -1%
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setPrice(currentPrice.toString())}
            >
              <Percent className="mr-2 h-4 w-4" />
              Market
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setPrice((currentPrice * 1.01).toFixed(2))}
            >
              <Maximize2 className="mr-2 h-4 w-4" />
              +1%
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
}