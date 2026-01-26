'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Clock, Lightbulb, IndianRupee, BarChart3, Search, RefreshCw, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';
import MarketSuggestions from '@/components/ui/MarketSuggestions';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface Commodity {
  name: string;
  currentPrice: number;
  unit: string;
  category: string;
  weeklyTrend: { day: string; price: number; factors?: string }[];
  priceAnalysis: {
    changePercentage: string;
    changeReason: string;
    marketForces: string[];
    futureOutlook: string;
  };
  demandLevel: string;
  qualityGrade: string;
  seasonalImpact: string;
  supplyStatus: string;
}

interface MarketData {
  marketName: string;
  location: string;
  lastUpdated: string;
  marketAnalysis: {
    overallCondition: string;
    seasonalFactors: string;
    supplyChainStatus: string;
    demandPatterns: string;
  };
  commodities: Commodity[];
  aiInsights: {
    marketSentiment: string;
    todayHighlight: string;
    weeklyPrediction: string;
    bestSellingTime: string;
    priceDrivers: {
      factor: string;
      impact: string;
      explanation: string;
    }[];
    riskFactors: {
      risk: string;
      probability: string;
      impact: string;
      mitigation: string;
    }[];
    opportunities: {
      opportunity: string;
      timeframe: string;
      potential: string;
    }[];
    strategicAdvice: string;
  };
  nearbyMarkets: {
    name: string;
    distance: string;
    avgPriceDifference: string;
    speciality: string;
    advantages: string;
    transportCost: string;
  }[];
  weatherImpact: {
    currentConditions: string;
    forecast: string;
    seasonalTrends: string;
  };
  economicFactors: {
    inflation: string;
    fuelPrices: string;
    governmentPolicies: string;
    exportImportTrends: string;
  };
}

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marketQuery, setMarketQuery] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity | null>(null);

  const fetchMarketData = async (market: string, location?: string) => {
    setLoading(true);
    setError(null);
    setMarketData(null); // Clear previous data
    
    try {
      console.log('Fetching AI-powered market data for:', market);
      
      const response = await fetch('/api/market-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          market: market || 'Local Mandi',
          location: location || user?.address || 'India'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
      }
      
      // Validate the enhanced response structure
      if (!data.commodities || !Array.isArray(data.commodities)) {
        throw new Error('Invalid data structure received from AI');
      }

      if (!data.aiInsights) {
        throw new Error('AI insights not available');
      }
      
      console.log('Successfully received AI-generated market data:', data.marketName);
      console.log('Commodities analyzed:', data.commodities.length);
      console.log('AI insights available:', !!data.aiInsights);
      
      setMarketData(data);
      setSelectedCommodity(data.commodities[0] || null);
      
    } catch (err) {
      console.error('AI market analysis failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to get AI market analysis';
      setError(`AI Analysis Failed: ${errorMessage}. Please try a different market or try again.`);
      setMarketData(null); // Ensure no stale data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load default market data on component mount
    fetchMarketData('Local Mandi');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (marketQuery.trim()) {
      fetchMarketData(marketQuery.trim());
    }
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  const getDemandColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-earth-800 mb-4">
            {t('dashboard.title')}
          </h1>
          <p className="text-xl text-earth-600 mb-6">
            Real-time market insights powered by AI
          </p>

          {/* Market Search */}
          <GlassCard>
            <div className="mb-4">
              <form onSubmit={handleSearch} className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={marketQuery}
                    onChange={(e) => setMarketQuery(e.target.value)}
                    placeholder="Enter market name (e.g., Azadpur Mandi, Koyambedu Market)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 gradient-saffron text-white rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  {loading ? 'Loading...' : 'Get Market Data'}
                </motion.button>
              </form>
            </div>
            
            <MarketSuggestions 
              onMarketSelect={(marketName) => {
                setMarketQuery(marketName);
                fetchMarketData(marketName);
              }}
              searchQuery={marketQuery}
            />
          </GlassCard>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => fetchMarketData(marketQuery || 'Local Mandi')}
                className="ml-auto text-red-600 hover:text-red-800 font-medium"
              >
                Retry
              </button>
            </div>
          </motion.div>
        )}

        {/* Market Data Display */}
        {marketData && (
          <>
            {/* Market Info Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <GlassCard>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-earth-800">{marketData.marketName}</h2>
                    <p className="text-earth-600">{marketData.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-earth-500">Last Updated</p>
                    <p className="text-sm font-medium text-earth-700">
                      {new Date(marketData.lastUpdated).toLocaleString()}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Market Analysis Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <GlassCard>
                <div className="flex items-center mb-6">
                  <BarChart3 className="w-6 h-6 text-saffron-500 mr-3" />
                  <h3 className="font-display font-semibold text-2xl text-earth-800">
                    Market Analysis Overview
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold text-earth-800 mb-2">Overall Condition</h4>
                    <p className="text-earth-600 text-sm">{marketData.marketAnalysis.overallCondition}</p>
                  </div>
                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold text-earth-800 mb-2">Seasonal Factors</h4>
                    <p className="text-earth-600 text-sm">{marketData.marketAnalysis.seasonalFactors}</p>
                  </div>
                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold text-earth-800 mb-2">Supply Chain Status</h4>
                    <p className="text-earth-600 text-sm">{marketData.marketAnalysis.supplyChainStatus}</p>
                  </div>
                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold text-earth-800 mb-2">Demand Patterns</h4>
                    <p className="text-earth-600 text-sm">{marketData.marketAnalysis.demandPatterns}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Commodities Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold text-earth-800 mb-4">Today's Commodity Prices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {marketData.commodities.map((commodity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedCommodity(commodity)}
                    className={`cursor-pointer transition-all ${
                      selectedCommodity?.name === commodity.name 
                        ? 'ring-2 ring-saffron-500' 
                        : ''
                    }`}
                  >
                    <GlassCard hover>
                      <div className="text-center">
                        <h4 className="font-semibold text-lg text-earth-800 mb-2">
                          {commodity.name}
                        </h4>
                        <div className="text-2xl font-bold text-saffron-600 mb-2">
                          ₹{commodity.currentPrice}
                          <span className="text-sm text-earth-500">/{commodity.unit}</span>
                        </div>
                        <div className={`text-sm font-medium mb-2 ${getChangeColor(commodity.priceAnalysis.changePercentage)}`}>
                          {commodity.priceAnalysis.changePercentage}
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className={`px-2 py-1 rounded-full ${getDemandColor(commodity.demandLevel)}`}>
                            {commodity.demandLevel}
                          </span>
                          <span className="text-earth-500">Grade {commodity.qualityGrade}</span>
                        </div>
                        {/* AI Analysis Preview */}
                        <div className="mt-2 text-xs text-earth-600 bg-earth-50 p-2 rounded">
                          <strong>AI:</strong> {commodity.priceAnalysis.changeReason.substring(0, 60)}...
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Selected Commodity Trend */}
              {selectedCommodity && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard>
                    <div className="flex items-center mb-6">
                      <BarChart3 className="w-6 h-6 text-saffron-500 mr-3" />
                      <h3 className="font-display font-semibold text-2xl text-earth-800">
                        {selectedCommodity.name} - Weekly Trend
                      </h3>
                    </div>
                    
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={selectedCommodity.weeklyTrend}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis 
                            dataKey="day" 
                            stroke="#6b7280"
                            fontSize={12}
                          />
                          <YAxis 
                            stroke="#6b7280"
                            fontSize={12}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              border: 'none',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#f97316" 
                            strokeWidth={3}
                            dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Market Insights */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <GlassCard glow>
                  <div className="flex items-center mb-6">
                    <Lightbulb className="w-6 h-6 text-saffron-500 mr-3" />
                    <h3 className="font-display font-semibold text-2xl text-earth-800">
                      AI Market Intelligence
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Market Sentiment */}
                    <div className="glass p-6 rounded-lg">
                      <div className="text-lg font-semibold text-earth-800 mb-3">
                        🎯 Market Sentiment
                      </div>
                      <p className="text-earth-600 leading-relaxed">
                        {marketData.aiInsights.marketSentiment}
                      </p>
                    </div>

                    {/* Today's Highlight */}
                    <div className="glass p-6 rounded-lg">
                      <div className="text-lg font-semibold text-earth-800 mb-3">
                        📈 Today's Key Insight
                      </div>
                      <p className="text-earth-600 leading-relaxed">
                        {marketData.aiInsights.todayHighlight}
                      </p>
                    </div>

                    {/* Weekly Prediction */}
                    <div className="glass p-6 rounded-lg">
                      <div className="text-lg font-semibold text-earth-800 mb-3">
                        🔮 AI Weekly Forecast
                      </div>
                      <p className="text-earth-600 leading-relaxed">
                        {marketData.aiInsights.weeklyPrediction}
                      </p>
                    </div>

                    {/* Strategic Advice */}
                    <div className="glass p-6 rounded-lg">
                      <div className="text-lg font-semibold text-earth-800 mb-3">
                        💡 Strategic Advice
                      </div>
                      <p className="text-earth-600 leading-relaxed">
                        {marketData.aiInsights.strategicAdvice}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Nearby Markets Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard>
                <div className="flex items-center mb-6">
                  <MapPin className="w-6 h-6 text-saffron-500 mr-3" />
                  <h3 className="font-display font-semibold text-2xl text-earth-800">
                    Nearby Markets Comparison
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {marketData.nearbyMarkets.map((market, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="glass p-6 rounded-lg"
                    >
                      <h4 className="font-semibold text-lg text-earth-800 mb-2">
                        {market.name}
                      </h4>
                      <p className="text-earth-600 mb-2">{market.distance}</p>
                      <div className={`text-lg font-bold mb-2 ${
                        market.avgPriceDifference.startsWith('+') 
                          ? 'text-red-600' 
                          : 'text-green-600'
                      }`}>
                        {market.avgPriceDifference} avg price
                      </div>
                      <p className="text-sm text-earth-500">{market.speciality}</p>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}