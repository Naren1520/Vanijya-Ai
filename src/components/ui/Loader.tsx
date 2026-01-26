'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoaderProps {
  onComplete?: () => void;
  duration?: number;
}

export default function Loader({ onComplete, duration = 3000 }: LoaderProps) {
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
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          // Use deterministic positioning based on index
          const leftPos = (i * 37) % 100; // Pseudo-random but deterministic
          const topPos = (i * 23 + 17) % 100;
          const xMovement = (i % 2 === 0 ? 1 : -1) * (50 + (i % 3) * 30);
          const yMovement = (i % 3 === 0 ? 1 : -1) * (30 + (i % 4) * 20);
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-saffron-400 rounded-full opacity-60"
              animate={{
                x: [0, xMovement],
                y: [0, yMovement],
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 5) * 0.4,
              }}
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
              }}
            />
          );
        })}
      </div>

      {/* Floating Grain Elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => {
          // Use deterministic positioning based on index
          const leftPos = (i * 47 + 13) % 100;
          const topPos = (i * 31 + 7) % 100;
          
          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-earth-400 rounded-full"
              animate={{
                x: [0, 150, 0],
                y: [0, -100, 0],
                rotate: [0, 360],
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

      {/* Main Loader Content */}
      <div className="relative z-10 text-center">
        {/* Logo Container with Circular Background */}
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
          {/* Circular Background with Gradient */}
          <div className="relative w-32 h-32 mx-auto">
            {/* Outer Ring Animation */}
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
                  strokeDasharray: "377", // 2 * π * 60
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

            {/* Floating Dots Around Logo */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * Math.PI) / 4; // Evenly distributed angles
              const radius = 20;
              const xPos = Math.cos(angle) * radius;
              const yPos = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-saffron-500 rounded-full"
                  animate={{
                    x: [0, xPos],
                    y: [0, yPos],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              );
            })}
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

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-80 max-w-sm mx-auto"
        >
          {/* Progress Bar Container */}
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
            exit={{ opacity: 0, y: -10 }}
            className="text-earth-600 font-medium"
          >
            {t(loadingText)}
          </motion.p>

          {/* Progress Percentage */}
          <motion.p
            className="text-saffron-600 font-bold text-lg mt-2"
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
          <p className="text-earth-500 text-sm">
            {t('loader.tagline')}
          </p>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-4 right-4 w-16 h-16 border-2 border-saffron-300 rounded-full opacity-30"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-12 h-12 border-2 border-earth-400 rounded-full opacity-30"
        animate={{ rotate: -360, scale: [1, 0.8, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}