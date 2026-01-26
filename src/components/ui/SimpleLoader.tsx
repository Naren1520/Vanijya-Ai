'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SimpleLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

export default function SimpleLoader({ onComplete, duration = 3000 }: SimpleLoaderProps) {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');

  const loadingSteps = [
    'loader.initializing',
    'loader.loadingAI',
    'loader.connectingMandis',
    'loader.settingLanguages',
    'loader.readyToServe'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        
        // Update loading text based on progress
        if (newProgress <= 20) {
          setLoadingText(loadingSteps[0]);
        } else if (newProgress <= 40) {
          setLoadingText(loadingSteps[1]);
        } else if (newProgress <= 60) {
          setLoadingText(loadingSteps[2]);
        } else if (newProgress <= 80) {
          setLoadingText(loadingSteps[3]);
        } else if (newProgress <= 100) {
          setLoadingText(loadingSteps[4]);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete?.();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-100 overflow-hidden">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-saffron-300 rounded-full animate-pulse" />
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-earth-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-saffron-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-earth-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main Loader Content */}
      <div className="relative z-10 text-center">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
          className="relative mb-8"
        >
          <div className="relative w-32 h-32 mx-auto">
            {/* Rotating Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-saffron-200"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-earth-200"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-saffron-500"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  strokeDasharray: "377",
                  strokeDashoffset: 377 * (1 - progress / 100),
                }}
              />
            </svg>

            {/* Logo Container */}
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-br from-white/80 to-saffron-50/80 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg overflow-hidden"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(249, 115, 22, 0.3)",
                  "0 0 40px rgba(249, 115, 22, 0.6)",
                  "0 0 20px rgba(249, 115, 22, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/Assets/logo.png"
                  alt="Vanijya AI Logo"
                  width={72}
                  height={72}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-2">
            <span className="text-gradient">{t('appName').split(' ')[0]}</span>
            <span className="text-earth-800 ml-2">{t('appName').split(' ')[1]}</span>
          </h1>
          <p className="text-earth-600 text-lg">
            {t('tagline')}
          </p>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-80 max-w-sm mx-auto"
        >
          {/* Progress Bar */}
          <div className="glass rounded-full p-1 mb-4">
            <div className="relative h-3 bg-earth-100 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-saffron-400 to-saffron-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-80, 320] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Loading Text */}
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-earth-600 font-medium mb-2"
          >
            {t(loadingText)}
          </motion.p>

          {/* Progress Percentage */}
          <motion.p
            className="text-saffron-600 font-bold text-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
        </motion.div>
      </div>
    </div>
  );
}