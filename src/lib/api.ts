import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const createAPIInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const response = await fetch('/api/auth/token');
      const { token: accessToken } = await response.json();

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return config;
    },
    error => Promise.reject(error),
  );

  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        await fetch('/api/auth/token', {
          method: 'DELETE',
        });
        window.location.href = '/login';
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const AUTH_API = createAPIInstance(
  process.env.NEXT_PUBLIC_AUTH_API_BASE_URL!,
);
export const USERS_API = createAPIInstance(
  process.env.NEXT_PUBLIC_USERS_API_BASE_URL!,
);
