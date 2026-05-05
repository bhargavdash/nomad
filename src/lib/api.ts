import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});
