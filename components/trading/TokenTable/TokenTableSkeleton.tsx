'use client';

export function TokenTableSkeleton() {
  const rows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="overflow-hidden">
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="flex border-b border-gray-800 bg-gray-900 px-6 py-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex-1 px-2">
              <div className="h-4 w-24 rounded bg-gray-800" />
            </div>
          ))}
        </div>

        {/* Row Skeletons */}
        <div className="divide-y divide-gray-800">
          {rows.map((row) => (
            <div key={row} className="flex items-center px-6 py-4">
              {/* Pair */}
              <div className="flex w-48 items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-800" />
                  <div className="h-8 w-8 rounded-full bg-gray-800" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 rounded bg-gray-800" />
                  <div className="h-2 w-24 rounded bg-gray-800" />
                </div>
              </div>

              {/* Price */}
              <div className="w-32 space-y-2">
                <div className="h-3 w-20 rounded bg-gray-800" />
                <div className="h-2 w-16 rounded bg-gray-800" />
              </div>

              {/* 24h Change */}
              <div className="w-24">
                <div className="h-6 w-16 rounded-full bg-gray-800" />
              </div>

              {/* Volume */}
              <div className="w-40 space-y-2">
                <div className="h-3 w-24 rounded bg-gray-800" />
                <div className="h-2 w-20 rounded bg-gray-800" />
              </div>

              {/* Liquidity */}
              <div className="w-40 space-y-2">
                <div className="h-3 w-28 rounded bg-gray-800" />
                <div className="h-1 w-full rounded-full bg-gray-800">
                  <div className="h-full w-1/2 rounded-full bg-gray-700" />
                </div>
              </div>

              {/* Age */}
              <div className="w-24">
                <div className="h-3 w-16 rounded bg-gray-800" />
              </div>

              {/* Tags */}
              <div className="w-48">
                <div className="flex space-x-2">
                  <div className="h-6 w-16 rounded-full bg-gray-800" />
                  <div className="h-6 w-20 rounded-full bg-gray-800" />
                </div>
              </div>

              {/* Actions */}
              <div className="w-32">
                <div className="flex space-x-2">
                  <div className="h-9 w-16 rounded-lg bg-gray-800" />
                  <div className="h-9 w-16 rounded-lg bg-gray-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}