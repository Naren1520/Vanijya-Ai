import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({ 
  children, 
  className = '', 
  hover = false, 
  glow = false 
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`
        glass rounded-xl p-6 
        ${hover ? 'card-hover cursor-pointer' : ''} 
        ${glow ? 'ai-glow' : ''} 
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}