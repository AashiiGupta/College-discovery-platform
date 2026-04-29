'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User, Mail, Calendar, BookmarkCheck, GitCompare,
  ArrowRight, TrendingUp, GraduationCap, LogOut, Star,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useSavedColleges } from '@/hooks/useColleges';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageSpinner } from '@/components/ui/Spinner';
import Image from 'next/image';
import toast from 'react-hot-toast';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ProfilePage() {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login?redirect=/profile');
  }, [isAuthenticated, router]);

  const { data: savedColleges = [], isLoading: savedLoading } = useSavedColleges();

  const { data: compareHistory = [], isLoading: historyLoading } = useQuery({
    queryKey: ['compareHistory'],
    queryFn: async () => {
      const res = await api.get('/compare/history');
      return res.data.data.history;
    },
    enabled: isAuthenticated,
  });

  const logout = () => {
    clearAuth();
    toast.success('Logged out successfully');
    router.push('/');
  };

  if (!isAuthenticated) return <PageSpinner />;

  const typeVariant = {
    Government: 'green' as const,
    Private: 'purple' as const,
    Deemed: 'amber' as const,
  };

  return (
    <div className="bg-page-alt min-h-screen">
    <div className="container-narrow py-8">
      {/* ── Profile Header ── */}
      <div className="mb-8 overflow-hidden rounded-3xl border border-themed bg-page-card shadow-card">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-brand-600 to-brand-800 relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
        </div>

        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="-mt-12 mb-4 flex items-end justify-between">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-page-card bg-gradient-to-br from-brand-500 to-brand-700 text-2xl font-bold text-white shadow-lg">
              {user?.name ? getInitials(user.name) : <GraduationCap className="h-10 w-10" />}
            </div>
            <div className="flex gap-2 pb-1">
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-2xl font-bold text-primary">{user?.name}</h1>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-secondary">
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-brand-500 dark:text-brand-400" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-500 dark:text-brand-400" />
                Joined {user?.created_at ? formatDate(user.created_at) : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          {
            icon: BookmarkCheck,
            label: 'Saved Colleges',
            value: savedColleges.length,
            color: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-50 dark:bg-amber-500/10',
            href: '/saved',
          },
          {
            icon: GitCompare,
            label: 'Compare Sessions',
            value: compareHistory.length,
            color: 'text-brand-600 dark:text-brand-400',
            bg: 'bg-brand-50 dark:bg-brand-500/10',
            href: '/compare',
          },
          {
            icon: TrendingUp,
            label: 'Colleges Explored',
            value: savedColleges.length + compareHistory.length * 2,
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
            href: '/colleges',
          },
        ].map(({ icon: Icon, label, value, color, bg, href }) => (
          <Link key={label} href={href}>
            <div className="group glass-card p-5 transition-all hover:-translate-y-0.5 cursor-pointer">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div className={`text-3xl font-bold ${color}`}>{value}</div>
              <div className="mt-0.5 text-xs text-ink-muted dark:text-slate-500">{label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Saved Colleges ── */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink dark:text-white flex items-center gap-2">
              <BookmarkCheck className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              Saved Colleges
            </h2>
            {savedColleges.length > 0 && (
              <Link href="/saved">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            )}
          </div>

          {savedLoading ? (
            <PageSpinner />
          ) : savedColleges.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <BookmarkCheck className="mx-auto mb-3 h-10 w-10 text-ink-muted dark:text-slate-600" />
              <p className="text-ink-secondary dark:text-slate-400">No saved colleges yet.</p>
              <Link href="/colleges" className="mt-4 inline-block">
                <Button size="sm">Browse Colleges</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {savedColleges.slice(0, 5).map((college) => (
                <Link key={college.id} href={`/colleges/${college.id}`}>
                  <div className="glass-card flex items-center gap-4 p-3 transition-all hover:-translate-y-0.5 cursor-pointer">
                    <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={college.image_url || 'https://images.unsplash.com/photo-1562774053-701939374585?w=400'}
                        alt={college.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-ink dark:text-white truncate text-sm">{college.name}</h3>
                      <p className="text-xs text-ink-muted dark:text-slate-500">{college.location}, {college.state}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant={typeVariant[college.type] ?? 'slate'}>{college.type}</Badge>
                        <span className="flex items-center gap-0.5 text-xs text-amber-500 dark:text-amber-400">
                          <Star className="h-3 w-3 fill-amber-400" /> {college.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-ink-muted dark:text-slate-500">Avg Pkg</p>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        ₹{(college.placement_avg / 100000).toFixed(1)}L
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              {savedColleges.length > 5 && (
                <Link href="/saved">
                  <div className="glass-card p-3 text-center text-sm text-brand-600 dark:text-brand-400 hover:bg-surface-subtle dark:hover:bg-white/5 cursor-pointer transition-colors">
                    +{savedColleges.length - 5} more saved colleges →
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* ── Right Panel ── */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-ink dark:text-white">Quick Links</h2>
            <div className="glass-card divide-y divide-surface-border dark:divide-white/5 overflow-hidden">
              {[
                { href: '/colleges', icon: GraduationCap, label: 'Browse Colleges', desc: 'Discover new institutions' },
                { href: '/compare', icon: GitCompare, label: 'Compare Colleges', desc: 'Side-by-side comparison' },
                { href: '/saved', icon: BookmarkCheck, label: 'My Saved List', desc: 'Your shortlisted colleges' },
              ].map(({ href, icon: Icon, label, desc }) => (
                <Link key={href} href={href}>
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-surface-subtle dark:hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/15">
                      <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink dark:text-white">{label}</p>
                      <p className="text-xs text-ink-muted dark:text-slate-500">{desc}</p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-ink-muted dark:text-slate-600" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Compare History */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-ink dark:text-white flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              Compare History
            </h2>
            {historyLoading ? (
              <PageSpinner />
            ) : compareHistory.length === 0 ? (
              <div className="glass-card p-5 text-center text-sm text-ink-muted dark:text-slate-500">
                No compare sessions yet.
              </div>
            ) : (
              <div className="space-y-2">
                {compareHistory.slice(0, 4).map(
                  (h: { id: number; college_ids: number[]; created_at: string }) => (
                    <div key={h.id} className="glass-card p-3">
                      <p className="text-xs text-ink-muted dark:text-slate-500 mb-1">
                        {new Date(h.created_at).toLocaleDateString('en-IN')}
                      </p>
                      <p className="text-sm text-ink dark:text-slate-300">
                        Compared {h.college_ids.length} colleges
                      </p>
                      <Link href={`/compare`}>
                        <span className="text-xs text-brand-600 dark:text-brand-400 hover:underline mt-1 inline-block">
                          View Compare →
                        </span>
                      </Link>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Account Info Card */}
          <div className="glass-card p-5">
            <h2 className="mb-3 text-sm font-semibold text-ink-secondary dark:text-slate-300 uppercase tracking-wider">
              Account Details
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <div>
                  <p className="text-xs text-ink-muted dark:text-slate-500">Full Name</p>
                  <p className="text-ink dark:text-white font-medium">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <div>
                  <p className="text-xs text-ink-muted dark:text-slate-500">Email</p>
                  <p className="text-ink dark:text-white font-medium break-all">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <div>
                  <p className="text-xs text-ink-muted dark:text-slate-500">Member Since</p>
                  <p className="text-ink dark:text-white font-medium">
                    {user?.created_at ? formatDate(user.created_at) : '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
