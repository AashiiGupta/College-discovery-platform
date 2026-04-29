import Link from 'next/link';
import { GraduationCap, Github, Twitter, Linkedin } from 'lucide-react';

const links = [
  { label: 'Colleges', href: '/colleges' },
  { label: 'Compare', href: '/compare' },
  { label: 'Saved', href: '/saved' },
  { label: 'Profile', href: '/profile' },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-white dark:border-white/8 dark:bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-ink dark:text-white">
                College<span className="text-brand-600 dark:text-brand-400">Discover</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-secondary dark:text-slate-400">
              India&apos;s smartest college discovery platform. Search, compare, and shortlist top institutions with real data.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink-secondary transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-surface-border text-ink-muted transition-all hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:text-slate-500 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-surface-border pt-6 sm:flex-row dark:border-white/8">
          <p className="text-xs text-ink-muted dark:text-slate-500">
            © 2024 CollegeDiscover. Built for India&apos;s students.
          </p>
          <p className="text-xs text-ink-muted dark:text-slate-500">
            Full Stack Internship Demo · Track B
          </p>
        </div>
      </div>
    </footer>
  );
}
