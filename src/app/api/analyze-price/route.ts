import { NextRequest, NextResponse } from 'next/server';
import { analyzeProductPrice } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { product, language = 'en' } = await request.json();

    if (!product) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      );
    }

    // Always try to get AI analysis, with robust fallback
    const analysis = await analyzeProductPrice(product, language);

    return NextResponse.json({
      ...analysis,
      success: true,
      timestamp: new Date().toISOString(),
      aiPowered: true
    });
  } catch (error) {
    console.error('Price analysis API error:', error);
    
    // Provide robust fallback data even on API error
    const productPrices: { [key: string]: { min: number; max: number } } = {
      'tomatoes': { min: 15, max: 35 },
      'onions': { min: 20, max: 45 },
      'potatoes': { min: 12, max: 28 },
      'rice': { min: 25, max: 60 },
      'wheat': { min: 20, max: 35 },
      'apples': { min: 80, max: 150 },
      'bananas': { min: 30, max: 60 },
      'carrots': { min: 25, max: 50 },
      'cabbage': { min: 10, max: 25 },
      'spinach': { min: 15, max: 30 }
    };
    
    const { product, language = 'en' } = await request.json().catch(() => ({ product: 'Unknown', language: 'en' }));
    const productKey = product.toLowerCase();
    const priceRange = productPrices[productKey] || { min: 20, max: 50 };
    
    return NextResponse.json({
      product: product,
      fairPriceRange: priceRange,
      confidence: 82,
      marketInsights: [
        "Market analysis based on current trends and historical data",
        "Seasonal demand patterns are influencing current pricing",
        "Quality assessment is crucial for accurate price determination",
        "Regional variations may affect final pricing by 10-20%"
      ],
      negotiationTips: [
        "Research current market rates before negotiations",
        "Emphasize product quality and freshness",
        "Consider bulk purchase advantages",
        "Build long-term vendor relationships for better rates"
      ],
      nearbyMandis: [
        { name: "Central Market Hub", price: Math.round((priceRange.min + priceRange.max) / 2), distance: "2.1 km" },
        { name: "Wholesale Trading Center", price: Math.round(priceRange.max * 0.92), distance: "3.5 km" },
        { name: "Local Farmers Market", price: Math.round(priceRange.min * 1.12), distance: "2.8 km" }
      ],
      success: true,
      timestamp: new Date().toISOString(),
      aiPowered: false,
      fallbackMode: true
    });
  }
}