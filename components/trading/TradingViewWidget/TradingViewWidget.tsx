'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Settings, Maximize2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/common/Tabs';

interface TradingViewWidgetProps {
  symbol?: string;
  interval?: string;
  theme?: 'light' | 'dark';
  className?: string;
}

export function TradingViewWidget({
  symbol = 'ETHUSDT',
  interval = '60',
  theme = 'dark',
  className,
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [widget, setWidget] = useState<any>(null);
  const [activeTimeframe, setActiveTimeframe] = useState('1H');

  const timeframes = [
    { value: '1m', label: '1m' },
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '1H', label: '1H' },
    { value: '4H', label: '4H' },
    { value: '1D', label: '1D' },
    { value: '1W', label: '1W' },
  ];

  const chartTypes = [
    { value: 'line', label: 'Line' },
    { value: 'candles', label: 'Candles' },
    { value: 'bars', label: 'Bars' },
    { value: 'area', label: 'Area' },
  ];

  useEffect(() => {
    setIsLoading(true);

    // Simulate TradingView widget loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In production, you would initialize the actual TradingView widget here
      // Example:
      // const tvWidget = new TradingView.widget({
      //   container: containerRef.current,
      //   symbol: 'BINANCE:' + symbol,
      //   interval: interval,
      //   theme: theme,
      //   ...otherOptions
      // });
      // setWidget(tvWidget);
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (widget) {
        // widget.remove();
      }
    };
  }, [symbol, interval, theme]);

  return (
    <div className={className}>
      {/* Widget Header */}
      <div className="flex flex-col gap-4 border-b border-gray-800 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
            <div>
              <h3 className="font-semibold text-white">{symbol}</h3>
              <p className="text-sm text-gray-400">Binance</p>
            </div>
          </div>

          <div className="hidden sm:block">
            <Tabs
              value={activeTimeframe}
              onValueChange={setActiveTimeframe}
              className="w-fit"
            >
              <TabsList>
                {timeframes.map(tf => (
                  <TabsTrigger key={tf.value} value={tf.value}>
                    {tf.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-lg border border-gray-700 sm:flex">
            {chartTypes.map(type => (
              <Button
                key={type.value}
                variant="ghost"
                size="sm"
                className="rounded-none border-0 text-gray-400 hover:text-white"
              >
                {type.label}
              </Button>
            ))}
          </div>

          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Maximize2 className="h-4 w-4" />
            Full Screen
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Widget Container */}
      <div className="relative h-[500px] overflow-hidden">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-500" />
              <p className="mt-2 text-sm text-gray-400">Loading chart data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Mock Chart */}
            <div ref={containerRef} className="h-full w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-500/20">
                    <div className="flex h-full items-center justify-center">
                      📈
                    </div>
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-white">
                    TradingView Chart
                  </h4>
                  <p className="text-gray-400">
                    In production, this would show real-time TradingView charts
                  </p>
                  <p className="mt-2 text-sm text-blue-400">
                    Symbol: {symbol} | Interval: {interval} | Theme: {theme}
                  </p>
                </div>
              </div>
              
              {/* Mock price line */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <path
                    d="M0,50 Q20,40 40,60 T80,30 T100,70"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Indicators Panel */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-900/90 px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Current Price</p>
                    <p className="text-lg font-bold text-white">$3,245.67</p>
                  </div>
                  <div className="h-8 w-px bg-gray-800" />
                  <div>
                    <p className="text-xs text-gray-400">24h Change</p>
                    <p className="text-lg font-bold text-green-400">+2.34%</p>
                  </div>
                  <div className="h-8 w-px bg-gray-800" />
                  <div>
                    <p className="text-xs text-gray-400">24h Volume</p>
                    <p className="text-lg font-bold text-white">$1.2B</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Indicators:</span>
                  <div className="flex gap-1">
                    {['RSI', 'MACD', 'BB', 'VWAP'].map(indicator => (
                      <span
                        key={indicator}
                        className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300"
                      >
                        {indicator}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile timeframe selector */}
      <div className="sm:hidden">
        <div className="overflow-x-auto border-t border-gray-800 px-4 py-3">
          <div className="flex gap-2">
            {timeframes.map(tf => (
              <button
                key={tf.value}
                onClick={() => setActiveTimeframe(tf.value)}
                className={`
                  whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium
                  ${activeTimeframe === tf.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                  }
                `}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}