import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Search, GitCompare, BookmarkCheck, Star, TrendingUp, Shield, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CollegeDiscover — Find Your Dream College in India',
};

const stats = [
  { value: '20+', label: 'Top Colleges', icon: Shield },
  { value: '120+', label: 'Courses Listed', icon: Star },
  { value: '50K+', label: 'Students Guided', icon: Users },
];

const features = [
  {
    icon: Search,
    title: 'Smart Search & Filter',
    desc: 'Search by name, state, type, fees, or course. Real-time backend-powered results.',
    color: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
  },
  {
    icon: GitCompare,
    title: 'Intelligent Comparison',
    desc: 'Compare up to 3 colleges side by side with scoring, ↑/↓ indicators, and a "Best Pick" recommendation.',
    color: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
  },
  {
    icon: BookmarkCheck,
    title: 'Personal Shortlist',
    desc: 'Save colleges to your profile. Access your personalized wishlist anytime after sign-in.',
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  },
];

const topColleges = [
  { name: 'IIT Bombay', loc: 'Mumbai, Maharashtra', rating: 4.9, type: 'Government' },
  { name: 'IIT Delhi', loc: 'New Delhi, Delhi', rating: 4.8, type: 'Government' },
  { name: 'BITS Pilani', loc: 'Pilani, Rajasthan', rating: 4.7, type: 'Deemed' },
  { name: 'VIT Vellore', loc: 'Vellore, Tamil Nadu', rating: 4.3, type: 'Private' },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ────────────────────────────────── HERO ── */}
      <section className="relative bg-page pb-24 pt-20 sm:pt-28">
        {/* Glow bg */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-600/8 blur-3xl dark:bg-brand-500/12" />
          <div className="absolute right-0 top-20 h-[300px] w-[400px] rounded-full bg-violet-400/6 blur-3xl dark:bg-violet-500/8" />
        </div>

        <div className="container-narrow relative">
          {/* Eyebrow */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-300">
              <Zap className="h-3.5 w-3.5" />
              India&apos;s Smartest College Discovery Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="mx-auto mt-6 max-w-4xl text-center text-4xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Find Your{' '}
            <span className="relative">
              <span className="gradient-text">Dream College</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none">
                <path d="M1 5.5C50 2.5 100 1 150 1C200 1 250 2.5 299 5.5" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
              </svg>
            </span>{' '}
            in India
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-secondary">
            Search, compare, and shortlist top colleges with real placement data, fees, ratings, and courses — all in one intelligent platform.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-blue-glow"
            >
              Browse Colleges <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 rounded-xl border border-themed bg-page-card px-6 py-3.5 text-base font-semibold text-primary shadow-sm transition-all hover:border-brand-300 hover:text-brand-600"
            >
              <GitCompare className="h-4 w-4" /> Compare Colleges
            </Link>
          </div>

          {/* Search bar teaser */}
          <div className="mx-auto mt-12 max-w-2xl">
            <Link href="/colleges" className="group block">
              <div className="flex items-center gap-3 rounded-2xl border border-themed bg-page-card px-5 py-4 shadow-card transition-all hover:border-brand-300 hover:shadow-card-hover">
                <Search className="h-5 w-5 text-brand-500" />
                <span className="flex-1 text-sm text-muted text-left">
                  Search IIT, NIT, BITS, Manipal, VIT...
                </span>
                <span className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white group-hover:bg-brand-700">
                  Search
                </span>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="glass-card p-4 text-center hover-lift">
                <Icon className="mx-auto mb-2 h-6 w-6 text-brand-600 dark:text-brand-400" />
                <div className="text-2xl font-bold text-primary">{value}</div>
                <div className="mt-0.5 text-xs text-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────── FEATURES ── */}
      <section className="bg-page-alt py-20">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="section-title">Everything You Need to Decide</h2>
            <p className="mt-3 text-secondary">
              Powerful tools built for Indian students making their most important decision.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass-card p-6 hover-lift-md group">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────── TOP COLLEGES PREVIEW ── */}
      <section className="bg-page py-20">
        <div className="container-narrow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="section-title">Top Ranked Colleges</h2>
              <p className="mt-1 text-sm text-secondary">Explore India&apos;s most sought-after institutions</p>
            </div>
            <Link
              href="/colleges"
              className="hidden items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 sm:flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topColleges.map((c, i) => (
              <Link key={c.name} href="/colleges" className="group">
                <div className="glass-card p-4 hover-lift-md">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-lg bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                      #{i + 1}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      c.type === 'Government'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                        : c.type === 'Deemed'
                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                        : 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
                    }`}>
                      {c.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-primary group-hover:text-brand-600 transition-colors text-sm">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{c.loc}</p>
                  <div className="mt-3 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{c.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────── CTA ── */}
      <section className="bg-page-alt py-20">
        <div className="container-narrow">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-14 text-center shadow-blue-glow">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Start Discovering Your Dream College
              </h2>
              <p className="mt-3 text-brand-200">
                Join thousands of students who made smarter decisions with CollegeDiscover.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm transition-all hover:bg-brand-50"
                >
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/colleges"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Browse Without Signing Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
