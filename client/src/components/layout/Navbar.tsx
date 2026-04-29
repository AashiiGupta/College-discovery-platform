'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import {
  GraduationCap, Menu, X, BookmarkCheck, GitCompare,
  LogOut, User, LayoutDashboard, ChevronDown, Sun, Moon,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCompareStore } from '@/store/compareStore';
import { useThemeStore } from '@/store/themeStore';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/colleges', label: 'Colleges' },
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/saved', label: 'Saved', icon: BookmarkCheck },
];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const { selectedIds } = useCompareStore();
  const { isDark, toggle } = useThemeStore();

  // Scroll detection for enhanced glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close profile on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const logout = () => {
    clearAuth();
    setProfileOpen(false);
    setMenuOpen(false);
    toast.success('Logged out');
    router.push('/');
  };

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b shadow-sm backdrop-blur-xl'
          : 'border-b border-transparent',
        'bg-navbar border-themed'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 shadow-sm group-hover:bg-brand-700 transition-colors">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-base font-bold text-primary">
            College<span className="text-brand-600 dark:text-brand-400">Discover</span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400'
                    : 'text-secondary hover:text-primary hover:bg-page-alt'
                )}
              >
                {link.href === '/compare' && selectedIds.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                    {selectedIds.length}
                  </span>
                )}
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ── Desktop Right ── */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-page-alt hover:text-primary"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isAuthenticated ? (
            /* Profile Dropdown */
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-xl border border-themed bg-page-card px-2.5 py-1.5 text-sm text-primary shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[10px] font-bold text-white">
                  {user?.name ? getInitials(user.name) : <User className="h-3 w-3" />}
                </div>
                <span className="max-w-[90px] truncate font-medium">{user?.name?.split(' ')[0]}</span>
                <ChevronDown className={clsx('h-3.5 w-3.5 text-muted transition-transform', profileOpen && 'rotate-180')} />
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 animate-slide-down overflow-hidden rounded-2xl border border-themed bg-page-card shadow-card-hover">
                  <div className="border-b border-themed px-4 py-3">
                    <p className="font-semibold text-primary truncate">{user?.name}</p>
                    <p className="mt-0.5 text-xs text-muted truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    {[
                      { href: '/profile', icon: LayoutDashboard, label: 'My Dashboard', color: 'text-brand-600 dark:text-brand-400' },
                      { href: '/saved', icon: BookmarkCheck, label: 'Saved Colleges', color: 'text-amber-600 dark:text-amber-400' },
                      { href: '/compare', icon: GitCompare, label: 'Compare', color: 'text-brand-600 dark:text-brand-400', badge: selectedIds.length > 0 ? selectedIds.length : undefined },
                    ].map(({ href, icon: Icon, label, color, badge }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-secondary transition-colors hover:bg-page-alt hover:text-primary"
                      >
                        <Icon className={`h-4 w-4 ${color}`} />
                        {label}
                        {badge && (
                          <span className="ml-auto rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-bold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                            {badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-themed py-1">
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-secondary transition-colors hover:text-primary"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-blue-glow"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile Hamburger ── */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggle} className="p-2 text-secondary">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-secondary"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="animate-slide-down border-t border-themed bg-page-card/95 px-4 pb-5 backdrop-blur-xl md:hidden">
          {isAuthenticated && (
            <div className="flex items-center gap-3 border-b border-themed py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
                {user?.name ? getInitials(user.name) : <User className="h-4 w-4" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">{user?.name}</p>
                <p className="text-xs text-muted">{user?.email}</p>
              </div>
            </div>
          )}
          <div className="mt-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400'
                    : 'text-secondary hover:bg-page-alt hover:text-primary'
                )}
              >
                <span className="flex items-center gap-2">
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </span>
                {link.href === '/compare' && selectedIds.length > 0 && (
                  <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">
                    {selectedIds.length}
                  </span>
                )}
              </Link>
            ))}
            {isAuthenticated && (
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-secondary hover:bg-page-alt hover:text-primary">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
            )}
          </div>
          <div className="mt-4 border-t border-themed pt-4">
            {isAuthenticated ? (
              <button onClick={logout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 rounded-xl border border-themed py-2.5 text-center text-sm font-medium text-secondary">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="flex-1 rounded-xl bg-brand-600 py-2.5 text-center text-sm font-semibold text-white">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
