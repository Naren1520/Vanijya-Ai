'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Star, MapPin, Phone, Mail, Filter, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface BuyerSeller {
  id: string;
  name: string;
  type: 'buyer' | 'seller';
  location: string;
  commodities: string[];
  rating: number;
  phone: string;
  email: string;
  description: string;
  verified: boolean;
  lastActive: string;
}

export default function BuyerSellerPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [connections, setConnections] = useState<BuyerSeller[]>([]);
  const [filter, setFilter] = useState<'all' | 'buyer' | 'seller'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');

  useEffect(() => {
    // Mock data for demonstration
    const mockConnections: BuyerSeller[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        type: 'seller',
        location: 'Delhi, India',
        commodities: ['Tomatoes', 'Onions', 'Potatoes'],
        rating: 4.8,
        phone: '+91 98765 43210',
        email: 'rajesh@example.com',
        description: 'Wholesale vegetable supplier with 15+ years experience',
        verified: true,
        lastActive: '2 hours ago'
      },
      {
        id: '2',
        name: 'Priya Sharma',
        type: 'buyer',
        location: 'Mumbai, India',
        commodities: ['Rice', 'Wheat', 'Pulses'],
        rating: 4.6,
        phone: '+91 87654 32109',
        email: 'priya@example.com',
        description: 'Restaurant chain procurement manager',
        verified: true,
        lastActive: '1 hour ago'
      },
      {
        id: '3',
        name: 'Suresh Patel',
        type: 'seller',
        location: 'Gujarat, India',
        commodities: ['Cotton', 'Groundnut', 'Cumin'],
        rating: 4.9,
        phone: '+91 76543 21098',
        email: 'suresh@example.com',
        description: 'Farmer producer organization representative',
        verified: true,
        lastActive: '30 minutes ago'
      }
    ];
    setConnections(mockConnections);
  }, []);

  const filteredConnections = connections.filter(connection => {
    const matchesFilter = filter === 'all' || connection.type === filter;
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCommodity = !selectedCommodity || 
                            connection.commodities.some(c => c.toLowerCase().includes(selectedCommodity.toLowerCase()));
    
    return matchesFilter && matchesSearch && matchesCommodity;
  });

  const allCommodities = Array.from(new Set(connections.flatMap(c => c.commodities)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            Direct Buyer-Seller Connections
          </h1>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            Connect directly with verified buyers and sellers in your region. Build lasting business relationships.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-500" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass rounded-lg border-0 focus:ring-2 focus:ring-saffron-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'buyer' | 'seller')}
              className="glass px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-saffron-500"
            >
              <option value="all">All Types</option>
              <option value="buyer">Buyers</option>
              <option value="seller">Sellers</option>
            </select>

            {/* Commodity Filter */}
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="glass px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-saffron-500"
            >
              <option value="">All Commodities</option>
              {allCommodities.map(commodity => (
                <option key={commodity} value={commodity}>{commodity}</option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
                setSelectedCommodity('');
              }}
              className="gradient-saffron text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((connection, index) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass rounded-2xl p-6 card-hover"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                    connection.type === 'buyer' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {connection.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-earth-800">{connection.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        connection.type === 'buyer' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {connection.type.charAt(0).toUpperCase() + connection.type.slice(1)}
                      </span>
                      {connection.verified && (
                        <span className="text-green-500 text-xs">✓ Verified</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{connection.rating}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="w-4 h-4 text-earth-500" />
                <span className="text-sm text-earth-600">{connection.location}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-earth-600 mb-4">{connection.description}</p>

              {/* Commodities */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-earth-700 mb-2">Commodities:</h4>
                <div className="flex flex-wrap gap-1">
                  {connection.commodities.map(commodity => (
                    <span
                      key={commodity}
                      className="px-2 py-1 bg-saffron-100 text-saffron-700 text-xs rounded-full"
                    >
                      {commodity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 gradient-saffron text-white px-3 py-2 rounded-lg text-sm hover:shadow-lg transition-all duration-300">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </button>
              </div>

              {/* Last Active */}
              <div className="mt-3 text-xs text-earth-500 text-center">
                Last active: {connection.lastActive}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredConnections.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="w-16 h-16 text-earth-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-earth-600 mb-2">No connections found</h3>
            <p className="text-earth-500">Try adjusting your filters or search terms</p>
          </motion.div>
        )}

        {/* CTA Section */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-8 text-center mt-12"
          >
            <h3 className="text-2xl font-bold text-earth-800 mb-4">
              Join Our Network
            </h3>
            <p className="text-earth-600 mb-6">
              Sign up to connect with verified buyers and sellers in your area
            </p>
            <button className="gradient-saffron text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              Get Started
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}