'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bookmark, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useSavedColleges, useSaveToggle } from '@/hooks/useColleges';
import CollegeCard from '@/components/colleges/CollegeCard';
import { PageSpinner } from '@/components/ui/Spinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function SavedPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login?redirect=/saved');
  }, [isAuthenticated, router]);

  const { data: colleges = [], isLoading } = useSavedColleges();

  if (!isAuthenticated) return <PageSpinner />;

  return (
    <div className="bg-page-alt min-h-screen">
    <div className="container-narrow py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="section-title">My Wishlist</h1>
          <p className="mt-1 text-sm text-ink-secondary dark:text-slate-400">Your personal college shortlist</p>
        </div>
        {colleges.length > 0 && (
          <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-300">
            {colleges.length} saved
          </span>
        )}
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : colleges.length === 0 ? (
        <EmptyState
          title="No saved colleges yet"
          description="Browse colleges and click the bookmark icon to save them here."
          icon={<Bookmark className="h-12 w-12" />}
          action={
            <Link href="/colleges">
              <Button>
                Browse Colleges <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
