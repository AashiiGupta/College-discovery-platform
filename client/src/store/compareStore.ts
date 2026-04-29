'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { College } from '@/types';

interface CompareState {
  selectedIds: number[];
  selectedColleges: College[];
  addCollege: (college: College) => void;
  removeCollege: (id: number) => void;
  clearCompare: () => void;
  isSelected: (id: number) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      selectedIds: [],
      selectedColleges: [],
      addCollege: (college) => {
        const { selectedIds, selectedColleges } = get();
        if (selectedIds.includes(college.id) || selectedIds.length >= 3) return;
        set({
          selectedIds: [...selectedIds, college.id],
          selectedColleges: [...selectedColleges, college],
        });
      },
      removeCollege: (id) => {
        set((state) => ({
          selectedIds: state.selectedIds.filter((i) => i !== id),
          selectedColleges: state.selectedColleges.filter((c) => c.id !== id),
        }));
      },
      clearCompare: () => set({ selectedIds: [], selectedColleges: [] }),
      isSelected: (id) => get().selectedIds.includes(id),
    }),
    { name: 'cdp-compare' }
  )
);
