'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle, ExternalLink, Trophy, TrendingUp,
  IndianRupee, Star, MapPin, Award, ArrowUp, ArrowDown, Minus,
} from 'lucide-react';
import { CollegeWithCourses } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface CompareTableProps {
  colleges: CollegeWithCourses[];
}

// ── Score each college across 4 dimensions ──────────────────────────────────
function computeScores(colleges: CollegeWithCourses[]) {
  const maxRating = Math.max(...colleges.map((c) => c.rating));
  const maxPlacement = Math.max(...colleges.map((c) => c.placement_avg));
  const minFees = Math.min(...colleges.map((c) => c.fees_min));
  const maxHighest = Math.max(...colleges.map((c) => c.placement_highest));

  return colleges.map((c) => {
    const ratingScore = (c.rating / maxRating) * 25;
    const placementScore = (c.placement_avg / maxPlacement) * 40;
    const feesScore = (minFees / c.fees_min) * 20;
    const highestScore = (c.placement_highest / maxHighest) * 15;
    return Math.round(ratingScore + placementScore + feesScore + highestScore);
  });
}

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

function CellIndicator({ isBest, isWorst }: { isBest: boolean; isWorst: boolean }) {
  if (isBest) return <ArrowUp className="inline h-3.5 w-3.5 text-emerald-400" />;
  if (isWorst) return <ArrowDown className="inline h-3.5 w-3.5 text-red-400" />;
  return <Minus className="inline h-3.5 w-3.5 text-muted" />;
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-brand-500' : 'bg-amber-500';
  return (
    <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
      <div
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export default function CompareTable({ colleges }: CompareTableProps) {
  const scores = computeScores(colleges);
  const bestIdx = scores.indexOf(Math.max(...scores));
  const typeVariant = {
    Government: 'green' as const,
    Private: 'purple' as const,
    Deemed: 'amber' as const,
  };

  const maxRating = Math.max(...colleges.map((c) => c.rating));
  const minRating = Math.min(...colleges.map((c) => c.rating));
  const maxPlacement = Math.max(...colleges.map((c) => c.placement_avg));
  const minPlacement = Math.min(...colleges.map((c) => c.placement_avg));
  const minFees = Math.min(...colleges.map((c) => c.fees_min));
  const maxFees = Math.max(...colleges.map((c) => c.fees_min));
  const maxHighest = Math.max(...colleges.map((c) => c.placement_highest));
  const minHighest = Math.min(...colleges.map((c) => c.placement_highest));

  const colCount = colleges.length;

  return (
    <div className="space-y-6">
      {/* ── Smart Score Cards ────────────────────────────────────────────── */}
      <div className={`grid gap-4 ${colCount === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
        {colleges.map((c, i) => (
          <div
            key={c.id}
            className={`relative overflow-hidden rounded-2xl border p-5 transition-all ${
              i === bestIdx
                ? 'border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                : 'border-themed bg-page-alt'
            }`}
          >
            {i === bestIdx && (
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-primary">
                <Trophy className="h-3 w-3" /> Best Pick
              </div>
            )}
            <div className="relative mb-3 h-24 overflow-hidden rounded-xl">
              <Image
                src={c.image_url || 'https://images.unsplash.com/photo-1562774053-701939374585?w=600'}
                alt={c.name}
                fill
                className="object-cover"
                sizes="300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <Link href={`/colleges/${c.id}`} className="group flex items-start gap-1">
              <h3 className="text-sm font-bold text-primary group-hover:text-brand-400 transition-colors line-clamp-2">
                {c.name}
              </h3>
              <ExternalLink className="mt-0.5 h-3 w-3 flex-shrink-0 text-muted" />
            </Link>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted">
              <MapPin className="h-3 w-3" /> {c.location}, {c.state}
            </p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-secondary">Overall Score</span>
                <span className={`font-bold ${i === bestIdx ? 'text-emerald-400' : 'text-primary'}`}>
                  {scores[i]}/100
                </span>
              </div>
              <ScoreBar score={scores[i]} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Recommendation Banner ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-4">
        <div className="flex items-center gap-3">
          <Award className="h-6 w-6 flex-shrink-0 text-emerald-400" />
          <div>
            <p className="text-sm font-semibold text-primary">
              Our Recommendation:{' '}
              <span className="text-emerald-400">{colleges[bestIdx].name}</span>
            </p>
            <p className="mt-0.5 text-xs text-secondary">
              Scores highest overall on placement packages, rating, and value-for-fees.
            </p>
          </div>
        </div>
      </div>

      {/* ── Side-by-Side Comparison Table ─────────────────────────────────── */}
      <div className="overflow-x-auto rounded-2xl border border-themed">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="border-b border-themed bg-page-alt">
              <th className="w-36 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">
                Criteria
              </th>
              {colleges.map((c, i) => (
                <th key={c.id} className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-semibold text-primary">{c.name}</span>
                    {i === bestIdx && (
                      <Trophy className="h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-themed bg-page-card">
            {/* Type */}
            <tr className="hover:bg-page-alt transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-muted">Type</td>
              {colleges.map((c) => (
                <td key={c.id} className="px-4 py-3">
                  <Badge variant={typeVariant[c.type]}>{c.type}</Badge>
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="hover:bg-page-alt transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-muted">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" /> Rating</span>
              </td>
              {colleges.map((c) => {
                const isBest = c.rating === maxRating;
                const isWorst = c.rating === minRating && minRating !== maxRating;
                return (
                  <td
                    key={c.id}
                    className={`px-4 py-3 text-sm font-bold ${isBest ? 'text-amber-400' : isWorst ? 'text-red-400' : 'text-primary'}`}
                  >
                    <CellIndicator isBest={isBest} isWorst={isWorst} />
                    {' '}{c.rating}/5
                    {isBest && (
                      <span className="ml-1.5 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
                        Best
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Annual Fees */}
            <tr className="hover:bg-page-alt transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-muted">
                <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" /> Annual Fees</span>
              </td>
              {colleges.map((c) => {
                const isBest = c.fees_min === minFees;
                const isWorst = c.fees_min === maxFees && maxFees !== minFees;
                return (
                  <td
                    key={c.id}
                    className={`px-4 py-3 text-sm font-semibold ${isBest ? 'text-emerald-400' : isWorst ? 'text-red-400' : 'text-primary'}`}
                  >
                    <CellIndicator isBest={isBest} isWorst={isWorst} />
                    {' '}{fmt(c.fees_min)} – {fmt(c.fees_max)}
                    {isBest && (
                      <span className="ml-1.5 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                        Lowest
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Avg Package */}
            <tr className="hover:bg-page-alt transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-muted">
                <span className="flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" /> Avg Package</span>
              </td>
              {colleges.map((c) => {
                const isBest = c.placement_avg === maxPlacement;
                const isWorst = c.placement_avg === minPlacement && minPlacement !== maxPlacement;
                return (
                  <td
                    key={c.id}
                    className={`px-4 py-3 text-sm font-bold ${isBest ? 'text-emerald-400' : isWorst ? 'text-red-400' : 'text-primary'}`}
                  >
                    <CellIndicator isBest={isBest} isWorst={isWorst} />
                    {' '}{fmt(c.placement_avg)}/yr
                    {isBest && (
                      <span className="ml-1.5 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                        Highest
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Highest Package */}
            <tr className="hover:bg-page-alt transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-muted">Highest Pkg</td>
              {colleges.map((c) => {
                const isBest = c.placement_highest === maxHighest;
                const isWorst = c.placement_highest === minHighest && minHighest !== maxHighest;
                return (
                  <td
                    key={c.id}
                    className={`px-4 py-3 text-sm font-semibold ${isBest ? 'text-amber-400' : isWorst ? 'text-secondary' : 'text-primary'}`}
                  >
                    <CellIndicator isBest={isBest} isWorst={isWorst} />
                    {' '}{fmt(c.placement_highest)}
                  </td>
                );
              })}
            </tr>

            {/* Established */}
            <tr className="hover:bg-page-alt transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-muted">Established</td>
              {colleges.map((c) => {
                const oldest = Math.min(...colleges.map((x) => x.established));
                const isBest = c.established === oldest;
                return (
                  <td key={c.id} className={`px-4 py-3 text-sm ${isBest ? 'font-bold text-primary' : 'text-secondary'}`}>
                    {c.established}
                    {isBest && <span className="ml-1 text-xs text-muted">(Oldest)</span>}
                  </td>
                );
              })}
            </tr>

            {/* Affiliation */}
            <tr className="hover:bg-page-alt transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-muted">Affiliation</td>
              {colleges.map((c) => (
                <td key={c.id} className="px-4 py-3 text-sm text-secondary">{c.affiliation}</td>
              ))}
            </tr>

            {/* Courses */}
            <tr className="hover:bg-page-alt transition-colors">
              <td className="px-4 py-3 align-top text-sm font-medium text-muted">Courses</td>
              {colleges.map((c) => (
                <td key={c.id} className="px-4 py-3">
                  <ul className="space-y-1.5">
                    {c.courses.slice(0, 5).map((course) => (
                      <li key={course.id} className="flex items-start gap-1.5 text-xs text-secondary">
                        <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-emerald-400" />
                        {course.name}
                      </li>
                    ))}
                    {c.courses.length > 5 && (
                      <li className="text-xs text-muted pl-4">+{c.courses.length - 5} more</li>
                    )}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Metric Visual Bars ─────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            label: 'Average Placement Package',
            icon: TrendingUp,
            color: 'bg-emerald-500',
            values: colleges.map((c) => ({
              name: c.name,
              val: c.placement_avg,
              display: fmt(c.placement_avg),
              pct: Math.round((c.placement_avg / maxPlacement) * 100),
            })),
          },
          {
            label: 'Rating',
            icon: Star,
            color: 'bg-amber-500',
            values: colleges.map((c) => ({
              name: c.name,
              val: c.rating,
              display: `${c.rating}/5`,
              pct: Math.round((c.rating / 5) * 100),
            })),
          },
        ].map(({ label, icon: Icon, color, values }) => (
          <div key={label} className="glass-card p-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
              <Icon className="h-4 w-4 text-brand-400" /> {label}
            </h3>
            <div className="space-y-3">
              {values.map(({ name, display, pct }) => (
                <div key={name}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="truncate text-secondary max-w-[60%]">{name}</span>
                    <span className="font-semibold text-primary">{display}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
