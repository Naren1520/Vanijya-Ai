'use client';

import { motion } from 'framer-motion';
import { Mic, Globe, Brain, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';

const steps = [
  {
    icon: Mic,
    titleKey: 'howItWorks.step1.title',
    descriptionKey: 'howItWorks.step1.desc',
    detailKey: 'howItWorks.step1.detail',
    color: 'from-saffron-400 to-saffron-600'
  },
  {
    icon: Globe,
    titleKey: 'howItWorks.step2.title',
    descriptionKey: 'howItWorks.step2.desc',
    detailKey: 'howItWorks.step2.detail',
    color: 'from-earth-400 to-earth-600'
  },
  {
    icon: Brain,
    titleKey: 'howItWorks.step3.title',
    descriptionKey: 'howItWorks.step3.desc',
    detailKey: 'howItWorks.step3.detail',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: MessageSquare,
    titleKey: 'howItWorks.step4.title',
    descriptionKey: 'howItWorks.step4.desc',
    detailKey: 'howItWorks.step4.detail',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: TrendingUp,
    titleKey: 'howItWorks.step5.title',
    descriptionKey: 'howItWorks.step5.desc',
    detailKey: 'howItWorks.step5.detail',
    color: 'from-purple-400 to-purple-600'
  }
];

const features = [
  {
    titleKey: 'howItWorks.voiceFirst',
    descriptionKey: 'howItWorks.voiceFirstDesc',
    icon: Mic
  },
  {
    titleKey: 'howItWorks.offlineCapable',
    descriptionKey: 'howItWorks.offlineCapableDesc',
    icon: Globe
  },
  {
    titleKey: 'howItWorks.culturalContext',
    descriptionKey: 'howItWorks.culturalContextDesc',
    icon: Brain
  },
  {
    titleKey: 'howItWorks.fairTrade',
    descriptionKey: 'howItWorks.fairTradeDesc',
    icon: CheckCircle
  }
];

export default function HowItWorksPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display font-bold text-5xl md:text-6xl text-earth-800 mb-6">
              {t('howItWorks.title')}
            </h1>
            <p className="text-xl md:text-2xl text-earth-600 max-w-4xl mx-auto leading-relaxed">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                {/* Step Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-earth-600 uppercase tracking-wide">
                        Step {index + 1}
                      </div>
                      <h3 className="font-display font-bold text-3xl text-earth-800">
                        {t(step.titleKey)}
                      </h3>
                      <div className="text-lg text-saffron-600 font-medium">
                        {t(step.descriptionKey)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-lg text-earth-600 leading-relaxed">
                    {t(step.detailKey)}
                  </p>
                  
                  {/* Progress indicator */}
                  <div className="flex items-center space-x-2">
                    {steps.map((_, stepIndex) => (
                      <div
                        key={stepIndex}
                        className={`w-3 h-3 rounded-full transition-all ${
                          stepIndex <= index 
                            ? 'bg-saffron-500' 
                            : 'bg-earth-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Step Visual */}
                <div className="flex-1">
                  <GlassCard className="p-8 text-center">
                    <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 animate-float`}>
                      <step.icon className="w-12 h-12 text-white" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-earth-800">
                        {t(step.titleKey)}
                      </div>
                      
                      {/* Mock interface based on step */}
                      {index === 0 && (
                        <div className="glass p-4 rounded-lg">
                          <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 animate-pulse" />
                          <div className="text-sm text-earth-600">"टमाटर का भाव क्या है?"</div>
                        </div>
                      )}
                      
                      {index === 1 && (
                        <div className="glass p-4 rounded-lg space-y-2">
                          <div className="text-sm text-earth-600">Hindi → English</div>
                          <div className="text-sm font-medium">"What is the price of tomatoes?"</div>
                        </div>
                      )}
                      
                      {index === 2 && (
                        <div className="glass p-4 rounded-lg">
                          <div className="text-2xl font-bold text-saffron-600">₹45/kg</div>
                          <div className="text-sm text-earth-600">Fair Price Range: ₹40-55</div>
                        </div>
                      )}
                      
                      {index === 3 && (
                        <div className="glass p-4 rounded-lg space-y-2">
                          <div className="text-sm font-medium">"आज बाज़ार भाव ज्यादा है"</div>
                          <div className="text-xs text-earth-600">Market rate is higher today</div>
                        </div>
                      )}
                      
                      {index === 4 && (
                        <div className="glass p-4 rounded-lg">
                          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <div className="text-sm text-earth-600">Fair Deal Completed</div>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-earth-800 mb-6">
              {t('howItWorks.builtForVendors')}
            </h2>
            <p className="text-xl text-earth-600 max-w-3xl mx-auto">
              {t('howItWorks.builtForVendorsDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <GlassCard hover className="text-center h-full">
                  <div className="w-16 h-16 gradient-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-earth-800 mb-4">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-earth-600 leading-relaxed">
                    {t(feature.descriptionKey)}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-earth-800 mb-6">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-earth-600 max-w-3xl mx-auto">
              Cutting-edge technology made simple and accessible for everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="h-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-earth-800">
                    Natural Language Processing
                  </h3>
                </div>
                <ul className="space-y-3 text-earth-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Multi-dialect recognition
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Context-aware translation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Market-specific vocabulary
                  </li>
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard className="h-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-earth-800">
                    Price Intelligence
                  </h3>
                </div>
                <ul className="space-y-3 text-earth-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Real-time market data
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Seasonal trend analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Regional price variations
                  </li>
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GlassCard className="h-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-earth-800">
                    Cultural Intelligence
                  </h3>
                </div>
                <ul className="space-y-3 text-earth-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Local negotiation styles
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Regional customs awareness
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Respectful communication
                  </li>
                </ul>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}