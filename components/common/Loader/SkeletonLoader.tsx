'use client';

import { cn } from '@/lib/utils/cn';

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
  height?: string | number;
  width?: string | number;
  circle?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  animation?: 'pulse' | 'wave' | 'none';
}

export function SkeletonLoader({
  className,
  count = 1,
  height = '1rem',
  width = '100%',
  circle = false,
  rounded = 'md',
  animation = 'wave',
}: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const roundedClass = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }[rounded];

  const animationClass = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  }[animation];

  return (
    <>
      {skeletons.map((key) => (
        <div
          key={key}
          className={cn(
            'bg-gray-800',
            roundedClass,
            animationClass,
            circle ? 'rounded-full' : '',
            className
          )}
          style={{
            height: circle ? width : height,
            width,
          }}
        />
      ))}
    </>
  );
}

// Pre-configured skeleton components
export function TableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-4">
      {/* Header */}
      <div className="flex space-x-4">
        <div className="h-4 w-1/4 rounded bg-gray-800" />
        <div className="h-4 w-1/4 rounded bg-gray-800" />
        <div className="h-4 w-1/4 rounded bg-gray-800" />
        <div className="h-4 w-1/4 rounded bg-gray-800" />
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="h-12 w-1/4 rounded bg-gray-800" />
          <div className="h-12 w-1/4 rounded bg-gray-800" />
          <div className="h-12 w-1/4 rounded bg-gray-800" />
          <div className="h-12 w-1/4 rounded bg-gray-800" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: cards }, (_, i) => (
        <div key={i} className="animate-pulse rounded-lg border border-gray-800 bg-gray-900 p-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-800" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-800" />
              <div className="h-3 w-1/2 rounded bg-gray-800" />
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-3 w-full rounded bg-gray-800" />
            <div className="h-3 w-5/6 rounded bg-gray-800" />
            <div className="h-3 w-4/6 rounded bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex justify-between">
        <div className="h-8 w-32 rounded bg-gray-800" />
        <div className="h-8 w-48 rounded bg-gray-800" />
      </div>
      <div className="h-[400px] rounded-lg bg-gray-800" />
      <div className="grid grid-cols-4 gap-4">
        <div className="h-12 rounded bg-gray-800" />
        <div className="h-12 rounded bg-gray-800" />
        <div className="h-12 rounded bg-gray-800" />
        <div className="h-12 rounded bg-gray-800" />
      </div>
    </div>
  );
}