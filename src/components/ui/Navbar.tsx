'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const languages = [
  { code: 'en' as Language, name: 'English' },
  { code: 'hi' as Language, name: 'हिंदी' },
  { code: 'ta' as Language, name: 'தமிழ்' },
  { code: 'te' as Language, name: 'తెలుగు' },
  { code: 'kn' as Language, name: 'ಕನ್ನಡ' },
  { code: 'mr' as Language, name: 'मराठी' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();

  // Load saved language on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('vanijya-language') as Language;
      if (savedLang && languages.find(l => l.code === savedLang)) {
        setLanguage(savedLang);
      }
    }
  }, [setLanguage]);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/80 to-saffron-50/80 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-saffron-500/20 group-hover:scale-105">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/Assets/logo.png"
                  alt="Vanijya AI Logo"
                  width={28}
                  height={28}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
            <span className="font-display font-bold text-xl text-earth-800 transition-colors duration-300 group-hover:text-saffron-600">
              {t('appName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/demo" className="text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.demo')}
            </Link>
            <Link href="/how-it-works" className="text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.howItWorks')}
            </Link>
            <Link href="/impact" className="text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.impact')}
            </Link>
            <Link href="/dashboard" className="text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.dashboard')}
            </Link>
            
            {/* Language Selector */}
            <div className="relative">
              <select 
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="glass pl-3 pr-8 py-2 rounded-lg text-sm font-medium text-earth-700 border-0 focus:ring-2 focus:ring-saffron-500 appearance-none cursor-pointer min-w-[100px] hover:bg-white/40 transition-all duration-200"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-earth-600 pointer-events-none transition-colors duration-200" />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 space-y-4"
          >
            <Link href="/demo" className="block text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.demo')}
            </Link>
            <Link href="/how-it-works" className="block text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.howItWorks')}
            </Link>
            <Link href="/impact" className="block text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.impact')}
            </Link>
            <Link href="/dashboard" className="block text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.dashboard')}
            </Link>
            
            <select 
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full glass px-3 py-2 rounded-lg text-sm font-medium text-earth-700 border-0"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </motion.div>
        )}
      </div>
    </nav>
  );
}