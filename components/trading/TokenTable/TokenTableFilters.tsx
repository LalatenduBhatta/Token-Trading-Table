'use client';

import { Filter, Star, TrendingUp, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown';
import { useState } from 'react';

interface TokenTableFiltersProps {
  onFilterChange: (filters: any) => void;
  activeFilters: {
    category: string;
    chain: string[];
    minLiquidity: number;
    maxAge: number;
    tags: string[];
  };
}

export function TokenTableFilters({ onFilterChange, activeFilters }: TokenTableFiltersProps) {
  const [showOnlyWatched, setShowOnlyWatched] = useState(false);
  const [sortBy, setSortBy] = useState('volume');

  const categories = [
    { id: 'new', label: 'New Pairs', count: 42 },
    { id: 'final-stretch', label: 'Final Stretch', count: 28 },
    { id: 'migrated', label: 'Migrated', count: 15 },
  ];

  const chains = [
    { id: 'ethereum', label: 'Ethereum', color: 'bg-purple-500' },
    { id: 'solana', label: 'Solana', color: 'bg-pink-500' },
    { id: 'base', label: 'Base', color: 'bg-blue-500' },
    { id: 'arbitrum', label: 'Arbitrum', color: 'bg-cyan-500' },
    { id: 'polygon', label: 'Polygon', color: 'bg-violet-500' },
  ];

  const tags = ['DeFi', 'NFT', 'GameFi', 'AI', 'Meme', 'RWA', 'L2', 'Gaming'];

  const handleCategorySelect = (categoryId: string) => {
    onFilterChange({
      ...activeFilters,
      category: activeFilters.category === categoryId ? 'all' : categoryId,
    });
  };

  const handleChainToggle = (chainId: string) => {
    const newChains = activeFilters.chain.includes(chainId)
      ? activeFilters.chain.filter(c => c !== chainId)
      : [...activeFilters.chain, chainId];
    onFilterChange({ ...activeFilters, chain: newChains });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-gray-800">
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={showOnlyWatched ? "default" : "outline"}
          size="sm"
          onClick={() => setShowOnlyWatched(!showOnlyWatched)}
          className="gap-2"
        >
          <Star className="h-4 w-4" />
          Watchlist
        </Button>

        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeFilters.category === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategorySelect(category.id)}
            className="gap-2"
          >
            {category.label}
            <Badge variant="secondary">{category.count}</Badge>
          </Button>
        ))}

        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Advanced Filters Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
            {Object.values(activeFilters).some(filter => 
              Array.isArray(filter) ? filter.length > 0 : filter !== 'all' && filter !== 0
            ) && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0">!</Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <DropdownMenuLabel>Chain Filters</DropdownMenuLabel>
          <DropdownMenuGroup>
            {chains.map(chain => (
              <DropdownMenuItem
                key={chain.id}
                onClick={() => handleChainToggle(chain.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${chain.color}`} />
                  <span>{chain.label}</span>
                </div>
                {activeFilters.chain.includes(chain.id) && (
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Minimum Liquidity</DropdownMenuLabel>
          <div className="px-2 py-1">
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={activeFilters.minLiquidity}
              onChange={(e) => onFilterChange({
                ...activeFilters,
                minLiquidity: parseInt(e.target.value)
              })}
              className="w-full"
            />
            <div className="mt-1 text-xs text-gray-500">
              ${activeFilters.minLiquidity.toLocaleString()}+
            </div>
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Token Tags</DropdownMenuLabel>
          <div className="flex flex-wrap gap-2 p-2">
            {tags.map(tag => (
              <Badge
                key={tag}
                variant={activeFilters.tags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  const newTags = activeFilters.tags.includes(tag)
                    ? activeFilters.tags.filter(t => t !== tag)
                    : [...activeFilters.tags, tag];
                  onFilterChange({ ...activeFilters, tags: newTags });
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Sort by: {sortBy === 'volume' ? 'Volume' : 'Liquidity'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setSortBy('volume')}>
            24h Volume
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy('liquidity')}>
            Liquidity
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy('price')}>
            Price Change
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy('age')}>
            Age
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}