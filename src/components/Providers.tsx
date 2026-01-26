'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthWrapper from '@/components/AuthWrapper';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </AuthProvider>
    </SessionProvider>
  );
}