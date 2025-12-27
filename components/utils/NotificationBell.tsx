'use client';

import { useState } from 'react';
import { Bell, Check } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Price Alert',
      message: 'ETH reached $3,200 target price',
      timestamp: '2 min ago',
      read: false,
      type: 'success',
    },
    {
      id: '2',
      title: 'New Pair Listed',
      message: 'SOL/USDC pair now available for trading',
      timestamp: '10 min ago',
      read: false,
      type: 'info',
    },
    {
      id: '3',
      title: 'Liquidity Warning',
      message: 'Low liquidity detected on WBTC/USDT',
      timestamp: '1 hour ago',
      read: true,
      type: 'warning',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-auto p-0 text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-2 py-6 text-center text-sm text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start gap-1 p-3"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={getNotificationColor(notification.type)}>
                      ●
                    </span>
                    <span className="font-medium text-white">
                      {notification.title}
                    </span>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {notification.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{notification.message}</p>
                {!notification.read && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-blue-400">
                    <Check className="h-3 w-3" />
                    Click to mark as read
                  </div>
                )}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-center text-sm text-gray-400">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}