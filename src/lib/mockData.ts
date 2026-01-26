import { PriceData, NegotiationSuggestion, VendorAnalytics, Product } from './types';

export const mockProducts: Product[] = [
  { id: '1', name: 'Tomato', category: 'vegetable', unit: 'kg' },
  { id: '2', name: 'Onion', category: 'vegetable', unit: 'kg' },
  { id: '3', name: 'Rice', category: 'grain', unit: 'kg' },
  { id: '4', name: 'Wheat', category: 'grain', unit: 'kg' },
  { id: '5', name: 'Cotton', category: 'grain', unit: 'quintal' },
  { id: '6', name: 'Turmeric', category: 'spice', unit: 'kg' },
];

export const mockPriceData: PriceData = {
  product: 'Tomato',
  currentPrice: 45,
  fairPriceRange: {
    min: 40,
    max: 55,
  },
  marketComparison: [
    { location: 'Azadpur Mandi', price: 48 },
    { location: 'Ghazipur Mandi', price: 42 },
    { location: 'Okhla Mandi', price: 50 },
    { location: 'Najafgarh Mandi', price: 44 },
  ],
  demandIndicator: 'high',
  trend: 'up',
  confidence: 85,
};

export const mockNegotiationSuggestions: NegotiationSuggestion[] = [
  {
    phrase: "The market rate is higher today",
    translation: "आज बाज़ार भाव ज्यादा है",
    language: "Hindi",
    context: "When buyer offers low price"
  },
  {
    phrase: "Let's meet in the middle",
    translation: "बीच में मिल जाते हैं",
    language: "Hindi",
    context: "For compromise"
  },
  {
    phrase: "Quality is very good",
    translation: "क्वालिटी बहुत अच्छी है",
    language: "Hindi",
    context: "To justify price"
  },
  {
    phrase: "This is my final price",
    translation: "यह मेरा अंतिम भाव है",
    language: "Hindi",
    context: "Final negotiation"
  },
];

export const mockVendorAnalytics: VendorAnalytics = {
  todayPrice: 45,
  weeklyTrend: [
    { day: 'Mon', price: 38 },
    { day: 'Tue', price: 42 },
    { day: 'Wed', price: 40 },
    { day: 'Thu', price: 45 },
    { day: 'Fri', price: 48 },
    { day: 'Sat', price: 52 },
    { day: 'Sun', price: 45 },
  ],
  bestTimeToSell: "Friday-Saturday (Peak demand)",
  nearbyMandis: [
    { name: 'Azadpur Mandi', distance: '2.5 km', avgPrice: 48 },
    { name: 'Ghazipur Mandi', distance: '5.1 km', avgPrice: 42 },
    { name: 'Okhla Mandi', distance: '7.8 km', avgPrice: 50 },
  ],
  aiInsight: "You could earn ₹350 more today by selling at Okhla Mandi. High demand expected due to festival season.",
};

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
];

// Mock API functions
export const mockTranslateText = async (text: string, targetLang: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const translations: Record<string, Record<string, string>> = {
    'hi': {
      'Hello': 'नमस्ते',
      'Thank you': 'धन्यवाद',
      'Good price': 'अच्छा भाव',
      'Tomato': 'टमाटर',
      'Onion': 'प्याज',
    },
    'ta': {
      'Hello': 'வணக்கம்',
      'Thank you': 'நன்றி',
      'Good price': 'நல்ல விலை',
      'Tomato': 'தக்காளி',
      'Onion': 'வெங்காயம்',
    }
  };
  
  return translations[targetLang]?.[text] || `[${targetLang}] ${text}`;
};

export const mockGetPriceRecommendation = async (product: string): Promise<PriceData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    ...mockPriceData,
    product,
    currentPrice: Math.floor(Math.random() * 30) + 30,
    fairPriceRange: {
      min: Math.floor(Math.random() * 20) + 25,
      max: Math.floor(Math.random() * 20) + 45,
    }
  };
};