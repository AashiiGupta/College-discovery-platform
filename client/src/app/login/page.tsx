'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, GraduationCap, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

const benefits = [
  'Save colleges to your personal shortlist',
  'Compare institutions side by side',
  'Track your college exploration history',
  'Get personalized recommendations',
];

export default function LoginPage() {
  const { login } = useAuth();
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // ── Already signed in ──
  if (isAuthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-page-alt px-4 py-12">
        <div className="w-full max-w-md">
          <div className="glass-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20">
              <CheckCircle className="h-9 w-9 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-ink dark:text-white">Already Signed In</h1>
            <p className="mt-2 text-ink-secondary dark:text-slate-400">
              You&apos;re logged in as <span className="font-semibold text-ink dark:text-white">{user?.name}</span>.
            </p>
            <p className="text-sm text-ink-muted dark:text-slate-500">{user?.email}</p>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/profile"><Button className="w-full" size="lg">Go to My Dashboard</Button></Link>
              <Link href="/colleges"><Button variant="outline" className="w-full" size="lg">Browse Colleges</Button></Link>
              <button
                onClick={() => { clearAuth(); toast.success('Logged out'); router.push('/'); }}
                className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 transition-colors mt-1"
              >
                Sign in as a different account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try { await login(form.email, form.password); }
    catch (err: unknown) { toast.error(err instanceof Error ? err.message : 'Login failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-page-alt">
      {/* ── Left Panel — Brand ── */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-brand-600 to-brand-800 p-12 lg:flex lg:w-1/2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">CollegeDiscover</span>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white leading-snug">
            Make the most important decision with confidence.
          </h2>
          <div className="mt-8 space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Star className="h-3 w-3 text-white" />
                </div>
                <p className="text-sm text-white/90">{b}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/50">© 2024 CollegeDiscover</p>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-ink dark:text-white">College<span className="text-brand-600">Discover</span></span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-ink dark:text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-ink-secondary dark:text-slate-400">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input
              id="login-email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              icon={<Mail className="h-4 w-4" />}
              autoComplete="email"
            />
            <Input
              id="login-password"
              type="password"
              label="Password"
              placeholder="Your password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              icon={<Lock className="h-4 w-4" />}
              autoComplete="current-password"
            />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign In <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-secondary dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
              Create one free
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-ink-muted dark:text-slate-600">
            Demo: any email + password (min 6 chars)
          </p>
        </div>
      </div>
    </div>
  );
}
