'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe, Menu, X, User, LogOut, ChevronDown, Users, Package, BarChart3, Cloud } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const languages = [
  { code: 'en' as Language, name: 'English' },
  { code: 'hi' as Language, name: 'हिंदी' },
  { code: 'ta' as Language, name: 'தமிழ்' },
  { code: 'te' as Language, name: 'తెలుగు' },
  { code: 'kn' as Language, name: 'ಕನ್ನಡ' },
  { code: 'mr' as Language, name: 'मराठी' },
];

const features = [
  {
    name: 'Buyer-Seller Connections',
    href: '/features/buyer-seller',
    icon: Users,
    description: 'Direct connections with verified buyers and sellers'
  },
  {
    name: 'Smart Inventory',
    href: '/features/inventory',
    icon: Package,
    description: 'AI-powered inventory management with insights'
  },
  {
    name: 'Live Market Data',
    href: '/features/live-data',
    icon: BarChart3,
    description: 'Real-time market data feeds and chat interface'
  },
  {
    name: 'Weather Insights',
    href: '/features/weather',
    icon: Cloud,
    description: 'Real-time weather data and agricultural insights'
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, signOutUser } = useAuth();

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
            
            {/* Features Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowFeaturesMenu(true)}
              onMouseLeave={() => setShowFeaturesMenu(false)}
            >
              <button
                className="flex items-center space-x-1 text-earth-700 hover:text-saffron-600 transition-colors py-2"
              >
                <span>Features</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showFeaturesMenu && (
                <>
                  {/* Invisible bridge to prevent dropdown from closing */}
                  <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  >
                    {features.map((feature) => (
                      <Link
                        key={feature.href}
                        href={feature.href}
                        className="flex items-start space-x-3 px-4 py-3 text-sm text-earth-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowFeaturesMenu(false)}
                      >
                        <feature.icon className="w-5 h-5 text-saffron-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{feature.name}</div>
                          <div className="text-xs text-earth-600 mt-1">{feature.description}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                </>
              )}
            </div>
            
            <Link href="/how-it-works" className="text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.howItWorks')}
            </Link>
            <Link href="/impact" className="text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.impact')}
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="text-earth-700 hover:text-saffron-600 transition-colors">
                {t('nav.dashboard')}
              </Link>
            )}
            
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

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 glass px-3 py-2 rounded-lg hover:bg-white/40 transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-saffron-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-earth-700">{user.name}</span>
                </button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-lg shadow-xl border border-white/40 py-2"
                  >
                    <div className="px-4 py-2 border-b border-white/20">
                      <p className="text-sm font-medium text-earth-800">{user.name}</p>
                      <p className="text-xs text-earth-600">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-earth-700 hover:bg-white/20 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        signOutUser();
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="gradient-saffron text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Sign In
              </Link>
            )}
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
            
            {/* Mobile Features */}
            <div className="space-y-2">
              <div className="text-earth-700 font-medium">Features</div>
              {features.map((feature) => (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="flex items-center space-x-2 pl-4 text-earth-600 hover:text-saffron-600 transition-colors"
                >
                  <feature.icon className="w-4 h-4" />
                  <span>{feature.name}</span>
                </Link>
              ))}
            </div>
            
            <Link href="/how-it-works" className="block text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.howItWorks')}
            </Link>
            <Link href="/impact" className="block text-earth-700 hover:text-saffron-600 transition-colors">
              {t('nav.impact')}
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="block text-earth-700 hover:text-saffron-600 transition-colors">
                {t('nav.dashboard')}
              </Link>
            )}
            
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

            {/* Mobile User Menu */}
            {isAuthenticated && user ? (
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-saffron-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-earth-800">{user.name}</p>
                    <p className="text-sm text-earth-600">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={signOutUser}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="block gradient-saffron text-white px-4 py-2 rounded-lg font-medium text-center"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
}