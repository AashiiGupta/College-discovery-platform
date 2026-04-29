import { clsx } from 'clsx';

type BadgeVariant = 'blue' | 'amber' | 'green' | 'red' | 'purple' | 'slate';

// Light-mode + dark-mode aware variant classes
const variants: Record<BadgeVariant, string> = {
  blue:   'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:border-brand-500/20',
  amber:  'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
  green:  'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
  red:    'bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
  purple: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20',
  slate:  'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge = ({ children, variant = 'blue', className }: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
      variants[variant],
      className
    )}
  >
    {children}
  </span>
);
