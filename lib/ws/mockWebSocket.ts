'use client';

export class MockWebSocket {
  private url: string;
  private listeners: Map<string, Function[]>;
  private isConnected: boolean;
  private reconnectAttempts: number;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private messageInterval: NodeJS.Timeout | null = null;

  constructor(url: string) {
    this.url = url;
    this.listeners = new Map();
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.connect();
  }

  connect() {
    // Simulate connection delay
    setTimeout(() => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.emit('open', null);
      
      // Start sending mock data
      this.startMockDataStream();
      
      // Simulate connection status updates
      this.simulateConnectionEvents();
    }, 500);
  }

  private startMockDataStream() {
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }

    this.messageInterval = setInterval(() => {
      if (this.isConnected) {
        // Generate mock price updates for multiple tokens
        const updates = this.generatePriceUpdates();
        updates.forEach(update => {
          this.emit('message', {
            data: JSON.stringify(update)
          });
        });

        // Occasionally send trade execution events
        if (Math.random() > 0.7) {
          this.emit('message', {
            data: JSON.stringify(this.generateTradeExecution())
          });
        }

        // Send order book updates
        if (Math.random() > 0.8) {
          this.emit('message', {
            data: JSON.stringify(this.generateOrderBookUpdate())
          });
        }
      }
    }, 1000); // Update every second
  }

  private generatePriceUpdates() {
    const tokens = [
      'ETH/USDT', 'BTC/USDT', 'SOL/USDT', 'ADA/USDT', 'DOT/USDT',
      'AVAX/USDT', 'MATIC/USDT', 'LINK/USDT', 'UNI/USDT', 'AAVE/USDT'
    ];

    return tokens.map(pair => {
      const basePrice = this.getBasePrice(pair);
      const change = (Math.random() - 0.5) * 0.1; // ±5%
      const newPrice = basePrice * (1 + change);
      const volume = Math.random() * 1000000;

      return {
        type: 'price_update',
        pair,
        price: newPrice,
        change24h: change * 100,
        volume24h: volume,
        timestamp: Date.now(),
        exchange: 'binance',
        bid: newPrice * 0.999,
        ask: newPrice * 1.001,
        high: newPrice * (1 + Math.random() * 0.02),
        low: newPrice * (1 - Math.random() * 0.02)
      };
    });
  }

  private getBasePrice(pair: string): number {
    const basePrices: Record<string, number> = {
      'ETH/USDT': 3245.67,
      'BTC/USDT': 43210.50,
      'SOL/USDT': 98.45,
      'ADA/USDT': 0.45,
      'DOT/USDT': 6.78,
      'AVAX/USDT': 32.10,
      'MATIC/USDT': 0.85,
      'LINK/USDT': 14.56,
      'UNI/USDT': 6.23,
      'AAVE/USDT': 89.12
    };
    return basePrices[pair] || 100;
  }

  private generateTradeExecution() {
    const sides = ['buy', 'sell'];
    const pairs = ['ETH/USDT', 'BTC/USDT', 'SOL/USDT'];
    const side = sides[Math.floor(Math.random() * sides.length)];
    const pair = pairs[Math.floor(Math.random() * pairs.length)];

    return {
      type: 'trade_execution',
      tradeId: `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      pair,
      side,
      price: this.getBasePrice(pair) * (1 + (Math.random() - 0.5) * 0.01),
      amount: Math.random() * 10,
      timestamp: Date.now(),
      value: Math.random() * 100000
    };
  }

  private generateOrderBookUpdate() {
    return {
      type: 'orderbook_update',
      pair: 'ETH/USDT',
      bids: Array.from({ length: 10 }, (_, i) => ({
        price: 3245.67 * (0.99 - i * 0.001),
        amount: Math.random() * 100,
        total: Math.random() * 100000
      })),
      asks: Array.from({ length: 10 }, (_, i) => ({
        price: 3245.67 * (1.01 + i * 0.001),
        amount: Math.random() * 100,
        total: Math.random() * 100000
      })),
      timestamp: Date.now()
    };
  }

  private simulateConnectionEvents() {
    // Randomly simulate disconnections (10% chance every 30 seconds)
    setInterval(() => {
      if (this.isConnected && Math.random() > 0.9) {
        this.simulateDisconnection();
      }
    }, 30000);
  }

  private simulateDisconnection() {
    this.isConnected = false;
    this.emit('close', { code: 1000, reason: 'Simulated disconnect' });
    
    // Attempt reconnection after delay
    setTimeout(() => {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        this.connect();
      }
    }, this.reconnectInterval);
  }

  send(data: string) {
    if (!this.isConnected) {
      console.warn('WebSocket not connected');
      return;
    }

    // Simulate processing delay
    setTimeout(() => {
      const parsed = JSON.parse(data);
      
      // Handle subscription messages
      if (parsed.type === 'subscribe') {
        this.emit('message', {
          data: JSON.stringify({
            type: 'subscription_confirmed',
            channel: parsed.channel,
            timestamp: Date.now()
          })
        });
      }
      
      // Handle order placement
      if (parsed.type === 'place_order') {
        this.emit('message', {
          data: JSON.stringify({
            type: 'order_confirmation',
            orderId: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            status: 'pending',
            timestamp: Date.now()
          })
        });
        
        // Simulate order execution
        setTimeout(() => {
          this.emit('message', {
            data: JSON.stringify({
              type: 'order_filled',
              orderId: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              status: 'filled',
              filledPrice: parsed.price,
              filledAmount: parsed.amount,
              timestamp: Date.now()
            })
          });
        }, 1000);
      }
    }, 100);
  }

  close() {
    this.isConnected = false;
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.emit('close', { code: 1000, reason: 'Manual close' });
  }

  addEventListener(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  removeEventListener(event: string, callback: Function) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)!;
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      });
    }
  }

  get readyState() {
    return this.isConnected ? 1 : 0; // OPEN: 1, CLOSED: 0
  }
}

export function mockWebSocket(url: string): any {
  return new MockWebSocket(url) as any;
}