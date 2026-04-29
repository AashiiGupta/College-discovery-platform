export const PageSpinner = () => (
  <div className="flex min-h-[300px] items-center justify-center">
    <div className="relative">
      <div className="h-12 w-12 rounded-full border-2 border-surface-border dark:border-white/10" />
      <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-2 border-transparent border-t-brand-600" />
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-surface-border bg-white dark:border-white/8 dark:bg-white/5">
    <div className="h-44 animate-pulse bg-surface-subtle dark:bg-white/5" />
    <div className="p-4 space-y-3">
      <div className="h-4 w-3/4 animate-pulse rounded-lg bg-surface-subtle dark:bg-white/5" />
      <div className="h-3 w-1/2 animate-pulse rounded-lg bg-surface-subtle dark:bg-white/5" />
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="h-12 animate-pulse rounded-xl bg-surface-subtle dark:bg-white/5" />
        <div className="h-12 animate-pulse rounded-xl bg-surface-subtle dark:bg-white/5" />
      </div>
      <div className="h-9 mt-2 animate-pulse rounded-xl bg-surface-subtle dark:bg-white/5" />
    </div>
  </div>
);

export const GridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);
