import { NextRequest, NextResponse } from 'next/server';
import { generateNegotiationPhrases } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { product, currentPrice, targetPrice, language = 'en' } = await request.json();

    if (!product || !currentPrice || !targetPrice) {
      return NextResponse.json(
        { error: 'Product, current price, and target price are required' },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const phrases = await generateNegotiationPhrases(product, currentPrice, targetPrice, language);

    return NextResponse.json({
      phrases,
      product,
      currentPrice,
      targetPrice,
      language,
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Negotiation phrases API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate negotiation phrases', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}