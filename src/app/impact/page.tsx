'use client';

import { motion } from 'framer-motion';
import { Users, Globe, TrendingUp, MapPin, Heart, Star, Quote } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';

const impactStats = [
  {
    icon: Users,
    numberKey: 'impact.vendorsEmpowered',
    labelKey: 'impact.vendorsEmpowered',
    descriptionKey: 'impact.vendorsEmpoweredDesc',
    color: 'from-saffron-400 to-saffron-600'
  },
  {
    icon: Globe,
    numberKey: 'impact.languagesSupported',
    labelKey: 'impact.languagesSupported',
    descriptionKey: 'impact.languagesSupportedDesc',
    color: 'from-earth-400 to-earth-600'
  },
  {
    icon: TrendingUp,
    numberKey: 'impact.priceTransparency',
    labelKey: 'impact.priceTransparency',
    descriptionKey: 'impact.priceTransparencyDesc',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: MapPin,
    numberKey: 'impact.mandisConnected',
    labelKey: 'impact.mandisConnected',
    descriptionKey: 'impact.mandisConnectedDesc',
    color: 'from-blue-400 to-blue-600'
  }
];

const testimonials = [
  {
    name: 'राजेश कुमार',
    location: 'Azadpur Mandi, Delhi',
    quote: 'पहले भाषा की समस्या से सही दाम नहीं मिलता था। अब AI की मदद से अच्छा व्यापार हो रहा है।',
    translation: 'Earlier, language barriers prevented fair pricing. Now with AI help, business is thriving.',
    rating: 5
  },
  {
    name: 'Lakshmi Devi',
    location: 'Koyambedu Market, Chennai',
    quote: 'இந்த ஆப் மூலம் நான் என் தமிழில் பேசி நல்ல விலை பெற முடிகிறது. மிகவும் உபயோகமாக இருக்கிறது.',
    translation: 'Through this app, I can speak in Tamil and get good prices. Very useful.',
    rating: 5
  },
  {
    name: 'Suresh Patil',
    location: 'Pune Mandi, Maharashtra',
    quote: 'मराठीत बोलून मला योग्य दर मिळतो. हे तंत्रज्ञान खरोखरच आमच्या कामी येते.',
    translation: 'Speaking in Marathi, I get fair rates. This technology really helps our work.',
    rating: 5
  }
];

const stateData = [
  { state: 'Maharashtra', vendors: 2500, growth: '+25%' },
  { state: 'Karnataka', vendors: 1800, growth: '+30%' },
  { state: 'Tamil Nadu', vendors: 1600, growth: '+22%' },
  { state: 'Telangana', vendors: 1200, growth: '+35%' },
  { state: 'Delhi', vendors: 1000, growth: '+20%' },
  { state: 'Uttar Pradesh', vendors: 1900, growth: '+28%' }
];

export default function ImpactPage() {
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
              {t('impact.title')}
            </h1>
            <p className="text-xl md:text-2xl text-earth-600 max-w-4xl mx-auto leading-relaxed">
              {t('impact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard hover className="text-center h-full">
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-earth-800 mb-2">
                    {index === 0 ? '10,000+' : index === 1 ? '6' : index === 2 ? '95%' : '500+'}
                  </div>
                  <div className="text-xl font-semibold text-saffron-600 mb-3">
                    {t(stat.labelKey)}
                  </div>
                  <p className="text-earth-600 leading-relaxed">
                    {t(stat.descriptionKey)}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* India Map Visualization */}
      <section className="py-20 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-earth-800 mb-6">
              {t('impact.spreadingAcrossIndia')}
            </h2>
            <p className="text-xl text-earth-600 max-w-3xl mx-auto">
              {t('impact.spreadingDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-8">
                <div className="aspect-square bg-gradient-to-br from-saffron-100 to-earth-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-saffron-500 mx-auto mb-4" />
                    <h3 className="font-display font-semibold text-2xl text-earth-800 mb-2">
                      15 {t('impact.statesConnected')}
                    </h3>
                    <p className="text-earth-600">
                      500+ {t('impact.mandisAcrossIndia')}
                    </p>
                  </div>
                  
                  {/* Animated dots representing mandis */}
                  {[...Array(12)].map((_, i) => {
                    // Use deterministic positioning based on index
                    const leftPos = 20 + ((i * 43 + 17) % 60); // Deterministic but varied
                    const topPos = 20 + ((i * 31 + 23) % 60);
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-saffron-500 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        style={{
                          left: `${leftPos}%`,
                          top: `${topPos}%`,
                        }}
                      />
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>

            {/* State-wise Data */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h3 className="font-display font-semibold text-2xl text-earth-800 mb-6">
                {t('impact.stateWiseGrowth')}
              </h3>
              
              {stateData.map((state, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-earth-800">{state.state}</div>
                        <div className="text-sm text-earth-600">{state.vendors} vendors</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 font-semibold">{state.growth}</div>
                        <div className="text-sm text-earth-600">{t('impact.growth')}</div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-earth-800 mb-6">
              {t('impact.voicesFromMandi')}
            </h2>
            <p className="text-xl text-earth-600 max-w-3xl mx-auto">
              {t('impact.voicesDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <GlassCard hover className="h-full">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-saffron-500 mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="text-earth-700 mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="text-sm text-earth-600 italic mb-4">
                    "{testimonial.translation}"
                  </div>
                  
                  <div className="border-t border-earth-200 pt-4">
                    <div className="font-semibold text-earth-800">{testimonial.name}</div>
                    <div className="text-sm text-earth-600">{testimonial.location}</div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-saffron-500 to-earth-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
              {t('impact.mission')}
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              {t('impact.missionDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-lg">
              <div className="flex items-center">
                <Users className="w-6 h-6 mr-2" />
                <span>{t('impact.inclusiveTech')}</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                <span>{t('impact.fairTrade')}</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-6 h-6 mr-2" />
                <span>{t('impact.culturalRespect')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-earth-800 mb-6">
              {t('impact.lookingAhead')}
            </h2>
            <p className="text-xl text-earth-600 max-w-3xl mx-auto">
              {t('impact.lookingAheadDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="text-center h-full">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-display font-semibold text-xl text-earth-800 mb-4">
                  {t('impact.goal1')}
                </h3>
                <p className="text-earth-600">
                  {t('impact.goal1Desc')}
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard className="text-center h-full">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="font-display font-semibold text-xl text-earth-800 mb-4">
                  {t('impact.goal2')}
                </h3>
                <p className="text-earth-600">
                  {t('impact.goal2Desc')}
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GlassCard className="text-center h-full">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="font-display font-semibold text-xl text-earth-800 mb-4">
                  {t('impact.goal3')}
                </h3>
                <p className="text-earth-600">
                  {t('impact.goal3Desc')}
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}