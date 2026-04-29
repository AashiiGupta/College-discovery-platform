'use client';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    setAuth(data.user, data.token);
    toast.success(`Welcome back, ${data.user.name}!`);
    router.push('/colleges');
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await authService.register(name, email, password);
    setAuth(data.user, data.token);
    toast.success(`Welcome to CollegeDiscover, ${data.user.name}!`);
    router.push('/colleges');
  };

  const logout = () => {
    clearAuth();
    toast.success('Logged out successfully');
    router.push('/');
  };

  return { user, token, isAuthenticated, login, register, logout };
}
