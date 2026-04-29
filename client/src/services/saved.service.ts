import api from './api';
import { College } from '@/types';

export const savedService = {
  getSaved: async (): Promise<College[]> => {
    const res = await api.get('/saved');
    return res.data.data.colleges;
  },

  getSavedIds: async (): Promise<number[]> => {
    const res = await api.get('/saved/ids');
    return res.data.data.savedIds;
  },

  save: async (collegeId: number): Promise<void> => {
    await api.post('/saved', { collegeId });
  },

  unsave: async (collegeId: number): Promise<void> => {
    await api.delete(`/saved/${collegeId}`);
  },
};
