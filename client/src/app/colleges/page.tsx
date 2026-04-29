'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import CollegeCard from '@/components/colleges/CollegeCard';
import SearchBar from '@/components/colleges/SearchBar';
import FilterSidebar from '@/components/colleges/FilterSidebar';
import { GridSkeleton } from '@/components/ui/Spinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useInfiniteColleges, useStates } from '@/hooks/useColleges';
import { CollegeFilters } from '@/types';

const DEFAULT_FILTERS: Omit<Partial<CollegeFilters>, 'page'> = {
  search: '',
  state: '',
  type: '',
  course: '',
  maxFees: 1000000,
};

export default function CollegesPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [searchInput, setSearchInput] = useState('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { data: statesData } = useStates();

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteColleges(filters);

  // Flatten all pages into one array
  const colleges = data?.pages.flatMap((p) => p.colleges ?? []) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  // ── Debounced search ──
  const handleSearch = useCallback((val: string) => {
    setSearchInput(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilters((f) => ({ ...f, search: val }));
    }, 400);
  }, []);

  const handleFilter = (key: keyof CollegeFilters, value: string | number) => {
    setFilters((f) => ({ ...f, [key]: value }));
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchInput('');
  };

  // ── IntersectionObserver sentinel ──
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' } // start fetching 200px before user hits bottom
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="bg-page-alt min-h-screen">
      <div className="container-narrow py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="section-title">Browse Colleges</h1>
          <p className="mt-2 text-sm text-secondary">
            Discover top institutions across India. Use filters to narrow your search.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full flex-shrink-0 lg:w-64">
            <FilterSidebar
              filters={filters}
              states={statesData || []}
              onChange={handleFilter}
              onReset={handleReset}
            />
          </aside>

          {/* Main */}
          <div className="flex-1">
            {/* Search bar */}
            <div className="mb-4">
              <SearchBar value={searchInput} onChange={handleSearch} />
            </div>

            {isLoading ? (
              <GridSkeleton count={9} />
            ) : isError ? (
              <EmptyState
                title="Failed to load colleges"
                description="Please check your connection and try again."
                action={<Button onClick={() => setFilters({ ...DEFAULT_FILTERS })}>Reset Filters</Button>}
              />
            ) : colleges.length === 0 ? (
              <EmptyState
                title="No colleges found"
                description="Try adjusting your search or filters."
                action={<Button onClick={handleReset}>Clear All Filters</Button>}
              />
            ) : (
              <>
                {/* Result count */}
                <p className="mb-4 text-sm text-muted">
                  Showing {colleges.length} of {total} colleges
                </p>

                {/* Grid */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {colleges.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>

                {/* Sentinel — IntersectionObserver target */}
                <div ref={sentinelRef} className="mt-8 flex justify-center py-4">
                  {isFetchingNextPage && (
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <Loader2 className="h-5 w-5 animate-spin text-brand-600" />
                      Loading more colleges…
                    </div>
                  )}
                  {!hasNextPage && colleges.length > 0 && (
                    <p className="text-sm text-muted">
                      ✓ All {total} colleges loaded
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
