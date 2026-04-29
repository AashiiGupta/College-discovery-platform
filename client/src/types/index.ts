export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface College {
  id: number;
  name: string;
  location: string;
  state: string;
  fees_min: number;
  fees_max: number;
  rating: number;
  established: number;
  affiliation: string;
  type: 'Government' | 'Private' | 'Deemed';
  placement_avg: number;
  placement_highest: number;
  description: string;
  image_url: string;
  created_at: string;
  saved_at?: string;
}

export interface Course {
  id: number;
  college_id: number;
  name: string;
  duration: string;
  fees: number;
  seats: number;
}

export interface CollegeWithCourses extends College {
  courses: Course[];
}

export interface CollegesResponse {
  colleges: College[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CollegeFilters {
  search: string;
  state: string;
  type: string;
  minFees: number;
  maxFees: number;
  course: string;
  page: number;
}
