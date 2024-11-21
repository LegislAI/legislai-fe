import { signIn, signOut } from 'next-auth/react';

import { AUTH_API } from '@/lib/api';
import { RegisterPayload, LoginPayload } from '@/types';

export const register = async ({
  username,
  email,
  password,
}: RegisterPayload) => {
  try {
    const response = await AUTH_API.post('/register', {
      username,
      email,
      password,
    });

    if (response.status === 200) {
      return response;
    } else if (response.status === 403) {
      throw new Error(`O email ${email} já está registado.`);
    } else {
      throw new Error('Erro ao registar utilizador.');
    }
  } catch (error) {
    throw error;
  }
};

export const login = async ({ email, password }: LoginPayload) => {
  try {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      throw new Error(response.error);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut({ redirect: true });
  } catch (error) {
    throw error;
  }
};
