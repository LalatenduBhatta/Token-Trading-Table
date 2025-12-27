'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';
import { ChartPoint } from '@/types/token';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { Clock, BarChart3, TrendingUp, Activity } from 'lucide-react';

interface TokenChartProps {
  data: ChartPoint[];
  height?: number;
  className?: string;
}

export function TokenChart({ data, height = 400, className }: TokenChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi>();
  const [timeframe, setTimeframe] = useState('1D');

  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#9CA3AF',
      },
      grid: {
        vertLines: { color: '#1F2937' },
        horzLines: { color: '#1F2937' },
      },
      width: chartContainerRef.current.clientWidth,
      height,
      rightPriceScale: {
        borderColor: '#374151',
      },
      timeScale: {
        borderColor: '#374151',
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: '#3B82F6',
          width: 1,
          style: 2,
        },
        horzLine: {
          color: '#3B82F6',
          width: 1,
          style: 2,
        },
      },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10B981',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#10B981',
      wickDownColor: '#EF4444',
    });

    // Convert data to candlestick format
    const formattedData = data.map((point, index) => ({
      time: point.time / 1000,
      open: point.value * (0.95 + Math.random() * 0.1),
      high: point.value * (1 + Math.random() * 0.05),
      low: point.value * (0.9 + Math.random() * 0.05),
      close: point.value,
    }));

    candlestickSeries.setData(formattedData);

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#3B82F6',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const volumeData = formattedData.map((candle) => ({
      time: candle.time,
      value: (candle.high - candle.low) * 1000,
      color: candle.close >= candle.open ? '#10B981' : '#EF4444',
    }));

    volumeSeries.setData(volumeData);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, height]);

  const timeframes = [
    { label: '1H', value: '1H' },
    { label: '4H', value: '4H' },
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
  ];

  const chartTypes = [
    { icon: BarChart3, label: 'Candles' },
    { icon: TrendingUp, label: 'Line' },
    { icon: Activity, label: 'Area' },
  ];

  return (
    <div className={cn('rounded-xl border border-gray-800 bg-gray-900', className)}>
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold text-white">ETH/USDT Chart</h3>
            <p className="text-sm text-gray-400">Real-time price movements</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-lg border border-gray-700">
              {chartTypes.map((type) => (
                <Button
                  key={type.label}
                  variant="ghost"
                  size="sm"
                  className="rounded-none border-0 text-gray-400 hover:text-white"
                >
                  <type.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            <div className="flex rounded-lg border border-gray-700 p-1">
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setTimeframe(tf.value)}
                  className={cn(
                    'rounded-md px-3 py-1 text-sm font-medium transition-colors',
                    timeframe === tf.value
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Indicators
            </Button>
          </div>
        </div>
      </div>

      <div ref={chartContainerRef} className="p-4" />

      <div className="border-t border-gray-800 px-6 py-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p className="text-sm text-gray-400">Current Price</p>
            <p className="text-lg font-semibold text-white">$3,245.67</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">24h High</p>
            <p className="text-lg font-semibold text-green-400">$3,289.43</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">24h Low</p>
            <p className="text-lg font-semibold text-red-400">$3,198.12</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">24h Volume</p>
            <p className="text-lg font-semibold text-white">$1.2B</p>
          </div>
        </div>
      </div>
    </div>
  );
}