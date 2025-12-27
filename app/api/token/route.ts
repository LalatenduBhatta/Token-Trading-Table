import { NextResponse } from 'next/server';
import { Token } from '@/types/token';

// Mock data for development
const generateMockTokens = (count: number): Token[] => {
  const tokens: Token[] = [];
  const chains = ['Ethereum', 'Solana', 'Base', 'Arbitrum', 'Polygon'];
  const categories = ['new', 'final-stretch', 'migrated'] as const;
  const tags = ['DeFi', 'NFT', 'GameFi', 'AI', 'Meme', 'RWA', 'L2'];

  for (let i = 0; i < count; i++) {
    const category = categories[i % 3];
    const chain = chains[i % chains.length];
    const isNew = category === 'new';
    
    tokens.push({
      id: `token-${i}`,
      pair: `${['ETH', 'SOL', 'USDC', 'WBTC', 'AVAX'][i % 5]}/${['USDT', 'USDC', 'DAI', 'BUSD'][i % 4]}`,
      name: `Token ${i + 1}`,
      icons: [
        `https://api.dicebear.com/7.x/shapes/svg?seed=${i}`,
        `https://api.dicebear.com/7.x/shapes/svg?seed=${i + 100}`,
      ],
      price: 100 + Math.random() * 1000,
      priceChange: (Math.random() - 0.5) * 10,
      change24h: (Math.random() - 0.5) * 20,
      volume24h: Math.random() * 1000000,
      trades24h: Math.floor(Math.random() * 10000),
      liquidity: Math.random() * 5000000,
      liquidityScore: Math.random(),
      age: `${Math.floor(Math.random() * 30)}d ${Math.floor(Math.random() * 24)}h`,
      tags: tags.slice(0, Math.floor(Math.random() * 3) + 1),
      category,
      chain,
      isNew,
      isWatched: Math.random() > 0.7,
      chartData: Array.from({ length: 24 }, (_, index) => ({
        time: Date.now() - (23 - index) * 3600000,
        value: 100 + Math.random() * 50,
      })),
    });
  }

  return tokens;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const chain = searchParams.get('chain');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let tokens = generateMockTokens(100);

    // Apply filters
    if (category !== 'all') {
      tokens = tokens.filter(token => token.category === category);
    }
    if (chain) {
      tokens = tokens.filter(token => token.chain === chain);
    }

    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTokens = tokens.slice(startIndex, endIndex);

    return NextResponse.json({
      tokens: paginatedTokens,
      total: tokens.length,
      page,
      totalPages: Math.ceil(tokens.length / limit),
    });
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    );
  }
}