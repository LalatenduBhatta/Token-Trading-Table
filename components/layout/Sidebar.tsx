'use client';

import { useState } from 'react';
import {
  Home,
  TrendingUp,
  Star,
  History,
  Bell,
  Settings,
  Wallet,
  BarChart3,
  Users,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', icon: Home, href: '#', current: true },
  { name: 'Discover', icon: TrendingUp, href: '#', current: false },
  { name: 'Watchlist', icon: Star, href: '#', current: false },
  { name: 'Portfolio', icon: Wallet, href: '#', current: false },
  { name: 'History', icon: History, href: '#', current: false },
  { name: 'Social', icon: Users, href: '#', current: false },
  { name: 'Analytics', icon: BarChart3, href: '#', current: false },
  { name: 'Alerts', icon: Bell, href: '#', current: false },
  { name: 'Settings', icon: Settings, href: '#', current: false },
  { name: 'Help', icon: HelpCircle, href: '#', current: false },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {collapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setCollapsed(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-800 bg-gray-900 transition-transform lg:relative lg:translate-x-0',
          collapsed ? '-translate-x-full' : 'translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600" />
              <span className="text-xl font-bold text-white">Axiom Trade</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(true)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  item.current
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* User profile */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500" />
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">
                  crypto_trader_42
                </p>
                <p className="truncate text-xs text-gray-400">Premium Account</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-40 lg:hidden"
        onClick={() => setCollapsed(false)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}