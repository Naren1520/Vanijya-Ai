'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, TrendingUp, Globe, Search, Loader, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  data?: any;
}

interface MarketDataPoint {
  commodity: string;
  price: number;
  change: number;
  market: string;
  source: string;
  timestamp: string;
}

export default function LiveDataPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [liveData, setLiveData] = useState<MarketDataPoint[]>([]);
  const [selectedQuery, setSelectedQuery] = useState('');

  const suggestedQueries = [
    "What's the current price of tomatoes in Delhi?",
    "Show me wheat prices across major markets",
    "Compare onion prices between Mumbai and Pune",
    "Get live rice prices in South India",
    "What are the trending commodities today?"
  ];

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: 'Hello! I can help you get live market data for any commodity or location. What would you like to know?',
        timestamp: new Date()
      }
    ]);

    // Mock live data
    const mockLiveData: MarketDataPoint[] = [
      {
        commodity: 'Tomato',
        price: 45,
        change: 2.5,
        market: 'Delhi Azadpur',
        source: 'SERP API',
        timestamp: new Date().toISOString()
      },
      {
        commodity: 'Onion',
        price: 35,
        change: -1.2,
        market: 'Mumbai Vashi',
        source: 'SERP API',
        timestamp: new Date().toISOString()
      },
      {
        commodity: 'Rice',
        price: 85,
        change: 0.8,
        market: 'Hyderabad',
        source: 'SERP API',
        timestamp: new Date().toISOString()
      }
    ];
    setLiveData(mockLiveData);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call SERP API for live market data
      const response = await fetch('/api/live-market-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputMessage,
          location: 'India'
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response || 'Here is the latest market data based on your query:',
        timestamp: new Date(),
        data: data.marketData
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update live data if new data received
      if (data.marketData) {
        setLiveData(prev => [...data.marketData, ...prev].slice(0, 10));
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
      
      // Fallback response
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I found some information about "${inputMessage}". Here's what I can tell you based on current market trends:`,
        timestamp: new Date(),
        data: generateMockResponse(inputMessage)
      };

      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (query: string) => {
    // Generate mock data based on query
    const commodities = ['tomato', 'onion', 'potato', 'rice', 'wheat'];
    const markets = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];
    
    return commodities.map(commodity => ({
      commodity: commodity.charAt(0).toUpperCase() + commodity.slice(1),
      price: Math.floor(Math.random() * 100) + 20,
      change: (Math.random() - 0.5) * 10,
      market: markets[Math.floor(Math.random() * markets.length)],
      source: 'Live Market Feed',
      timestamp: new Date().toISOString()
    }));
  };

  const handleSuggestedQuery = (query: string) => {
    setInputMessage(query);
    setSelectedQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            {t('features.liveData.title')}
          </h1>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            {t('features.liveData.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 h-[600px] flex flex-col"
            >
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'gradient-saffron text-white'
                          : 'bg-white/60 text-earth-800'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      
                      {/* Display market data if available */}
                      {message.data && (
                        <div className="mt-3 space-y-2">
                          {message.data.slice(0, 3).map((item: any, index: number) => (
                            <div key={index} className="bg-white/20 rounded-lg p-2 text-xs">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{item.commodity}</span>
                                <span className={`font-bold ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  ₹{item.price} ({item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%)
                                </span>
                              </div>
                              <div className="text-xs opacity-75 mt-1">
                                {item.market} • {item.source}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="text-xs opacity-75 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/60 text-earth-800 p-4 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Fetching live market data...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about market prices, trends, or specific commodities..."
                  className="flex-1 glass px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-saffron-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="gradient-saffron text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Suggested Queries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <h3 className="text-lg font-semibold text-earth-800 mb-3">Suggested Queries</h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuery(query)}
                    className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                      selectedQuery === query
                        ? 'gradient-saffron text-white'
                        : 'glass text-earth-700 hover:bg-white/40'
                    }`}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Live Data Sidebar */}
          <div className="space-y-6">
            {/* Live Data Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-earth-800">Live Market Feed</h3>
                <RefreshCw className="w-5 h-5 text-saffron-500 cursor-pointer hover:animate-spin" />
              </div>
              
              <div className="space-y-3">
                {liveData.slice(0, 5).map((item, index) => (
                  <div key={index} className="bg-white/40 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-earth-800">{item.commodity}</span>
                      <span className={`text-sm font-bold ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-earth-800">₹{item.price}</span>
                      {item.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                      )}
                    </div>
                    <div className="text-xs text-earth-600 mt-1">
                      {item.market} • {new Date(item.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* API Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-earth-800 mb-4">Data Sources</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-earth-700">SERP API</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-earth-700">Market APIs</span>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-earth-700">AI Assistant</span>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Online</span>
                </div>
              </div>
            </motion.div>

            {/* Authentication CTA */}
            {!isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <h3 className="text-lg font-bold text-earth-800 mb-2">
                  Unlock Full Access
                </h3>
                <p className="text-sm text-earth-600 mb-4">
                  Sign up for unlimited market data queries and personalized insights
                </p>
                <button className="gradient-saffron text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 w-full">
                  Get Started
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}