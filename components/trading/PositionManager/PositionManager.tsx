'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown';
import { cn } from '@/lib/utils/cn';

interface Position {
  id: string;
  pair: string;
  side: 'long' | 'short';
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
  liquidationPrice: number;
  margin: number;
  leverage: number;
  timestamp: Date;
}

export function PositionManager() {
  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      pair: 'ETH/USDT',
      side: 'long',
      amount: 2.5,
      entryPrice: 3100.50,
      currentPrice: 3245.67,
      pnl: 362.93,
      pnlPercentage: 4.68,
      liquidationPrice: 2900.00,
      margin: 1550.25,
      leverage: 5,
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: '2',
      pair: 'SOL/USDT',
      side: 'short',
      amount: 50,
      entryPrice: 102.30,
      currentPrice: 98.45,
      pnl: 192.5,
      pnlPercentage: 3.76,
      liquidationPrice: 118.00,
      margin: 1023.00,
      leverage: 3,
      timestamp: new Date(Date.now() - 43200000),
    },
  ]);

  const totalPnl = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const totalMargin = positions.reduce((sum, pos) => sum + pos.margin, 0);

  const closePosition = (id: string) => {
    setPositions(positions.filter(pos => pos.id !== id));
  };

  const addMargin = (id: string, amount: number) => {
    setPositions(positions.map(pos => 
      pos.id === id ? { ...pos, margin: pos.margin + amount } : pos
    ));
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">Open Positions</h3>
            <p className="text-sm text-gray-400">Manage your active trades</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Total P&L</p>
              <p className={cn(
                'text-xl font-bold',
                totalPnl >= 0 ? 'text-green-400' : 'text-red-400'
              )}>
                ${totalPnl.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Margin</p>
              <p className="text-xl font-bold text-white">${totalMargin.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Positions List */}
      <div className="divide-y divide-gray-800">
        {positions.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-800">
              <DollarSign className="mx-auto h-6 w-6 translate-y-3 text-gray-400" />
            </div>
            <h4 className="mb-2 text-lg font-semibold text-white">No Open Positions</h4>
            <p className="text-gray-400">Start trading to see your positions here</p>
          </div>
        ) : (
          positions.map(position => {
            const distanceToLiquidation = ((position.currentPrice - position.liquidationPrice) / position.currentPrice) * 100;
            const isLiquidationClose = distanceToLiquidation < 5;

            return (
              <div key={position.id} className="px-6 py-4 hover:bg-gray-800/30">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  {/* Position Info */}
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-lg',
                      position.side === 'long' ? 'bg-green-500/20' : 'bg-red-500/20'
                    )}>
                      {position.side === 'long' ? (
                        <TrendingUp className="h-6 w-6 text-green-400" />
                      ) : (
                        <TrendingDown className="h-6 w-6 text-red-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-white">{position.pair}</h4>
                        <Badge
                          variant={position.side === 'long' ? 'success' : 'destructive'}
                          className="uppercase"
                        >
                          {position.side}
                        </Badge>
                        <Badge variant="outline">{position.leverage}x</Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm md:flex md:gap-6">
                        <div>
                          <p className="text-gray-400">Size</p>
                          <p className="font-medium text-white">{position.amount} {position.pair.split('/')[0]}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Entry Price</p>
                          <p className="font-medium text-white">${position.entryPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Current Price</p>
                          <p className="font-medium text-white">${position.currentPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Margin</p>
                          <p className="font-medium text-white">${position.margin.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* P&L and Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className={cn(
                        'text-2xl font-bold',
                        position.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                      )}>
                        ${position.pnl.toFixed(2)}
                      </p>
                      <p className={cn(
                        'text-sm font-medium',
                        position.pnlPercentage >= 0 ? 'text-green-400' : 'text-red-400'
                      )}>
                        {position.pnlPercentage >= 0 ? '+' : ''}{position.pnlPercentage.toFixed(2)}%
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {isLiquidationClose && (
                        <Badge variant="warning" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Close to Liq.
                        </Badge>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => closePosition(position.id)}>
                            Close Position
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => addMargin(position.id, 100)}>
                            Add Margin
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Reduce Position
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            Set Stop Loss
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Set Take Profit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        variant={position.pnl >= 0 ? "default" : "destructive"}
                        size="sm"
                        onClick={() => closePosition(position.id)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Liquidation Risk Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Liquidation Risk</span>
                    <span className={cn(
                      'font-medium',
                      isLiquidationClose ? 'text-yellow-400' : 'text-gray-400'
                    )}>
                      ${position.liquidationPrice.toFixed(2)} ({distanceToLiquidation.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress
                    value={100 - Math.min(distanceToLiquidation, 100)}
                    className={cn(
                      'mt-2 h-2',
                      isLiquidationClose ? 'bg-yellow-500/20' : 'bg-gray-800'
                    )}
                    indicatorClassName={cn(
                      isLiquidationClose ? 'bg-yellow-500' : 'bg-gray-600'
                    )}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {positions.length > 0 && (
        <div className="border-t border-gray-800 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              Total: {positions.length} position{positions.length !== 1 ? 's' : ''}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Close All Profitable
              </Button>
              <Button variant="outline" size="sm">
                Hedge Positions
              </Button>
              <Button variant="outline" size="sm">
                Export Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}