'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: {
    category?: string;
    chain?: string;
    minLiquidity?: number;
  }) => void;
  className?: string;
}

export function SearchBar({ onSearch, onFilterChange, className }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    chain: 'all',
    minLiquidity: 10000,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={className}>
      <div className="flex flex-col gap-4 md:flex-row">
        <form
          onSubmit={handleSearch}
          className="relative flex-1"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="search"
            placeholder="Search tokens by name, symbol, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </form>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <DropdownMenuGroup>
                {['All', 'New Pairs', 'Final Stretch', 'Migrated'].map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => handleFilterChange('category', category.toLowerCase())}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Chain</DropdownMenuLabel>
              <DropdownMenuGroup>
                {['All', 'Ethereum', 'Solana', 'Base', 'Arbitrum'].map((chain) => (
                  <DropdownMenuItem
                    key={chain}
                    onClick={() => handleFilterChange('chain', chain.toLowerCase())}
                  >
                    {chain}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Min Liquidity</DropdownMenuLabel>
              <div className="p-2">
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={filters.minLiquidity}
                  onChange={(e) => handleFilterChange('minLiquidity', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="mt-1 text-xs text-gray-500">
                  ${filters.minLiquidity.toLocaleString()}+
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={() => onSearch('')}>
            Reset
          </Button>
        </div>
      </div>

      {searchQuery && (
        <div className="mt-2 text-sm text-gray-400">
          Showing results for: <span className="text-white">{searchQuery}</span>
        </div>
      )}
    </div>
  );
}