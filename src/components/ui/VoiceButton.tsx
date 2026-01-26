'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

interface VoiceButtonProps {
  onToggle?: (isRecording: boolean) => void;
  className?: string;
}

export default function VoiceButton({ onToggle, className = '' }: VoiceButtonProps) {
  const [isRecording, setIsRecording] = useState(false);

  const handleToggle = () => {
    const newState = !isRecording;
    setIsRecording(newState);
    onToggle?.(newState);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
        className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-300 shadow-lg
          ${isRecording 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'gradient-saffron hover:shadow-xl hover:shadow-saffron-500/30'
          }
        `}
      >
        {isRecording ? (
          <MicOff className="w-6 h-6 text-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
        
        {/* Ripple effect when recording */}
        {isRecording && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{
                scale: [1, 1.8, 2.5],
                opacity: [0.6, 0.2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.3,
              }}
            />
          </>
        )}
      </motion.button>
      
      <p className="text-center mt-2 text-sm text-earth-600">
        {isRecording ? 'Listening...' : 'Tap to speak'}
      </p>
    </div>
  );
}