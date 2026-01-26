'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { UserProfile } from '@/lib/models/User';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasCompletedProfile: boolean;
  signInWithGoogle: () => void;
  signOutUser: () => void;
  saveUserProfile: (profile: { name: string; phone: string; address: string }) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (email: string) => {
    try {
      const response = await fetch(`/api/users/profile?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    }
  };

  const refreshUser = async () => {
    if (session?.user?.email) {
      await fetchUser(session.user.email);
    }
  };

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    if (session?.user?.email) {
      fetchUser(session.user.email).finally(() => setIsLoading(false));
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [session, status]);

  const signInWithGoogle = () => {
    signIn('google', { callbackUrl: '/auth/profile-setup' });
  };

  const signOutUser = async () => {
    await signOut({ callbackUrl: '/' });
    setUser(null);
  };

  const saveUserProfile = async (profileData: { name: string; phone: string; address: string }) => {
    if (!session?.user?.email) return;

    try {
      const response = await fetch('/api/users/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          googleId: session.user.id || session.user.email,
          avatar: session.user.image,
          ...profileData,
        }),
      });

      if (response.ok) {
        const savedUser = await response.json();
        setUser(savedUser);
      } else {
        throw new Error('Failed to save user profile');
      }
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!session && !!user,
    hasCompletedProfile: !!user,
    signInWithGoogle,
    signOutUser,
    saveUserProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};