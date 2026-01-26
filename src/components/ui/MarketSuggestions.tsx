'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Users, TrendingUp } from 'lucide-react';

interface MarketSuggestion {
  name: string;
  location: string;
  type: string;
  speciality: string[];
  distance?: string;
  popularity: 'high' | 'medium' | 'low';
}

const popularMarkets: MarketSuggestion[] = [
  {
    name: 'Azadpur Mandi',
    location: 'Delhi',
    type: 'Wholesale',
    speciality: ['Vegetables', 'Fruits'],
    distance: '2.5 km',
    popularity: 'high'
  },
  {
    name: 'Koyambedu Market',
    location: 'Chennai, Tamil Nadu',
    type: 'Wholesale',
    speciality: ['Vegetables', 'Fruits', 'Flowers'],
    popularity: 'high'
  },
  {
    name: 'Vashi APMC',
    location: 'Mumbai, Maharashtra',
    type: 'Agricultural',
    speciality: ['Grains', 'Pulses', 'Spices'],
    popularity: 'high'
  },
  {
    name: 'Gaddiannaram Fruit Market',
    location: 'Hyderabad, Telangana',
    type: 'Fruit Market',
    speciality: ['Fruits', 'Dry Fruits'],
    popularity: 'medium'
  },
  {
    name: 'Yeshwanthpur Market',
    location: 'Bangalore, Karnataka',
    type: 'Wholesale',
    speciality: ['Vegetables', 'Grains'],
    popularity: 'medium'
  },
  {
    name: 'Lasalgaon Onion Market',
    location: 'Nashik, Maharashtra',
    type: 'Specialized',
    speciality: ['Onions', 'Vegetables'],
    popularity: 'high'
  },
  {
    name: 'Khari Baoli',
    location: 'Delhi',
    type: 'Spice Market',
    speciality: ['Spices', 'Dry Fruits', 'Nuts'],
    popularity: 'high'
  },
  {
    name: 'Mahatma Phule Market',
    location: 'Pune, Maharashtra',
    type: 'Municipal',
    speciality: ['Vegetables', 'Fruits', 'Flowers'],
    popularity: 'medium'
  }
];

interface MarketSuggestionsProps {
  onMarketSelect: (marketName: string) => void;
  searchQuery: string;
}

export default function MarketSuggestions({ onMarketSelect, searchQuery }: MarketSuggestionsProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredMarkets = popularMarkets.filter(market =>
    market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    market.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    market.speciality.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getPopularityIcon = (popularity: string) => {
    switch (popularity) {
      case 'high': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'medium': return <Users className="w-4 h-4 text-yellow-600" />;
      case 'low': return <Clock className="w-4 h-4 text-gray-600" />;
      default: return null;
    }
  };

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="relative">
      {/* Popular Markets Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-earth-800">Popular Markets</h3>
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-saffron-600 hover:text-saffron-700 text-sm font-medium"
          >
            {showSuggestions ? 'Hide' : 'Show All'}
          </button>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {popularMarkets.slice(0, 4).map((market, index) => (
            <motion.button
              key={index}
              onClick={() => onMarketSelect(market.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/80 transition-all text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <MapPin className="w-4 h-4 text-saffron-500" />
                {getPopularityIcon(market.popularity)}
              </div>
              <h4 className="font-medium text-earth-800 text-sm mb-1">
                {market.name}
              </h4>
              <p className="text-xs text-earth-600">{market.location}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Expanded Suggestions */}
      <AnimatePresence>
        {(showSuggestions || searchQuery.length > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h4 className="text-md font-medium text-earth-700 mb-3">
              {searchQuery ? `Search Results (${filteredMarkets.length})` : 'All Markets'}
            </h4>
            
            <div className="max-h-96 overflow-y-auto space-y-2">
              {(searchQuery ? filteredMarkets : popularMarkets).map((market, index) => (
                <motion.button
                  key={index}
                  onClick={() => onMarketSelect(market.name)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className="w-full p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/80 transition-all text-left"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-earth-800 mb-1">
                        {market.name}
                      </h4>
                      <div className="flex items-center text-sm text-earth-600 mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {market.location}
                        {market.distance && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {market.distance}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded border ${getPopularityColor(market.popularity)}`}>
                        {market.popularity}
                      </span>
                      <span className="text-xs bg-earth-100 text-earth-700 px-2 py-1 rounded">
                        {market.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {market.speciality.map((spec, specIndex) => (
                      <span
                        key={specIndex}
                        className="text-xs bg-saffron-100 text-saffron-700 px-2 py-1 rounded"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>

            {searchQuery && filteredMarkets.length === 0 && (
              <div className="text-center py-8 text-earth-500">
                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No markets found matching "{searchQuery}"</p>
                <p className="text-sm mt-1">Try searching for a different market or location</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}