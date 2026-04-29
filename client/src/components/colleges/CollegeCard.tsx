'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, IndianRupee, TrendingUp, Bookmark, BookmarkCheck, GitCompare, ArrowUpRight } from 'lucide-react';
import { College } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useCompareStore } from '@/store/compareStore';
import { useSavedIds, useSaveToggle } from '@/hooks/useColleges';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

const typeVariant = {
  Government: 'green' as const,
  Private: 'purple' as const,
  Deemed: 'amber' as const,
};

export default function CollegeCard({ college }: { college: College }) {
  const { addCollege, removeCollege, isSelected, selectedIds } = useCompareStore();
  const { data: savedIds = [] } = useSavedIds();
  const { toggle, isPending } = useSaveToggle();

  const isSaved = savedIds.includes(college.id);
  const inCompare = isSelected(college.id);
  const compareFull = selectedIds.length >= 3 && !inCompare;

  const handleCompare = () => {
    if (compareFull) { toast.error('Remove a college first'); return; }
    if (inCompare) removeCollege(college.id); else addCollege(college);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-themed bg-page-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={college.image_url || 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'}
          alt={college.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Type badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant={typeVariant[college.type]}>{college.type}</Badge>
        </div>

        {/* Save button */}
        <button
          onClick={() => toggle(college.id, isSaved)}
          disabled={isPending}
          className={clsx(
            'absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200',
            isSaved
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-amber-500'
          )}
          aria-label={isSaved ? 'Remove from saved' : 'Save college'}
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>

        {/* Rating pill */}
        <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 backdrop-blur-sm">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-white">{college.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-primary transition-colors group-hover:text-brand-600">
          {college.name}
        </h3>

        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{college.location}, {college.state}</span>
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-page-alt p-2.5">
            <div className="flex items-center gap-1 text-[10px] text-muted">
              <IndianRupee className="h-3 w-3" /> Annual Fees
            </div>
            <p className="mt-0.5 text-xs font-semibold text-primary">
              ₹{(college.fees_min / 100000).toFixed(1)}L – ₹{(college.fees_max / 100000).toFixed(1)}L
            </p>
          </div>
          <div className="rounded-xl bg-page-alt p-2.5">
            <div className="flex items-center gap-1 text-[10px] text-muted">
              <TrendingUp className="h-3 w-3" /> Avg Package
            </div>
            <p className="mt-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ₹{(college.placement_avg / 100000).toFixed(1)}L
            </p>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>Est. {college.established}</span>
          <span className="font-medium text-brand-600 dark:text-brand-400">
            {college.affiliation?.split(' ').slice(0, 2).join(' ')}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Link href={`/colleges/${college.id}`} className="flex-1">
            <button className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-themed bg-page-card py-2 text-xs font-semibold text-secondary shadow-inset-sm transition-all hover:border-brand-400 hover:text-brand-600">
              View Details <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </Link>
          <button
            onClick={handleCompare}
            className={clsx(
              'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-200',
              inCompare
                ? 'border-brand-500 bg-brand-600 text-white shadow-sm'
                : 'border-themed bg-page-card text-muted hover:border-brand-400 hover:text-brand-600',
              compareFull && 'cursor-not-allowed opacity-40'
            )}
            title={compareFull ? 'Remove a college first' : inCompare ? 'Remove from compare' : 'Add to compare'}
          >
            <GitCompare className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
