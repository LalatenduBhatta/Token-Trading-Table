'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils/cn';

interface MiniSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
}

export function MiniSparkline({
  data,
  width = 60,
  height = 20,
  strokeWidth = 2,
  className,
}: MiniSparklineProps) {
  const { path, color, gradientId } = useMemo(() => {
    if (!data.length) return { path: '', color: '#9CA3AF', gradientId: 'gradient-neutral' };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    const isPositive = data[data.length - 1] > data[0];
    const color = isPositive ? '#10B981' : '#EF4444';
    const gradientId = `gradient-${isPositive ? 'positive' : 'negative'}`;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range || 0) * height;
      return `${x},${y}`;
    });

    const path = `M ${points.join(' L ')}`;

    return { path, color, gradientId };
  }, [data, width, height]);

  if (!data.length) {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <span className="text-xs text-gray-500">No data</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Background area */}
        <path
          d={`${path} L ${width},${height} L 0,${height} Z`}
          fill={`url(#${gradientId})`}
        />
        
        {/* Line */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Start point */}
        <circle
          cx="0"
          cy={height - ((data[0] - Math.min(...data)) / (Math.max(...data) - Math.min(...data) || 1)) * height}
          r="1.5"
          fill={color}
        />
        
        {/* End point */}
        <circle
          cx={width}
          cy={height - ((data[data.length - 1] - Math.min(...data)) / (Math.max(...data) - Math.min(...data) || 1)) * height}
          r="1.5"
          fill={color}
        />
      </svg>
    </div>
  );
}