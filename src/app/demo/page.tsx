'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, TrendingUp, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import VoiceButton from '@/components/ui/VoiceButton';
import { mockProducts, mockGetPriceRecommendation, mockNegotiationSuggestions, languages } from '@/lib/mockData';
import { PriceData } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DemoPage() {
  const { t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [step, setStep] = useState(1);

  const handleVoiceToggle = (recording: boolean) => {
    setIsRecording(recording);
    if (recording) {
      // Simulate voice recognition
      setTimeout(() => {
        setSelectedProduct('Tomato');
        setIsRecording(false);
        setStep(2);
      }, 2000);
    }
  };

  const handleGetPrice = async () => {
    if (!selectedProduct) return;
    
    setIsLoading(true);
    setStep(3);
    
    try {
      const data = await mockGetPriceRecommendation(selectedProduct);
      setPriceData(data);
      setStep(4);
    } catch (error) {
      console.error('Error getting price:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-earth-800 mb-4">
            {t('demo.title')}
          </h1>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            {t('demo.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* Step 1: Language Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className={step >= 1 ? 'ring-2 ring-saffron-300' : ''}>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 gradient-saffron rounded-full flex items-center justify-center text-white font-bold mr-3">
                    1
                  </div>
                  <h3 className="font-display font-semibold text-xl text-earth-800">
                    {t('demo.step1')}
                  </h3>
                  {step > 1 && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedLanguage === lang.code
                          ? 'border-saffron-500 bg-saffron-50'
                          : 'border-gray-200 hover:border-saffron-300'
                      }`}
                    >
                      <div className="font-medium text-earth-800">{lang.name}</div>
                      <div className="text-sm text-earth-600">{lang.nativeName}</div>
                    </button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Step 2: Voice Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className={step >= 2 ? 'ring-2 ring-saffron-300' : ''}>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 gradient-saffron rounded-full flex items-center justify-center text-white font-bold mr-3">
                    2
                  </div>
                  <h3 className="font-display font-semibold text-xl text-earth-800">
                    {t('demo.step2')}
                  </h3>
                  {step > 2 && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                </div>
                
                <div className="text-center">
                  <VoiceButton 
                    onToggle={handleVoiceToggle}
                    className="mx-auto mb-4"
                  />
                  
                  {selectedProduct && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass p-4 rounded-lg"
                    >
                      <p className="text-earth-600 mb-2">{t('demo.recognized')}</p>
                      <p className="font-semibold text-lg text-earth-800">{selectedProduct}</p>
                    </motion.div>
                  )}
                  
                  <p className="text-sm text-earth-600 mt-4">
                    Or select manually:
                  </p>
                  <select
                    value={selectedProduct}
                    onChange={(e) => {
                      setSelectedProduct(e.target.value);
                      if (e.target.value) setStep(2);
                    }}
                    className="mt-2 glass px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-saffron-500"
                  >
                    <option value="">{t('demo.chooseProduct')}</option>
                    {mockProducts.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
              </GlassCard>
            </motion.div>

            {/* Step 3: Get Price */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className={step >= 3 ? 'ring-2 ring-saffron-300' : ''}>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 gradient-saffron rounded-full flex items-center justify-center text-white font-bold mr-3">
                    3
                  </div>
                  <h3 className="font-display font-semibold text-xl text-earth-800">
                    {t('demo.step3')}
                  </h3>
                  {step > 3 && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                </div>
                
                <button
                  onClick={handleGetPrice}
                  disabled={!selectedProduct || isLoading}
                  className="w-full gradient-saffron text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t('demo.analyzingMarket')}</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5" />
                      <span>{t('demo.getFairPrice')}</span>
                    </>
                  )}
                </button>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <AnimatePresence>
              {priceData && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <GlassCard glow>
                    <div className="flex items-center mb-6">
                      <TrendingUp className="w-6 h-6 text-saffron-500 mr-3" />
                      <h3 className="font-display font-semibold text-2xl text-earth-800">
                        {t('demo.priceAnalysis')} {priceData.product}
                      </h3>
                    </div>

                    {/* Current Price */}
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-saffron-600 mb-2">
                        ₹{priceData.currentPrice}/kg
                      </div>
                      <div className="flex items-center justify-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDemandColor(priceData.demandIndicator)}`}>
                          {priceData.demandIndicator.toUpperCase()} DEMAND
                        </span>
                        <span className="text-earth-600">
                          {getTrendIcon(priceData.trend)} {priceData.trend.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Fair Price Range */}
                    <div className="glass p-4 rounded-lg mb-6">
                      <h4 className="font-semibold text-earth-800 mb-2">{t('demo.fairPriceRange')}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-earth-600">₹{priceData.fairPriceRange.min}</span>
                        <div className="flex-1 mx-4 h-2 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-full relative">
                          <div 
                            className="absolute w-3 h-3 bg-saffron-500 rounded-full -top-0.5 transform -translate-x-1/2"
                            style={{ 
                              left: `${((priceData.currentPrice - priceData.fairPriceRange.min) / (priceData.fairPriceRange.max - priceData.fairPriceRange.min)) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="text-earth-600">₹{priceData.fairPriceRange.max}</span>
                      </div>
                    </div>

                    {/* Market Comparison */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-earth-800">{t('demo.nearbyMandis')}</h4>
                      {priceData.marketComparison.map((market, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-earth-200 last:border-0">
                          <span className="text-earth-600">{market.location}</span>
                          <span className="font-semibold text-earth-800">₹{market.price}/kg</span>
                        </div>
                      ))}
                    </div>

                    {/* Confidence */}
                    <div className="mt-6 text-center">
                      <div className="text-sm text-earth-600 mb-1">{t('demo.aiConfidence')}</div>
                      <div className="text-2xl font-bold text-mandi-green">{priceData.confidence}%</div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Negotiation Assistant */}
            <AnimatePresence>
              {priceData && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <GlassCard>
                    <div className="flex items-center mb-4">
                      <MessageSquare className="w-6 h-6 text-saffron-500 mr-3" />
                      <h3 className="font-display font-semibold text-xl text-earth-800">
                        {t('demo.negotiationAssistant')}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {mockNegotiationSuggestions.slice(0, 3).map((suggestion, index) => (
                        <div key={index} className="glass p-4 rounded-lg">
                          <div className="font-medium text-earth-800 mb-1">
                            {suggestion.phrase}
                          </div>
                          <div className="text-saffron-600 mb-2">
                            {suggestion.translation}
                          </div>
                          <div className="text-sm text-earth-500">
                            Use when: {suggestion.context}
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}