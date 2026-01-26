'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-earth-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/80 to-saffron-50/80 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-saffron-500/20 group-hover:scale-105">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/Assets/logo.png"
                    alt="Vanijya AI Logo"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <span className="font-display font-bold text-xl transition-colors duration-300 group-hover:text-saffron-400">
                {t('appName')}
              </span>
            </Link>
            <p className="text-earth-300 mb-4 max-w-md">
              {t('tagline')}
            </p>
            <div className="flex items-center space-x-2 text-earth-300">
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/demo" className="text-earth-300 hover:text-saffron-400 transition-colors">
                  {t('nav.demo')}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-earth-300 hover:text-saffron-400 transition-colors">
                  {t('nav.howItWorks')}
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-earth-300 hover:text-saffron-400 transition-colors">
                  {t('nav.impact')}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-earth-300 hover:text-saffron-400 transition-colors">
                  {t('nav.dashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Languages
            </h3>
            <ul className="space-y-2 text-earth-300">
              <li>English</li>
              <li>हिंदी (Hindi)</li>
              <li>தமிழ் (Tamil)</li>
              <li>తెలుగు (Telugu)</li>
              <li>ಕನ್ನಡ (Kannada)</li>
              <li>मराठी (Marathi)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-earth-700 mt-8 pt-8 text-center text-earth-400">
          <p>&copy; 2026 {t('appName')}. Empowering vendors, one conversation at a time.</p>
        </div>
      </div>
    </footer>
  );
}