'use client';

import { Loader2, BarChart3, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ProgressLoaderProps {
  progress?: number;
  message?: string;
  subMessage?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'chart' | 'trading';
  className?: string;
}

export function ProgressLoader({
  progress = 0,
  message = 'Loading data...',
  subMessage,
  showPercentage = true,
  size = 'md',
  variant = 'default',
  className,
}: ProgressLoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const iconSize = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const renderIcon = () => {
    switch (variant) {
      case 'chart':
        return <BarChart3 className={sizeClasses[size]} size={iconSize[size]} />;
      case 'trading':
        return <TrendingUp className={sizeClasses[size]} size={iconSize[size]} />;
      default:
        return <Loader2 className={cn(sizeClasses[size], 'animate-spin')} size={iconSize[size]} />;
    }
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-8', className)}>
      <div className="relative mb-4">
        {variant === 'default' && progress > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {Math.round(progress)}%
            </span>
          </div>
        )}
        {renderIcon()}
      </div>

      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold text-white">{message}</h3>
        {subMessage && (
          <p className="text-sm text-gray-400">{subMessage}</p>
        )}
      </div>

      {showPercentage && progress > 0 && (
        <div className="mt-6 w-full max-w-xs">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="font-medium text-white">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95 backdrop-blur-sm">
      <div className="text-center">
        <div className="relative mx-auto mb-6 h-24 w-24">
          <div className="absolute inset-0 rounded-full border-4 border-gray-800" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-transparent border-r-blue-500 border-b-transparent border-l-purple-600" />
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-white">Axiom Trade</h2>
        <p className="text-gray-400">Loading trading interface...</p>
        <div className="mt-8 inline-flex items-center gap-2 text-sm text-gray-500">
          <div className="h-2 w-2 animate-ping rounded-full bg-green-500" />
          <span>Connecting to WebSocket...</span>
        </div>
      </div>
    </div>
  );
}

export function DataStreamLoader() {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-3 w-3 animate-ping rounded-full bg-green-500" />
            <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div>
            <p className="font-medium text-white">Streaming market data</p>
            <p className="text-sm text-gray-400">Establishing real-time connection</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500 animation-delay-150" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500 animation-delay-300" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-2 w-full rounded-full bg-gray-800">
          <div className="h-full w-3/4 animate-pulse rounded-full bg-blue-500/50" />
        </div>
        <div className="h-2 w-full rounded-full bg-gray-800">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-500/50 animation-delay-200" />
        </div>
        <div className="h-2 w-full rounded-full bg-gray-800">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-blue-500/50 animation-delay-400" />
        </div>
      </div>
    </div>
  );
}