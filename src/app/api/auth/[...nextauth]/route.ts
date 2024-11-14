import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import { AUTH_API } from '@/lib/api';
import { JWT } from 'next-auth/jwt';
// import { redirect } from 'next/navigation';

type User = {
  user_id: number;
  email: string;
  role: string;
  username: string;
  access_token: string;
  refresh_token: string;
};

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

const refreshTokens = async (token: JWT) => {
  console.log('Refreshing tokens...');

  try {
    const response = await AUTH_API.post(
      '/refresh-tokens',
      {
        email: token.email,
        access_token: token.accessToken, // old access token to revoke
      },
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      },
    );

    if (response.status !== 200) {
      console.log('Error during token refresh:', response);
      throw new Error('RefreshAccessTokenError');
    }

    const tokens = response.data;
    console.log('New tokens:', tokens);
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
      console.log('JWT Callback - Token', token);

      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken as string) as {
          exp: number;
        };
        const accessTokenExpires = decodedToken?.exp
          ? decodedToken.exp * 1000
          : 0;
        token.accessTokenExpires = accessTokenExpires;
      }

      // user only has value after login
      if (user) {
        console.log('user logged in');
        const typedUser = user as unknown as User;

        return {
          ...token,
          accessToken: typedUser.access_token,
          refreshToken: typedUser.refresh_token,
          user: {
            id: typedUser.user_id,
            email: typedUser.email,
            username: typedUser.username,
          },
        };
      }

      console.log(
        'accessToken expires on:',
        new Date(token.accessTokenExpires as number),
      );

      // Verify if token is valid
      if (Date.now() < (token.accessTokenExpires as number)) {
        console.log('Token is valid');
        return token;
      }

      console.log('Token expired, refreshing...');

      return refreshTokens(token);
    },
    session: async ({ session, token }) => {
      console.log('Session Callback - Token', token);

      // if (token.error === 'RefreshAccessTokenError') {
      //   redirect('/login');
      // }

      if (token) {
        session.accessToken = token.accessToken as string;
        session.expires = String(token.accessTokenExpires);
        session.user = token.user as User;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
