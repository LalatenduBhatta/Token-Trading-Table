'use client';

import { cn } from '@/lib/utils/cn';

interface ShimmerEffectProps {
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
  color?: 'light' | 'dark' | 'blue' | 'green';
}

export function ShimmerEffect({
  className,
  speed = 'normal',
  color = 'light',
}: ShimmerEffectProps) {
  const speedClass = {
    slow: 'animation-duration-2s',
    normal: 'animation-duration-1s',
    fast: 'animation-duration-0.5s',
  }[speed];

  const colorClass = {
    light: 'from-gray-800 via-gray-700 to-gray-800',
    dark: 'from-gray-900 via-gray-800 to-gray-900',
    blue: 'from-blue-900/50 via-blue-800/50 to-blue-900/50',
    green: 'from-green-900/50 via-green-800/50 to-green-900/50',
  }[color];

  return (
    <div
      className={cn(
        'animate-shimmer bg-gradient-to-r',
        colorClass,
        speedClass,
        className
      )}
    />
  );
}

export function ShimmerCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-800">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <ShimmerEffect className="h-4 w-32 rounded" />
            <ShimmerEffect className="h-3 w-24 rounded" />
          </div>
          <ShimmerEffect className="h-12 w-12 rounded-full" />
        </div>
        <div className="mt-6 space-y-2">
          <ShimmerEffect className="h-3 w-full rounded" />
          <ShimmerEffect className="h-3 w-5/6 rounded" />
          <ShimmerEffect className="h-3 w-4/6 rounded" />
        </div>
      </div>
      <div className="border-t border-gray-800 p-4">
        <ShimmerEffect className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function ShimmerTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-800">
      <div className="border-b border-gray-800 p-4">
        <div className="flex space-x-4">
          <ShimmerEffect className="h-4 w-24 rounded" />
          <ShimmerEffect className="h-4 w-24 rounded" />
          <ShimmerEffect className="h-4 w-24 rounded" />
          <ShimmerEffect className="h-4 w-24 rounded" />
        </div>
      </div>
      <div className="divide-y divide-gray-800">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShimmerEffect className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <ShimmerEffect className="h-3 w-32 rounded" />
                  <ShimmerEffect className="h-2 w-24 rounded" />
                </div>
              </div>
              <div className="flex space-x-6">
                <ShimmerEffect className="h-4 w-20 rounded" />
                <ShimmerEffect className="h-4 w-16 rounded" />
                <ShimmerEffect className="h-4 w-12 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}