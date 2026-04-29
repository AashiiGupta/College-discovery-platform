'use client';
import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Star, Calendar, TrendingUp, IndianRupee, Building2, BookOpen, GitCompare, Bookmark, BookmarkCheck } from 'lucide-react';
import { useCollege, useSavedIds, useSaveToggle } from '@/hooks/useColleges';
import { useCompareStore } from '@/store/compareStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageSpinner } from '@/components/ui/Spinner';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

type Tab = 'overview' | 'courses' | 'placements' | 'reviews';

const mockReviews = [
  { author: 'Rahul S.', rating: 5, text: 'Amazing campus, world-class faculty. Best decision of my life.', year: '2023' },
  { author: 'Priya M.', rating: 4, text: 'Great placements and infrastructure. Hostel life is fantastic.', year: '2022' },
  { author: 'Ankit K.', rating: 5, text: 'The research opportunities here are unparalleled. Highly recommend.', year: '2023' },
];

export default function CollegeDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const { data: college, isLoading, isError } = useCollege(id);
  const { data: savedIds = [] } = useSavedIds();
  const { toggle, isPending } = useSaveToggle();
  const { addCollege, removeCollege, isSelected, selectedIds } = useCompareStore();

  if (isLoading) return <PageSpinner />;
  if (isError || !college) return notFound();

  const isSaved = savedIds.includes(college.id);
  const inCompare = isSelected(college.id);
  const compareFull = selectedIds.length >= 3 && !inCompare;
  const typeVariant = { Government: 'green' as const, Private: 'purple' as const, Deemed: 'amber' as const };

  const handleCompare = () => {
    if (compareFull) { toast.error('Remove a college to add another'); return; }
    if (inCompare) removeCollege(college.id);
    else addCollege(college);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'courses', label: `Courses (${college.courses.length})` },
    { key: 'placements', label: 'Placements' },
    { key: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="bg-page-alt min-h-screen pb-16">
      {/* Hero Banner */}
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        <Image src={college.image_url} alt={college.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="container-narrow">
        {/* Header */}
        <div className="-mt-16 relative z-10 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={typeVariant[college.type]}>{college.type}</Badge>
                <Badge variant="slate">Est. {college.established}</Badge>
              </div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">{college.name}</h1>
              <div className="mt-2 flex items-center gap-1.5 text-white/70">
                <MapPin className="h-4 w-4" />
                <span>{college.location}, {college.state}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={inCompare ? 'secondary' : 'outline'}
                onClick={handleCompare}
                className={clsx(compareFull && 'opacity-40')}
              >
                <GitCompare className="h-4 w-4" />
                {inCompare ? 'Remove' : 'Compare'}
              </Button>
              <Button
                variant="outline"
                onClick={() => toggle(college.id, isSaved)}
                disabled={isPending}
              >
                {isSaved ? <BookmarkCheck className="h-4 w-4 text-amber-400" /> : <Bookmark className="h-4 w-4" />}
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Star, label: 'Rating', value: `${college.rating}/5`, color: 'text-amber-500 dark:text-amber-400' },
              { icon: IndianRupee, label: 'Fees/Year', value: `₹${(college.fees_min / 100000).toFixed(1)}L+`, color: 'text-ink dark:text-white' },
              { icon: TrendingUp, label: 'Avg Package', value: `₹${(college.placement_avg / 100000).toFixed(1)}L`, color: 'text-emerald-600 dark:text-emerald-400' },
              { icon: TrendingUp, label: 'Highest Pkg', value: `₹${(college.placement_highest / 1000000).toFixed(1)}Cr`, color: 'text-brand-600 dark:text-brand-400' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="glass-card p-4">
                <div className="flex items-center gap-1.5 text-xs text-ink-muted dark:text-slate-500"><Icon className="h-3.5 w-3.5" />{label}</div>
                <p className={`mt-1 text-lg font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-surface-border dark:border-white/10">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={clsx(
                  'flex-shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                  activeTab === tab.key
                    ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400'
                    : 'border-transparent text-ink-secondary hover:text-ink dark:text-slate-400 dark:hover:text-white'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'overview' && (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-ink dark:text-white mb-3">About</h2>
                <p className="leading-relaxed text-ink-secondary dark:text-slate-400">{college.description}</p>
              </div>
              <div className="space-y-4">
                <div className="glass-card p-4">
                  <h3 className="mb-3 text-sm font-semibold text-ink dark:text-slate-300">Basic Info</h3>
                  {[
                    { icon: Building2, label: 'Affiliation', value: college.affiliation },
                    { icon: Calendar, label: 'Established', value: college.established },
                    { icon: MapPin, label: 'Location', value: `${college.location}, ${college.state}` },
                    { icon: BookOpen, label: 'Courses', value: `${college.courses.length} programs` },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2 py-2 border-b border-surface-border dark:border-white/5 last:border-0">
                      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600 dark:text-brand-400" />
                      <div>
                        <p className="text-xs text-ink-muted dark:text-slate-500">{label}</p>
                        <p className="text-sm text-ink dark:text-white">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-ink dark:text-white">Courses Offered</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {college.courses.map((course) => (
                  <div key={course.id} className="glass-card p-4">
                    <h3 className="font-semibold text-ink dark:text-white text-sm">{course.name}</h3>
                    <div className="mt-2 space-y-1 text-xs text-ink-secondary dark:text-slate-400">
                      <div>Duration: <span className="font-medium text-ink dark:text-white">{course.duration}</span></div>
                      <div>Fees: <span className="font-medium text-emerald-600 dark:text-emerald-400">₹{(course.fees / 100000).toFixed(1)}L/year</span></div>
                      <div>Seats: <span className="font-medium text-ink dark:text-white">{course.seats}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'placements' && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-ink dark:text-white">Placement Statistics</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Average Package', value: `₹${(college.placement_avg / 100000).toFixed(1)} LPA`, color: 'text-emerald-600 dark:text-emerald-400' },
                  { label: 'Highest Package', value: `₹${(college.placement_highest / 1000000).toFixed(1)} CPA`, color: 'text-amber-500 dark:text-amber-400' },
                  { label: 'Placement Rate', value: '90%+', color: 'text-brand-600 dark:text-brand-400' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="glass-card p-6 text-center">
                    <p className="text-xs text-ink-muted dark:text-slate-500 uppercase tracking-wider">{label}</p>
                    <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 glass-card p-6">
                <h3 className="mb-3 text-sm font-semibold text-ink dark:text-slate-300">Top Recruiting Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {['Google', 'Microsoft', 'Amazon', 'Infosys', 'TCS', 'Wipro', 'Goldman Sachs', 'JP Morgan', 'Flipkart', 'Zomato'].map((c) => (
                    <Badge key={c} variant="slate">{c}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-ink dark:text-white">Student Reviews</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mockReviews.map((review) => (
                  <div key={review.author} className="glass-card p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-surface-border dark:text-slate-600'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-ink-secondary dark:text-slate-300 leading-relaxed">&quot;{review.text}&quot;</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-ink-muted dark:text-slate-500">
                      <span>{review.author}</span>
                      <span>Batch {review.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
