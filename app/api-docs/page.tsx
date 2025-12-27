'use client';

import { useState } from 'react';
import { Code, Copy, Check, ExternalLink, Zap, Shield, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tabs';
import { Badge } from '@/components/ui/badge';

export default function APIDocsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/tokens',
      description: 'Fetch token list with filters',
      parameters: [
        { name: 'page', type: 'number', required: false, description: 'Page number' },
        { name: 'limit', type: 'number', required: false, description: 'Items per page' },
        { name: 'category', type: 'string', required: false, description: 'Token category' },
        { name: 'chain', type: 'string', required: false, description: 'Blockchain network' },
        { name: 'sortBy', type: 'string', required: false, description: 'Sort field' },
        { name: 'sortOrder', type: 'string', required: false, description: 'Sort order (asc/desc)' },
      ],
      example: '/api/tokens?page=1&limit=20&category=new&chain=ethereum&sortBy=volume24h&sortOrder=desc',
    },
    {
      method: 'GET',
      path: '/api/tokens/{id}',
      description: 'Get token details by ID',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Token ID' },
      ],
      example: '/api/tokens/token-123',
    },
    {
      method: 'GET',
      path: '/api/market/stats',
      description: 'Get market statistics',
      parameters: [],
      example: '/api/market/stats',
    },
    {
      method: 'POST',
      path: '/api/orders',
      description: 'Place a new order',
      parameters: [
        { name: 'tokenId', type: 'string', required: true, description: 'Token ID' },
        { name: 'side', type: 'string', required: true, description: 'buy or sell' },
        { name: 'amount', type: 'number', required: true, description: 'Order amount' },
        { name: 'price', type: 'number', required: false, description: 'Limit price' },
        { name: 'type', type: 'string', required: true, description: 'market, limit, or stop' },
      ],
      example: 'POST /api/orders { "tokenId": "token-123", "side": "buy", "amount": 1.5, "type": "market" }',
    },
    {
      method: 'GET',
      path: '/api/orders',
      description: 'Get user orders',
      parameters: [
        { name: 'status', type: 'string', required: false, description: 'Order status filter' },
        { name: 'limit', type: 'number', required: false, description: 'Max orders to return' },
      ],
      example: '/api/orders?status=open&limit=50',
    },
  ];

  const websocketExamples = [
    {
      type: 'subscribe',
      description: 'Subscribe to price updates',
      payload: JSON.stringify({ type: 'subscribe', channel: 'prices', pairs: ['ETH/USDT', 'BTC/USDT'] }, null, 2),
    },
    {
      type: 'unsubscribe',
      description: 'Unsubscribe from channel',
      payload: JSON.stringify({ type: 'unsubscribe', channel: 'prices' }, null, 2),
    },
    {
      type: 'place_order',
      description: 'Place order via WebSocket',
      payload: JSON.stringify({
        type: 'place_order',
        tokenId: 'token-123',
        side: 'buy',
        amount: 1.5,
        price: 3245.67,
        orderType: 'limit'
      }, null, 2),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h1 className="mb-4 text-4xl font-bold text-white">
                Axiom Trade API
              </h1>
              <p className="text-xl text-gray-400">
                Build on top of the most advanced trading platform
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge className="gap-2 bg-blue-500/20 text-blue-400">
                  <Zap className="h-3 w-3" />
                  Real-time Data
                </Badge>
                <Badge className="gap-2 bg-green-500/20 text-green-400">
                  <Shield className="h-3 w-3" />
                  Secure & Scalable
                </Badge>
                <Badge className="gap-2 bg-purple-500/20 text-purple-400">
                  <Rocket className="h-3 w-3" />
                  High Performance
                </Badge>
              </div>
            </div>
            <div className="flex gap-4">
              <Button className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Swagger Docs
              </Button>
              <Button variant="outline" className="gap-2">
                <Code className="h-4 w-4" />
                API Reference
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
                <ul className="space-y-2">
                  {['Authentication', 'REST API', 'WebSocket API', 'Rate Limits', 'Error Codes', 'SDKs'].map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                        className="block rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="mb-4 font-semibold text-white">Base URL</h3>
                <div className="rounded-lg bg-gray-800 p-3">
                  <code className="text-sm text-blue-400">
                    https://api.axiom.trade/v1
                  </code>
                </div>
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium text-gray-400">WebSocket</h4>
                  <div className="rounded-lg bg-gray-800 p-3">
                    <code className="text-sm text-green-400">
                      wss://api.axiom.trade/ws
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Authentication */}
            <section id="authentication" className="scroll-mt-8">
              <h2 className="mb-6 text-2xl font-bold text-white">Authentication</h2>
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <p className="mb-4 text-gray-400">
                  Use API keys to authenticate requests. You can generate keys in your account settings.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium text-white">Header Authentication</h4>
                    <div className="rounded-lg bg-gray-800 p-4">
                      <code className="text-sm text-gray-300">
                        Authorization: Bearer YOUR_API_KEY
                      </code>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-white">WebSocket Authentication</h4>
                    <div className="rounded-lg bg-gray-800 p-4">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        {JSON.stringify({
                          type: 'auth',
                          apiKey: 'YOUR_API_KEY',
                          timestamp: Date.now()
                        }, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* REST API */}
            <section id="rest-api" className="scroll-mt-8">
              <h2 className="mb-6 text-2xl font-bold text-white">REST API</h2>
              <Tabs defaultValue="endpoints" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                </TabsList>
                
                <TabsContent value="endpoints">
                  <div className="space-y-6">
                    {endpoints.map((endpoint) => (
                      <div
                        key={endpoint.path}
                        className="rounded-xl border border-gray-800 bg-gray-900 p-6"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                endpoint.method === 'GET'
                                  ? 'default'
                                  : endpoint.method === 'POST'
                                  ? 'success'
                                  : 'warning'
                              }
                            >
                              {endpoint.method}
                            </Badge>
                            <code className="text-lg font-medium text-white">
                              {endpoint.path}
                            </code>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(endpoint.example, endpoint.path)}
                          >
                            {copied === endpoint.path ? (
                              <Check className="h-4 w-4 text-green-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        
                        <p className="mb-4 text-gray-400">{endpoint.description}</p>
                        
                        {endpoint.parameters.length > 0 && (
                          <div className="mb-4">
                            <h4 className="mb-2 font-medium text-white">Parameters</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b border-gray-800">
                                    <th className="px-4 py-2 text-left text-gray-400">Name</th>
                                    <th className="px-4 py-2 text-left text-gray-400">Type</th>
                                    <th className="px-4 py-2 text-left text-gray-400">Required</th>
                                    <th className="px-4 py-2 text-left text-gray-400">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {endpoint.parameters.map((param) => (
                                    <tr
                                      key={param.name}
                                      className="border-b border-gray-800 last:border-0"
                                    >
                                      <td className="px-4 py-2 font-medium text-white">
                                        {param.name}
                                      </td>
                                      <td className="px-4 py-2 text-gray-300">{param.type}</td>
                                      <td className="px-4 py-2">
                                        <Badge
                                          variant={param.required ? 'destructive' : 'outline'}
                                          className="text-xs"
                                        >
                                          {param.required ? 'Yes' : 'No'}
                                        </Badge>
                                      </td>
                                      <td className="px-4 py-2 text-gray-400">
                                        {param.description}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="mb-2 font-medium text-white">Example</h4>
                          <div className="rounded-lg bg-gray-800 p-4">
                            <code className="text-sm text-gray-300">{endpoint.example}</code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            {/* WebSocket API */}
            <section id="websocket-api" className="scroll-mt-8">
              <h2 className="mb-6 text-2xl font-bold text-white">WebSocket API</h2>
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <p className="mb-6 text-gray-400">
                  Real-time data streaming for price updates, order book changes, and trade executions.
                </p>
                
                <div className="space-y-6">
                  {websocketExamples.map((example) => (
                    <div key={example.type} className="border border-gray-800 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 px-4 py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-white">{example.description}</h4>
                            <p className="text-sm text-gray-400">Type: {example.type}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(example.payload, example.type)}
                          >
                            {copied === example.type ? (
                              <Check className="h-4 w-4 text-green-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="bg-gray-950 p-4">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          {example.payload}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}