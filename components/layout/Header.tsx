'use client';

import { Search, User, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NotificationBell } from '@/components/utils/NotificationBell';
import { cn } from '@/lib/utils/cn';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side - Search */}
        <div className="flex flex-1 items-center gap-4">
          <div className="relative hidden flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search tokens, pairs, or addresses..."
              className="w-full pl-10 md:w-[300px] lg:w-[400px]"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden gap-2 sm:flex">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
          <Button variant="ghost" size="sm" className="sm:hidden">
            <Wallet className="h-4 w-4" />
          </Button>

          <NotificationBell />

          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 rounded-full"
          >
            <User className="h-4 w-4" />
          </Button>

          {/* Network Indicator */}
          <div className="hidden items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 sm:flex">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-white">Ethereum</span>
          </div>
        </div>
      </div>
    </header>
  );
}