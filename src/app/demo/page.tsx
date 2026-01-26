'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, MapPin, MessageSquare } from 'lucide-react';
import VoiceButton from '@/components/ui/VoiceButton';
import { useLanguage } from '@/contexts/LanguageContext';

interface PriceAnalysis {
  product: string;
  fairPriceRange: { min: number; max: number };
  confidence: number;
  marketInsights: string[];
  negotiationTips: string[];
  nearbyMandis: Array<{ name: string; price: number; distance: string }>;
}

export default function DemoPage() {
  const { t, currentLanguage } = useLanguage();
  const [step, setStep] = useState(1);
  const [recognizedText, setRecognizedText] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [priceAnalysis, setPriceAnalysis] = useState<PriceAnalysis | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [negotiationPhrases, setNegotiationPhrases] = useState<string[]>([]);

  const products = [
    'Tomatoes', 'Onions', 'Potatoes', 'Rice', 'Wheat', 'Apples', 'Bananas', 'Carrots', 'Cabbage', 'Spinach'
  ];

  const handleVoiceResult = (text: string) => {
    setRecognizedText(text);
    setSelectedProduct(text);
    setStep(2);
  };

  const handleProductSelect = (product: string) => {
    setSelectedProduct(product);
    setRecognizedText(product);
    setStep(2);
  };

  const analyzePrice = async () => {
    if (!selectedProduct) return;

    setIsAnalyzing(true);
    setStep(3);

    try {
      const response = await fetch('/api/analyze-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: selectedProduct,
          language: currentLanguage
        }),
      });

      if (response.ok) {
        const analysis = await response.json();
        setPriceAnalysis(analysis);
        
        // Also get negotiation phrases
        if (analysis.fairPriceRange) {
          const avgPrice = (analysis.fairPriceRange.min + analysis.fairPriceRange.max) / 2;
          const targetPrice = avgPrice * 0.9; // 10% lower than average
          
          const phrasesResponse = await fetch('/api/negotiation-phrases', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product: selectedProduct,
              currentPrice: avgPrice,
              targetPrice: targetPrice,
              language: currentLanguage
            }),
          });
          
          if (phrasesResponse.ok) {
            const phrasesData = await phrasesResponse.json();
            setNegotiationPhrases(phrasesData.phrases || []);
          }
        }
      } else {
        // Fallback to mock data if API fails
        setPriceAnalysis({
          product: selectedProduct,
          fairPriceRange: { min: 50, max: 100 },
          confidence: 85,
          marketInsights: [
            "Seasonal demand is currently high",
            "Quality varies across different mandis",
            "Transportation costs affecting prices"
          ],
          negotiationTips: [
            "Compare prices with nearby mandis",
            "Consider bulk purchase discounts",
            "Check quality before finalizing price"
          ],
          nearbyMandis: [
            { name: "Central Mandi", price: 75, distance: "2 km" },
            { name: "Wholesale Market", price: 80, distance: "5 km" },
            { name: "Farmers Market", price: 70, distance: "3 km" }
          ]
        });
        
        setNegotiationPhrases([
          "Can we discuss a better price for bulk purchase?",
          "What's your best rate for regular customers?",
          "The quality looks good, but the price seems high",
          "Can you match the nearby mandi price?",
          "Let's find a fair price that works for both of us"
        ]);
      }
    } catch (error) {
      console.error('Price analysis error:', error);
      // Fallback to mock data
      setPriceAnalysis({
        product: selectedProduct,
        fairPriceRange: { min: 50, max: 100 },
        confidence: 0,
        marketInsights: ["AI analysis temporarily unavailable"],
        negotiationTips: ["Please try again later"],
        nearbyMandis: []
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setStep(1);
    setRecognizedText('');
    setSelectedProduct('');
    setPriceAnalysis(null);
    setNegotiationPhrases([]);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-earth-800 mb-4">
            {t('demo.title')}
          </h1>
          <p className="text-xl text-earth-600 mb-8">
            {t('demo.subtitle')}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNum 
                    ? 'bg-saffron-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <ArrowRight className={`w-5 h-5 mx-2 ${
                    step > stepNum ? 'text-saffron-500' : 'text-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="glass rounded-2xl p-8 mb-8">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-earth-800 mb-6">
                {t('demo.step1')}: {t('demo.step2')}
              </h2>
              
              <div className="mb-8">
                <VoiceButton 
                  onResult={handleVoiceResult}
                  onToggle={setIsListening}
                  className="mx-auto"
                />
                
                {/* Voice Instructions */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-earth-600 mb-2">
                    🎤 Click the microphone and speak clearly
                  </p>
                  <div className="text-xs text-earth-500 space-y-1">
                    <p>• Allow microphone access when prompted</p>
                    <p>• Speak the name of a product (e.g., "Tomatoes", "Rice")</p>
                    <p>• Wait for the recording to stop automatically</p>
                    <p>• Sample data will be used if voice recognition fails</p>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-earth-600 mb-4">(tell any product)Or choose a product:</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {products.map((product) => (
                    <button
                      key={product}
                      onClick={() => handleProductSelect(product)}
                      className="p-3 rounded-lg glass hover:bg-saffron-50/50 transition-colors text-sm font-medium text-earth-700"
                    >
                      {product}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-earth-800 mb-6">
                {t('demo.step3')}
              </h2>
              
              {recognizedText && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 mb-1">{t('demo.recognized')}</p>
                  <p className="text-lg font-semibold text-green-800">{recognizedText}</p>
                </div>
              )}

              <button
                onClick={analyzePrice}
                disabled={!selectedProduct}
                className="gradient-saffron text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('demo.getFairPrice')}
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {isAnalyzing ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-earth-600">{t('demo.analyzingMarket')}</p>
                </div>
              ) : priceAnalysis && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-earth-800 mb-2">
                      {t('demo.priceAnalysis')} {priceAnalysis.product}
                    </h2>
                  </div>

                  {/* Price Range */}
                  <div className="glass rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-earth-800 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-saffron-600" />
                        {t('demo.fairPriceRange')}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-saffron-600">
                          ₹{priceAnalysis.fairPriceRange.min} - ₹{priceAnalysis.fairPriceRange.max}
                        </div>
                        <div className="text-sm text-earth-600">
                          {t('demo.aiConfidence')}: {priceAnalysis.confidence}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Market Insights */}
                  {priceAnalysis.marketInsights.length > 0 && (
                    <div className="glass rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-earth-800 mb-4 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-saffron-600" />
                        Market Insights
                      </h3>
                      <ul className="space-y-2">
                        {priceAnalysis.marketInsights.map((insight, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-saffron-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-earth-700">{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Nearby Mandis */}
                  {priceAnalysis.nearbyMandis.length > 0 && (
                    <div className="glass rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-earth-800 mb-4 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-saffron-600" />
                        {t('demo.nearbyMandis')}
                      </h3>
                      <div className="grid gap-3">
                        {priceAnalysis.nearbyMandis.map((mandi, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                            <div>
                              <div className="font-medium text-earth-800">{mandi.name}</div>
                              <div className="text-sm text-earth-600">{mandi.distance}</div>
                            </div>
                            <div className="text-lg font-semibold text-saffron-600">
                              ₹{mandi.price}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Negotiation Assistant */}
                  {negotiationPhrases.length > 0 && (
                    <div className="glass rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-earth-800 mb-4 flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2 text-saffron-600" />
                        {t('demo.negotiationAssistant')}
                      </h3>
                      <div className="space-y-3">
                        {negotiationPhrases.map((phrase, index) => (
                          <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-blue-800">{phrase}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      onClick={resetAnalysis}
                      className="bg-earth-600 text-white px-6 py-2 rounded-lg hover:bg-earth-700 transition-colors"
                    >
                      Try Another Product
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}