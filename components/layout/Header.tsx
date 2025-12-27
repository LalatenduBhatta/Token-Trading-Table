'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Menu, Sun, Moon, Bell, Settings } from 'lucide-react';
import { 
  toggleSidebar, 
  setMobileMenuOpen,
  toggleTheme,
  useIsDarkMode,
  useUnreadNotificationsCount,
  openModal
} from '@/lib/store/hooks';
import { Button } from '@/components/ui/button';
import { NotificationBell } from '@/components/utils/NotificationBell';

export function Header() {
  const dispatch = useDispatch();
  const isDarkMode = useIsDarkMode();
  const unreadNotifications = useUnreadNotificationsCount();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleOpenSettings = () => {
    dispatch(openModal({ type: 'settings' }));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleSidebar())}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
            <span className="text-xl font-bold text-white">Axiom Trade</span>
            <span className="hidden rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400 md:inline">
              Live
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            className="hidden md:flex"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <NotificationBell />

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleOpenSettings}
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* Wallet connection */}
          <Button variant="default" className="hidden md:flex">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}