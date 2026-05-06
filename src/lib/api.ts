import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  // Lazy import breaks the api ↔ authStore circular dependency.
  // Both modules are fully initialized by the time any request fires.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAuthStore } = require('../store/authStore') as typeof import('../store/authStore');
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
