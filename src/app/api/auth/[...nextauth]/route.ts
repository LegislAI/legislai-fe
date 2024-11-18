import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import { AUTH_API } from '@/lib/api';
import { User } from '@/types';
import { redirect } from 'next/navigation';

const REFRESH_AUTH_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
});

const refreshTokens = async (token: JWT) => {
  try {
    console.log('email:', (token.user as User).email);
    const response = await REFRESH_AUTH_API.post(
      '/refresh-tokens',
      {
        email: (token.user as User).email,
        access_token: token.accessToken, // old access token to revoke
      },
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error('RefreshAccessTokenError');
    }

    const tokens = response.data;
    const decodedToken = jwtDecode(tokens.access_token) as { exp: number };
    const accessTokenExpires = decodedToken?.exp ? decodedToken.exp * 1000 : 0;

    return {
      ...token,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      accessTokenExpires: accessTokenExpires,
    };
  } catch {
    return { ...token, error: 'RefreshAccessTokenError' };
  }
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error('No credentials provided.');
          return null;
        }

        try {
          const response = await AUTH_API.post('/login', {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (response.status === 200) {
            return response.data;
          }

          return null;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error('Email ou palavra-passe inválidos.');
          } else {
            throw new Error('Erro ao iniciar sessão.');
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log('Debug: JWT Callback - Token', token);

      // Situation 1: User just logged in
      if (user) {
        console.log('Debug: User logged in');
        const typedUser = user as unknown as User;

        return {
          ...token,
          accessToken: typedUser.access_token,
          refreshToken: typedUser.refresh_token,
          user: {
            user_id: typedUser.user_id,
            email: typedUser.email,
            username: typedUser.username,
          },
        };
      }

      // Situation 2: Access token doesn't exist
      if (!token.accessToken) {
        console.log('Debug: No token provided');
        return token;
      }

      // Situation 3: Access token exists and needs to be checked
      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken as string) as {
          exp: number;
        };
        const accessTokenExpires = decodedToken?.exp
          ? decodedToken.exp * 1000
          : 0;
        token.accessTokenExpires = accessTokenExpires;
      }

      console.log(
        'accessToken expires on:',
        new Date(token.accessTokenExpires as number),
      );

      const shouldRefreshTokens =
        (token.accessTokenExpires as number) < Date.now();

      // Situation 4: Access token is about to expire
      if (shouldRefreshTokens) {
        console.log('Debug: Access token is about to expire. Refreshing...');
        return refreshTokens(token);
      }

      // Situation 5: Access token is still valid
      console.log('Debug: Access token is still valid');
      return token;
    },
    session: async ({ session, token }) => {
      console.log('Debug: Session Callback - Token', token);

      if (token?.error === 'RefreshAccessTokenError') {
        console.error('Error during token refresh. Logging out...');
        redirect('/login');
      }

      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.expires = String(token.accessTokenExpires);
        session.user = token.user as User;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
