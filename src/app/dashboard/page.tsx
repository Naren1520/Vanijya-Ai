'use client';

import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Clock, Lightbulb, IndianRupee, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';
import { mockVendorAnalytics } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DashboardPage() {
  const { t } = useLanguage();
  const analytics = mockVendorAnalytics;

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
          <p className="text-xl text-earth-600">
            {t('dashboard.subtitle')}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-earth-600 text-sm font-medium">{t('dashboard.todayPrice')}</p>
                  <p className="text-3xl font-bold text-saffron-600">₹{analytics.todayPrice}</p>
                  <p className="text-sm text-mandi-green">+12% from yesterday</p>
                </div>
                <div className="w-12 h-12 gradient-saffron rounded-full flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-white" />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-earth-600 text-sm font-medium">{t('dashboard.weeklyAverage')}</p>
                  <p className="text-3xl font-bold text-earth-800">₹43</p>
                  <p className="text-sm text-mandi-green">{t('dashboard.trendingUp')}</p>
                </div>
                <div className="w-12 h-12 gradient-earth rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-earth-600 text-sm font-medium">{t('dashboard.bestTime')}</p>
                  <p className="text-lg font-bold text-earth-800">Fri-Sat</p>
                  <p className="text-sm text-earth-600">{t('dashboard.peakDemand')}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-mandi-green to-green-600 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-earth-600 text-sm font-medium">{t('dashboard.nearbyMandis')}</p>
                  <p className="text-3xl font-bold text-earth-800">{analytics.nearbyMandis.length}</p>
                  <p className="text-sm text-earth-600">{t('dashboard.connected')}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Price Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard>
              <div className="flex items-center mb-6">
                <BarChart3 className="w-6 h-6 text-saffron-500 mr-3" />
                <h3 className="font-display font-semibold text-2xl text-earth-800">
                  {t('dashboard.weeklyTrend')}
                </h3>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.weeklyTrend}>
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

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard glow>
              <div className="flex items-center mb-6">
                <Lightbulb className="w-6 h-6 text-saffron-500 mr-3" />
                <h3 className="font-display font-semibold text-2xl text-earth-800">
                  {t('dashboard.aiInsights')}
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="glass p-6 rounded-lg">
                  <div className="text-lg font-semibold text-earth-800 mb-3">
                    💡 {t('dashboard.todayRecommendation')}
                  </div>
                  <p className="text-earth-600 leading-relaxed">
                    {analytics.aiInsight}
                  </p>
                </div>

                <div className="glass p-6 rounded-lg">
                  <div className="text-lg font-semibold text-earth-800 mb-3">
                    📈 {t('dashboard.marketPrediction')}
                  </div>
                  <p className="text-earth-600 leading-relaxed">
                    Prices are expected to rise by 8-12% next week due to reduced supply 
                    from neighboring states. Consider holding inventory if possible.
                  </p>
                </div>

                <div className="glass p-6 rounded-lg">
                  <div className="text-lg font-semibold text-earth-800 mb-3">
                    🎯 {t('dashboard.optimizationTip')}
                  </div>
                  <p className="text-earth-600 leading-relaxed">
                    Your best selling hours are 8-10 AM and 4-6 PM. Focus your premium 
                    stock during these peak demand windows.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Nearby Mandis Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <GlassCard>
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-saffron-500 mr-3" />
              <h3 className="font-display font-semibold text-2xl text-earth-800">
                {t('dashboard.mandisComparison')}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analytics.nearbyMandis.map((mandi, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="glass p-6 rounded-lg text-center"
                >
                  <h4 className="font-semibold text-lg text-earth-800 mb-2">
                    {mandi.name}
                  </h4>
                  <p className="text-earth-600 mb-3">{mandi.distance}</p>
                  <div className="text-2xl font-bold text-saffron-600 mb-2">
                    ₹{mandi.avgPrice}/kg
                  </div>
                  <div className={`text-sm font-medium ${
                    mandi.avgPrice > analytics.todayPrice 
                      ? 'text-green-600' 
                      : mandi.avgPrice < analytics.todayPrice 
                        ? 'text-red-600' 
                        : 'text-gray-600'
                  }`}>
                    {mandi.avgPrice > analytics.todayPrice 
                      ? `+₹${mandi.avgPrice - analytics.todayPrice} higher` 
                      : mandi.avgPrice < analytics.todayPrice 
                        ? `-₹${analytics.todayPrice - mandi.avgPrice} lower`
                        : 'Same price'
                    }
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}