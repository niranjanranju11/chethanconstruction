import apiClient from './client';
import type { ApiResponse, AuthResponse, User } from '../types';
import { DEFAULT_ADMIN_USER } from '../data/mockFallback';

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const res = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', { email, password });
      return res.data.data;
    } catch (err: any) {
      // If backend is unreachable or Mixed Content blocked (e.g. on Cloudflare HTTPS)
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      const cleanEmail = email.trim().toLowerCase();
      const isDemoUser = cleanEmail === 'admin@chethanconstruction.com' || cleanEmail === 'admin';
      const isDemoPass = password === 'AdminPassword123!' || password === 'admin' || password === 'admin123';

      if (isNetworkError && isDemoUser && isDemoPass) {
        return {
          token: 'demo-admin-session-token',
          tokenType: 'Bearer',
          expiresInSeconds: 86400,
          user: DEFAULT_ADMIN_USER,
        };
      }
      throw err;
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const res = await apiClient.get<ApiResponse<User>>('/auth/me');
      return res.data.data;
    } catch (err: any) {
      const storedToken = localStorage.getItem('chethan_admin_token');
      if (storedToken && storedToken.startsWith('demo-admin-')) {
        return DEFAULT_ADMIN_USER;
      }
      throw err;
    }
  },
};

