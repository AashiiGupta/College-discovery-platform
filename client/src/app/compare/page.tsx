'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { GitCompare, Plus, X } from 'lucide-react';
import { useCompareStore } from '@/store/compareStore';
import { collegeService } from '@/services/college.service';
import CompareTable from '@/components/compare/CompareTable';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageSpinner } from '@/components/ui/Spinner';
import { useQuery } from '@tanstack/react-query';
import { CollegeWithCourses } from '@/types';
import Image from 'next/image';

export default function ComparePage() {
  const { selectedIds, selectedColleges, clearCompare, removeCollege } = useCompareStore();

  // Auto-trigger comparison whenever selectedIds changes and has ≥ 2 items
  const { data: colleges, isLoading, isError, refetch } = useQuery<CollegeWithCourses[]>({
    queryKey: ['compare', [...selectedIds].sort().join(',')],
    queryFn: () => collegeService.compareColleges(selectedIds),
    enabled: selectedIds.length >= 2,
    staleTime: 30 * 1000,
  });

  // Re-fetch whenever the selection changes
  useEffect(() => {
    if (selectedIds.length >= 2) refetch();
  }, [selectedIds, refetch]);

  if (selectedIds.length === 0) {
    return (
      <div className="container-narrow py-16">
        <h1 className="section-title mb-2">Compare Colleges</h1>
        <p className="mb-8 text-secondary">Select 2–3 colleges to compare them side by side.</p>
        <EmptyState
          title="No colleges selected"
          description="Browse colleges and click the ⇄ icon on any card to add it here. You can compare up to 3 colleges."
          icon={<GitCompare className="h-12 w-12" />}
          action={
            <Link href="/colleges">
              <Button><Plus className="h-4 w-4" /> Browse Colleges</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-narrow py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="section-title">Compare Colleges</h1>
          <p className="mt-1 text-sm text-secondary">
            Comparing {selectedIds.length} college{selectedIds.length > 1 ? 's' : ''} —{' '}
            {selectedIds.length < 3 && (
              <Link href="/colleges" className="text-brand-400 hover:underline">
                + Add {3 - selectedIds.length} more
              </Link>
            )}
          </p>
        </div>
        <Button variant="ghost" onClick={clearCompare} size="sm">
          <X className="h-4 w-4" /> Clear All
        </Button>
      </div>

      {/* Selected chips */}
      <div className="mb-6 flex flex-wrap gap-3">
        {selectedColleges.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-2 rounded-xl border border-themed bg-page-card px-3 py-2"
          >
            <div className="relative h-7 w-10 overflow-hidden rounded-md flex-shrink-0">
              <Image
                src={c.image_url || 'https://images.unsplash.com/photo-1562774053-701939374585?w=200'}
                alt={c.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <span className="max-w-[140px] truncate text-sm font-medium text-primary">{c.name}</span>
            <button
              onClick={() => removeCollege(c.id)}
              className="ml-1 text-muted hover:text-red-400 transition-colors"
              aria-label={`Remove ${c.name}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        {selectedIds.length < 3 && (
          <Link href="/colleges">
            <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-themed bg-transparent px-3 py-2 text-sm text-muted hover:border-brand-500/50 hover:text-brand-400 transition-colors">
              <Plus className="h-4 w-4" /> Add college
            </div>
          </Link>
        )}
      </div>

      {/* Note: need at least 2 */}
      {selectedIds.length < 2 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 px-5 py-4 text-sm text-amber-400">
          Select at least 1 more college to start comparing.
        </div>
      )}

      {/* Loading */}
      {isLoading && selectedIds.length >= 2 && (
        <div className="py-16">
          <PageSpinner />
          <p className="mt-4 text-center text-sm text-muted">Loading comparison data…</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <EmptyState
          title="Failed to load comparison"
          description="Please try again."
          action={<Button onClick={() => refetch()}>Retry</Button>}
        />
      )}

      {/* Smart Comparison Dashboard */}
      {colleges && colleges.length >= 2 && !isLoading && (
        <CompareTable colleges={colleges} />
      )}

      {/* Add more CTA */}
      {selectedIds.length < 3 && !isLoading && (
        <div className="mt-8 text-center">
          <Link href="/colleges">
            <Button variant="outline">
              <Plus className="h-4 w-4" /> Add Another College to Compare
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
