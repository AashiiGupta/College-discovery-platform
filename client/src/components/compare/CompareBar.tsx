'use client';
import Link from 'next/link';
import { X, GitCompare } from 'lucide-react';
import { useCompareStore } from '@/store/compareStore';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function CompareBar() {
  const { selectedColleges, removeCollege, clearCompare, selectedIds } = useCompareStore();

  if (selectedIds.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-500/30 bg-navy-950/95 backdrop-blur-md py-3 px-4 shadow-glow"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <GitCompare className="h-5 w-5 text-brand-400 flex-shrink-0" />
            <span className="text-sm text-slate-400 flex-shrink-0">Comparing:</span>
            {selectedColleges.map((c) => (
              <div
                key={c.id}
                className="flex flex-shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5"
              >
                <span className="text-sm font-medium text-white max-w-[120px] truncate">{c.name}</span>
                <button
                  onClick={() => removeCollege(c.id)}
                  className="text-slate-400 hover:text-red-400"
                  aria-label={`Remove ${c.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            <button onClick={clearCompare} className="text-xs text-slate-500 hover:text-red-400">
              Clear
            </button>
            <Link href="/compare">
              <Button size="sm" disabled={selectedIds.length < 2}>
                Compare Now
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
