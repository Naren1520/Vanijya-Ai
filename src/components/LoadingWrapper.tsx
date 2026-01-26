'use client';

import { useState, useEffect } from 'react';
import SimpleLoader from '@/components/ui/SimpleLoader';

interface LoadingWrapperProps {
  children: React.ReactNode;
  showLoader?: boolean;
  loaderDuration?: number;
}

export default function LoadingWrapper({ 
  children, 
  showLoader = true, 
  loaderDuration = 3000 
}: LoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
    
    // Check if this is the first visit only on client side
    if (typeof window !== 'undefined') {
      const hasVisited = sessionStorage.getItem('hasVisited');
      
      if (!hasVisited && showLoader) {
        setIsLoading(true);
        sessionStorage.setItem('hasVisited', 'true');
      }
    }
  }, [showLoader]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Don't show loader during SSR or if client hasn't mounted yet
  if (!isClient || !isLoading) {
    return <>{children}</>;
  }

  return (
    <SimpleLoader 
      onComplete={handleLoadingComplete} 
      duration={loaderDuration}
    />
  );
}