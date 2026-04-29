import { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-border bg-surface-subtle/50 px-6 py-16 text-center dark:border-white/8 dark:bg-white/2">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-white/5 text-ink-muted dark:text-slate-500">
      {icon ?? <Inbox className="h-8 w-8" />}
    </div>
    <h3 className="text-base font-semibold text-ink dark:text-white">{title}</h3>
    {description && (
      <p className="mt-2 max-w-sm text-sm text-ink-secondary dark:text-slate-400">{description}</p>
    )}
    {action && <div className="mt-6">{action}</div>}
  </div>
);
