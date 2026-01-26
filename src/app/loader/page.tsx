'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';

export default function LoaderPage() {
  const [showLoader, setShowLoader] = useState(true);
  const router = useRouter();

  const handleLoadingComplete = () => {
    setShowLoader(false);
    // Redirect to home page after loading
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  if (!showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mandi-cream via-saffron-50 to-earth-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-earth-800 mb-4">Loading Complete!</h2>
          <p className="text-earth-600">Redirecting to Vanijya AI...</p>
        </div>
      </div>
    );
  }

  return (
    <Loader 
      onComplete={handleLoadingComplete} 
      duration={5000} // 4 seconds for demo
    />
  );
}