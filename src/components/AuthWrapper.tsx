'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const publicRoutes = ['/', '/how-it-works', '/impact', '/auth/signin', '/auth/profile-setup'];

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isAuthenticated, hasCompletedProfile, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = publicRoutes.includes(pathname);
    
    // If user is not authenticated and trying to access protected route
    if (!isAuthenticated && !isPublicRoute) {
      router.push('/auth/signin');
      return;
    }

    // If user is authenticated but hasn't completed profile and not on profile setup page
    if (isAuthenticated && !hasCompletedProfile && pathname !== '/auth/profile-setup') {
      router.push('/auth/profile-setup');
      return;
    }

    // If user is authenticated with completed profile but on auth pages
    if (isAuthenticated && hasCompletedProfile && pathname.startsWith('/auth/')) {
      router.push('/dashboard');
      return;
    }

    setShowLoader(false);
  }, [isAuthenticated, hasCompletedProfile, isLoading, pathname, router]);

  if (isLoading || showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron-50 via-white to-earth-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-earth-600 font-medium">Loading Vanijya AI...</p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}