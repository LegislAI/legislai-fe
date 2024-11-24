'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { signIn, signOut } from '@/services/authService';
import { getUserInfo } from '@/services/usersServices';
import { UserInfo, SignInPayload } from '@/types';

interface AuthContextType {
  user: UserInfo | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: SignInPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('/api/auth/token');
        const { token: accessToken } = await response.json();

        if (accessToken) {
          await fetchAndSetUserInfo();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchAndSetUserInfo = async () => {
    try {
      const response = await getUserInfo();

      const userInfo = {
        userId: response.data.user_id,
        email: response.data.email,
        username: response.data.username,
        plan: response.data.plan,
        nextBillingDate: response.data.next_billing_date,
      };

      setUser(userInfo);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const login = async ({ email, password }: SignInPayload) => {
    setIsLoading(true);

    try {
      const response = await signIn({ email, password });

      await fetch('/api/auth/token', {
        method: 'POST',
        body: JSON.stringify({ token: response.data.access_token }),
      });

      await fetchAndSetUserInfo();

      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await signOut();

      await fetch('/api/auth/token', {
        method: 'DELETE',
      });

      setUser(null);

      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
