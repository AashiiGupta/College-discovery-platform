export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
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
  created_at: Date;
}

export interface Course {
  id: number;
  college_id: number;
  name: string;
  duration: string;
  fees: number;
  seats: number;
}

export interface SavedCollege {
  id: number;
  user_id: number;
  college_id: number;
  created_at: Date;
}

export interface CompareHistory {
  id: number;
  user_id: number;
  college_ids: number[];
  created_at: Date;
}

export interface JwtPayload {
  userId: number;
  email: string;
}

export interface AuthRequest extends Express.Request {
  user?: JwtPayload;
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
