import axios from 'axios';

export const AUTH_API = axios.create({
  // baseURL: process.env.AUTH_API_BASE_URL,
  baseURL: 'http://localhost:5001/auth',
  withCredentials: true,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
