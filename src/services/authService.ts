import { AUTH_API } from '@/lib/api';
import { SignUpPayload, SignInPayload } from '@/types';

export const signUp = async ({ username, email, password }: SignUpPayload) => {
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

export const signIn = async ({ email, password }: SignInPayload) => {
  try {
    const response = await AUTH_API.post('/login', {
      email,
      password,
    });

    if (response.status === 200) {
      return response;
    } else if (response.status === 401) {
      throw new Error('Email ou password inválidos.');
    } else {
      throw new Error('Erro ao inciar sessão.');
    }
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await AUTH_API.post('/logout');
  } catch (error) {
    throw error;
  }
};
