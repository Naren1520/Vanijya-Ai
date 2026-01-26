'use client';

import { useLanguage, Language } from '@/contexts/LanguageContext';
import GlassCard from '@/components/ui/GlassCard';

const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta' as Language, name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te' as Language, name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn' as Language, name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'mr' as Language, name: 'Marathi', nativeName: 'मराठी' },
];

export default function LanguageTestPage() {
  const { currentLanguage, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-earth-800 mb-4">
            Language Translation Test
          </h1>
          <p className="text-xl text-earth-600">
            Click on any language below to see the content change in real-time
          </p>
        </div>

        {/* Language Selector */}
        <GlassCard className="mb-8">
          <h2 className="font-display font-semibold text-2xl text-earth-800 mb-6 text-center">
            Select Language / भाषा चुनें / மொழியைத் தேர்ந்தெடுக்கவும்
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentLanguage === lang.code
                    ? 'border-saffron-500 bg-saffron-50 text-saffron-700'
                    : 'border-earth-200 hover:border-saffron-300 hover:bg-white/50'
                }`}
              >
                <div className="font-semibold text-lg">{lang.nativeName}</div>
                <div className="text-sm text-earth-600">{lang.name}</div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Translated Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard>
            <h3 className="font-display font-semibold text-xl text-earth-800 mb-4">
              App Information
            </h3>
            <div className="space-y-3">
              <div>
                <strong>App Name:</strong> {t('appName')}
              </div>
              <div>
                <strong>Tagline:</strong> {t('tagline')}
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-display font-semibold text-xl text-earth-800 mb-4">
              Navigation
            </h3>
            <div className="space-y-2">
              <div>• {t('nav.demo')}</div>
              <div>• {t('nav.howItWorks')}</div>
              <div>• {t('nav.impact')}</div>
              <div>• {t('nav.dashboard')}</div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-display font-semibold text-xl text-earth-800 mb-4">
              Hero Section
            </h3>
            <div className="space-y-2">
              <div><strong>Title:</strong> {t('hero.title1')} {t('hero.title2')} {t('hero.title3')}</div>
              <div><strong>Subtitle:</strong> {t('hero.subtitle')}</div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-display font-semibold text-xl text-earth-800 mb-4">
              Features
            </h3>
            <div className="space-y-2">
              <div><strong>Title:</strong> {t('features.title')}</div>
              <div><strong>Multilingual:</strong> {t('features.multilingual.title')}</div>
              <div><strong>Pricing:</strong> {t('features.pricing.title')}</div>
              <div><strong>Negotiation:</strong> {t('features.negotiation.title')}</div>
            </div>
          </GlassCard>
        </div>

        <div className="mt-8 text-center">
          <GlassCard>
            <h3 className="font-display font-semibold text-xl text-earth-800 mb-4">
              Current Language: {languages.find(l => l.code === currentLanguage)?.nativeName}
            </h3>
            <p className="text-earth-600">
              The entire application will now display content in the selected language. 
              Navigate to other pages to see the translation in action!
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}