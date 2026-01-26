'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Sparkles, Zap } from 'lucide-react';
import Loader from './Loader';
import SimpleLoader from './SimpleLoader';

export default function LoaderDemo() {
  const [showLoader, setShowLoader] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loaderType, setLoaderType] = useState<'simple' | 'complex'>('simple');

  const startDemo = () => {
    setShowLoader(true);
    setIsComplete(false);
  };

  const resetDemo = () => {
    setShowLoader(false);
    setIsComplete(false);
  };

  const handleLoadingComplete = () => {
    setShowLoader(false);
    setIsComplete(true);
  };

  if (showLoader) {
    return loaderType === 'simple' ? (
      <SimpleLoader 
        onComplete={handleLoadingComplete} 
        duration={3000}
      />
    ) : (
      <Loader 
        onComplete={handleLoadingComplete} 
        duration={3000}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-100 p-8">
      <div className="text-center max-w-md">
        {!isComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-display font-bold text-3xl text-earth-800 mb-4">
              Vanijya AI Loader Demo
            </h2>
            <p className="text-earth-600 mb-8">
              Experience our beautiful loading animation with the actual logo and branding.
            </p>
            
            {/* Loader Type Selection */}
            <div className="mb-8">
              <p className="text-earth-600 mb-4">Choose loader style:</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setLoaderType('simple')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    loaderType === 'simple' 
                      ? 'bg-saffron-500 text-white' 
                      : 'glass text-earth-700 hover:bg-white/30'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Simple</span>
                </button>
                <button
                  onClick={() => setLoaderType('complex')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    loaderType === 'complex' 
                      ? 'bg-saffron-500 text-white' 
                      : 'glass text-earth-700 hover:bg-white/30'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Complex</span>
                </button>
              </div>
            </div>
            
            <motion.button
              onClick={startDemo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gradient-saffron text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transition-all"
            >
              <Play className="w-5 h-5" />
              <span>Start Demo</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="font-display font-bold text-3xl text-earth-800 mb-4">
              Loading Complete! ✨
            </h2>
            <p className="text-earth-600 mb-8">
              The {loaderType} loader animation finished successfully. The app would now be ready to use.
            </p>
            <motion.button
              onClick={resetDemo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-8 py-4 rounded-xl font-semibold text-lg text-earth-700 hover:bg-white/30 transition-all flex items-center space-x-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}