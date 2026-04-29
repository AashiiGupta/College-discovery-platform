'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, GraduationCap, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

const perks = [
  'Compare colleges with a smart AI-like scoring engine',
  'Save unlimited colleges to your personal wishlist',
  'View your full comparison and discovery history',
  'Get access to placement data and course fees',
];

export default function RegisterPage() {
  const { register } = useAuth();
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // ── Already signed in ──
  if (isAuthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-surface-subtle px-4 py-12 dark:bg-navy-950">
        <div className="w-full max-w-md">
          <div className="glass-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20">
              <CheckCircle className="h-9 w-9 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-ink dark:text-white">Already Signed In</h1>
            <p className="mt-2 text-ink-secondary dark:text-slate-400">
              You&apos;re already logged in as <span className="font-semibold text-ink dark:text-white">{user?.name}</span>.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/profile"><Button className="w-full" size="lg">Go to My Dashboard</Button></Link>
              <Link href="/colleges"><Button variant="outline" className="w-full" size="lg">Browse Colleges</Button></Link>
              <button
                onClick={() => { clearAuth(); toast.success('Logged out'); router.push('/register'); }}
                className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 transition-colors mt-1"
              >
                Use a different account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill in all fields'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try { await register(form.name, form.email, form.password); }
    catch (err: unknown) { toast.error(err instanceof Error ? err.message : 'Registration failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-surface-subtle dark:bg-navy-950">
      {/* ── Left panel ── */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-brand-600 to-violet-700 p-12 lg:flex lg:w-1/2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">CollegeDiscover</span>
        </div>

        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
            <Sparkles className="h-3.5 w-3.5" /> Free forever for students
          </div>
          <h2 className="text-3xl font-bold text-white leading-snug">
            Your college journey starts here.
          </h2>
          <div className="mt-8 space-y-3">
            {perks.map((p) => (
              <div key={p} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="h-3 w-3 text-white" />
                </div>
                <p className="text-sm text-white/90">{p}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-white/50">© 2024 CollegeDiscover</p>
      </div>

      {/* ── Right panel ── */}
      <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-ink dark:text-white">College<span className="text-brand-600">Discover</span></span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-ink dark:text-white">Create your account</h1>
            <p className="mt-1 text-sm text-ink-secondary dark:text-slate-400">
              Free forever. No credit card required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input id="reg-name" type="text" label="Full Name" placeholder="Your name"
              value={form.name} onChange={set('name')} icon={<User className="h-4 w-4" />} autoComplete="name" />
            <Input id="reg-email" type="email" label="Email Address" placeholder="you@example.com"
              value={form.email} onChange={set('email')} icon={<Mail className="h-4 w-4" />} autoComplete="email" />
            <Input id="reg-password" type="password" label="Password" placeholder="Min. 6 characters"
              value={form.password} onChange={set('password')} icon={<Lock className="h-4 w-4" />} autoComplete="new-password" />
            <Input id="reg-confirm" type="password" label="Confirm Password" placeholder="Re-enter password"
              value={form.confirm} onChange={set('confirm')} icon={<Lock className="h-4 w-4" />} autoComplete="new-password" />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Create Account <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-secondary dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
