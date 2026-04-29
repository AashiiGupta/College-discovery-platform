import api from './api';
import { CollegeFilters, CollegesResponse, CollegeWithCourses } from '@/types';

export const collegeService = {
  getColleges: async (filters: Partial<CollegeFilters>): Promise<CollegesResponse> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== '' && val !== 0) params.append(key, String(val));
    });
    const res = await api.get(`/colleges?${params.toString()}`);
    return res.data.data;
  },

  getCollegeById: async (id: number): Promise<CollegeWithCourses> => {
    const res = await api.get(`/colleges/${id}`);
    return { ...res.data.data.college, courses: res.data.data.courses };
  },

  getStates: async (): Promise<string[]> => {
    const res = await api.get('/colleges/states');
    return res.data.data.states;
  },

  compareColleges: async (collegeIds: number[]) => {
    const res = await api.post('/compare', { collegeIds });
    return res.data.data.colleges;
  },
};
