'use client';
import { SlidersHorizontal, X } from 'lucide-react';
import { CollegeFilters } from '@/types';
import { clsx } from 'clsx';

interface FilterSidebarProps {
  filters: Partial<CollegeFilters>;
  states: string[];
  onChange: (key: keyof CollegeFilters, value: string | number) => void;
  onReset: () => void;
}

const collegeTypes = ['Government', 'Private', 'Deemed'];
const courses = [
  'B.Tech Computer Science',
  'B.Tech Electronics & Communication',
  'B.Tech Mechanical Engineering',
  'MBA',
  'M.Tech Computer Science',
];

const FEE_MAX = 1000000;

export default function FilterSidebar({ filters, states, onChange, onReset }: FilterSidebarProps) {
  const hasFilters = !!(
    filters.state || filters.type || filters.course ||
    (filters.maxFees && filters.maxFees < FEE_MAX)
  );

  return (
    <div className="rounded-2xl border border-themed bg-page-card p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <SlidersHorizontal className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          Filters
          {hasFilters && (
            <span className="rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
              ON
            </span>
          )}
        </div>
        {hasFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-red-500"
          >
            <X className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      <div className="mt-5 space-y-6">
        {/* State */}
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">State</p>
          <select
            value={filters.state || ''}
            onChange={(e) => onChange('state', e.target.value)}
            className="input-base text-sm"
          >
            <option value="">All States</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* College Type — pill chips */}
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">College Type</p>
          <div className="flex flex-wrap gap-2">
            {collegeTypes.map((type) => (
              <button
                key={type}
                onClick={() => onChange('type', filters.type === type ? '' : type)}
                className={clsx(
                  'rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150',
                  filters.type === type
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'border-themed bg-page-alt text-secondary hover:border-brand-500 hover:text-brand-600 cursor-pointer'
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Course */}
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">Course</p>
          <select
            value={filters.course || ''}
            onChange={(e) => onChange('course', e.target.value)}
            className="input-base text-sm"
          >
            <option value="">All Courses</option>
            {courses.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Max Fees */}
        <div>
          <div className="mb-2.5 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Max Annual Fees</p>
            <span className="rounded-lg bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
              ₹{((filters.maxFees || FEE_MAX) / 100000).toFixed(0)}L
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={FEE_MAX}
            step={50000}
            value={filters.maxFees || FEE_MAX}
            onChange={(e) => onChange('maxFees', parseInt(e.target.value))}
            className="w-full accent-brand-600"
          />
          <div className="mt-1.5 flex justify-between text-[10px] text-muted">
            <span>₹0</span>
            <span>₹10L+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
