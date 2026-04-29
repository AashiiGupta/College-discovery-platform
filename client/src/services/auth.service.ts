import api from './api';
import { AuthResponse } from '@/types';

export const authService = {
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const res = await api.post('/auth/register', { name, email, password });
    return res.data.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await api.post('/auth/login', { email, password });
    return res.data.data;
  },

  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data.data.user;
  },
};
