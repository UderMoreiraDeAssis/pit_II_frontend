// /utils/axios.ts
import axios from 'axios';
import { getToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

// Interceptador para adicionar token
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
