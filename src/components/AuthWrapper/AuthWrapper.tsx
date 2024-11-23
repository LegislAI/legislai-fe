'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { logout } from '@/services/authService';
import { useAppDispatch } from '@/store/hooks';
import { fetchUserInfo, resetUserState } from '@/store/user/userSlice';

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        if (status === 'authenticated' && session?.accessToken) {
          console.log('AuthWrapper - User is authenticated');
          await dispatch(fetchUserInfo()).unwrap();
        } else if (status === 'unauthenticated') {
          console.log('AuthWrapper - User is unauthenticated');
          dispatch(resetUserState());
        }
      } catch (error) {
        console.error('AuthWrapper - Error fetching user info:', error);
        logout();
      }
    };

    handleAuth();
  }, [status, session, dispatch]);

  return <>{children}</>;
}
