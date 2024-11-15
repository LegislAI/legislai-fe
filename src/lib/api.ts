import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getSession, signOut } from 'next-auth/react';

let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any | null, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const AUTH_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
});

AUTH_API.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();

    if (session?.accessToken) {
      config.headers['Authorization'] = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

AUTH_API.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalRequest = error.config as any;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh-tokens')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return AUTH_API(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const session = await getSession();
        const response = await AUTH_API.post(
          '/refresh-tokens',
          {
            email: session?.user?.email,
            access_token: session?.accessToken,
          },
          {
            headers: {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              Authorization: `Bearer ${session?.refreshToken}`,
            },
          },
        );

        const tokens = response.data;
        const decodedToken = tokens.access_token;
        const accessTokenExpires = decodedToken?.exp
          ? decodedToken.exp * 1000
          : 0;

        if (session) {
          session.accessToken = tokens.access_token;
          session.refreshToken = tokens.refresh_token;
          session.expires = String(accessTokenExpires);
        }

        processQueue(null, tokens.access_token);
        isRefreshing = false;

        originalRequest.headers['Authorization'] =
          `Bearer ${tokens.access_token}`;

        return AUTH_API(originalRequest);
      } catch (error) {
        processQueue(error, null);
        isRefreshing = false;

        signOut();

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
