'use client';
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collegeService } from '@/services/college.service';
import { savedService } from '@/services/saved.service';
import { CollegeFilters } from '@/types';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

// ── Infinite scroll version ──────────────────────────────────────────────────
export function useInfiniteColleges(filters: Omit<Partial<CollegeFilters>, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['colleges-infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      collegeService.getColleges({ ...filters, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage?.totalPages ?? 1;
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
}

// ── Single-page version (kept for other uses) ────────────────────────────────
export function useColleges(filters: Partial<CollegeFilters>) {
  return useQuery({
    queryKey: ['colleges', filters],
    queryFn: () => collegeService.getColleges(filters),
    staleTime: 1000 * 60 * 5,
  });
}


export function useCollege(id: number) {
  return useQuery({
    queryKey: ['college', id],
    queryFn: () => collegeService.getCollegeById(id),
    enabled: !!id,
  });
}

export function useStates() {
  return useQuery({
    queryKey: ['states'],
    queryFn: collegeService.getStates,
    staleTime: 1000 * 60 * 60,
  });
}

export function useSavedColleges() {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['savedColleges'],
    queryFn: savedService.getSaved,
    enabled: isAuthenticated,
  });
}

export function useSavedIds() {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['savedIds'],
    queryFn: savedService.getSavedIds,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
  });
}

export function useSaveToggle() {
  const qc = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const save = useMutation({
    mutationFn: savedService.save,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['savedIds'] });
      qc.invalidateQueries({ queryKey: ['savedColleges'] });
      toast.success('College saved!');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const unsave = useMutation({
    mutationFn: savedService.unsave,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['savedIds'] });
      qc.invalidateQueries({ queryKey: ['savedColleges'] });
      toast.success('Removed from saved');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggle = (collegeId: number, isSaved: boolean) => {
    if (!isAuthenticated) {
      toast.error('Please login to save colleges');
      return;
    }
    if (isSaved) unsave.mutate(collegeId);
    else save.mutate(collegeId);
  };

  return { toggle, isPending: save.isPending || unsave.isPending };
}
