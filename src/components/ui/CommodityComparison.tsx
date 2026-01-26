'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Commodity {
  name: string;
  currentPrice: number;
  unit: string;
  category: string;
  priceChange: string;
  demandLevel: string;
  qualityGrade: string;
}

interface CommodityComparisonProps {
  commodities: Commodity[];
  onCommoditySelect: (commodity: Commodity) => void;
  selectedCommodity?: Commodity;
}

export default function CommodityComparison({ 
  commodities, 
  onCommoditySelect, 
  selectedCommodity 
}: CommodityComparisonProps) {
  const chartData = commodities.map(commodity => ({
    name: commodity.name,
    price: commodity.currentPrice,
    change: parseFloat(commodity.priceChange.replace(/[+\-%]/g, '')),
    isPositive: commodity.priceChange.startsWith('+'),
  }));

  const getTrendIcon = (change: string) => {
    if (change.startsWith('+')) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (change.startsWith('-')) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  const getDemandColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vegetable': return 'bg-green-50 text-green-700';
      case 'grain': return 'bg-amber-50 text-amber-700';
      case 'spice': return 'bg-orange-50 text-orange-700';
      case 'fruit': return 'bg-pink-50 text-pink-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Price Comparison Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number | undefined) => [`₹${value || 0}`, 'Price']}
            />
            <Bar 
              dataKey="price" 
              fill="#f97316"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Commodity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {commodities.map((commodity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onCommoditySelect(commodity)}
            className={`
              cursor-pointer p-4 rounded-lg border-2 transition-all duration-200
              ${selectedCommodity?.name === commodity.name 
                ? 'border-saffron-500 bg-saffron-50' 
                : 'border-transparent bg-white/60 hover:bg-white/80'
              }
              backdrop-blur-sm shadow-sm hover:shadow-md
            `}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-lg text-earth-800">
                  {commodity.name}
                </h4>
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(commodity.category)}`}>
                  {commodity.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-saffron-600">
                  ₹{commodity.currentPrice}
                </div>
                <div className="text-xs text-earth-500">
                  per {commodity.unit}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {getTrendIcon(commodity.priceChange)}
                <span className={`text-sm font-medium ${getChangeColor(commodity.priceChange)}`}>
                  {commodity.priceChange}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full border ${getDemandColor(commodity.demandLevel)}`}>
                  {commodity.demandLevel}
                </span>
                <span className="text-xs text-earth-500 bg-earth-100 px-2 py-1 rounded">
                  Grade {commodity.qualityGrade}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}