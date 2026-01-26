export interface PriceData {
  product: string;
  currentPrice: number;
  fairPriceRange: {
    min: number;
    max: number;
  };
  marketComparison: {
    location: string;
    price: number;
  }[];
  demandIndicator: 'low' | 'medium' | 'high';
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

export interface NegotiationSuggestion {
  phrase: string;
  translation: string;
  language: string;
  context: string;
}

export interface VendorAnalytics {
  todayPrice: number;
  weeklyTrend: {
    day: string;
    price: number;
  }[];
  bestTimeToSell: string;
  nearbyMandis: {
    name: string;
    distance: string;
    avgPrice: number;
  }[];
  aiInsight: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'vegetable' | 'grain' | 'fruit' | 'spice';
  unit: string;
}