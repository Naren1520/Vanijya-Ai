'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Mic, Globe, TrendingUp, Users, Shield, Zap } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-100">
          <div className="absolute inset-0 opacity-30">
            {/* Floating grain particles */}
            {[...Array(20)].map((_, i) => {
              // Use deterministic positioning based on index
              const leftPos = (i * 37 + 13) % 100; // Pseudo-random but deterministic
              const topPos = (i * 23 + 7) % 100;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-saffron-400 rounded-full"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 8 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${leftPos}%`,
                    top: `${topPos}%`,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-6">
              <span className="text-gradient">{t('hero.title1')}</span>
              <br />
              <span className="text-earth-800">{t('hero.title2')}</span>
              <br />
              <span className="text-saffron-600">{t('hero.title3')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-earth-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="gradient-saffron text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Mic className="w-5 h-5" />
                  <span>{t('hero.tryDemo')}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link href="/how-it-works">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass px-8 py-4 rounded-xl font-semibold text-lg text-earth-700 hover:bg-white/30 transition-all"
                >
                  {t('hero.howItWorks')}
                </motion.button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 text-earth-600">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-saffron-500" />
                <span className="font-medium">{t('hero.trustBadge1')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-mandi-green" />
                <span className="font-medium">{t('hero.trustBadge2')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-saffron-500" />
                <span className="font-medium">{t('hero.trustBadge3')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-earth-800 mb-6">
              {t('features.title')}
            </h2>
            <p className="text-xl text-earth-600 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <GlassCard hover className="text-center h-full">
                <div className="w-16 h-16 gradient-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-earth-800 mb-4">
                  {t('features.multilingual.title')}
                </h3>
                <p className="text-earth-600 leading-relaxed">
                  {t('features.multilingual.desc')}
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard hover className="text-center h-full">
                <div className="w-16 h-16 gradient-earth rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-earth-800 mb-4">
                  {t('features.pricing.title')}
                </h3>
                <p className="text-earth-600 leading-relaxed">
                  {t('features.pricing.desc')}
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <GlassCard hover className="text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-mandi-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-earth-800 mb-4">
                  {t('features.negotiation.title')}
                </h3>
                <p className="text-earth-600 leading-relaxed">
                  {t('features.negotiation.desc')}
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-saffron-500 to-earth-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Vendors Empowered</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">6</div>
              <div className="text-lg opacity-90">Languages Supported</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Price Accuracy</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Mandis Connected</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earth-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-earth-800 mb-6">
              Ready to Transform Your Mandi Experience?
            </h2>
            <p className="text-xl text-earth-600 mb-8">
              Join thousands of vendors who are already using AI to get fair prices 
              and communicate effectively across language barriers.
            </p>
            
            <Link href="/demo">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-saffron text-white px-12 py-6 rounded-xl font-semibold text-xl flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transition-all ai-glow"
              >
                <Mic className="w-6 h-6" />
                <span>Start Speaking Your Language</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}