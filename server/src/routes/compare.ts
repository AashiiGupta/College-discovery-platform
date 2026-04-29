import { Router } from 'express';
import { compareColleges, getCompareHistory } from '../controllers/compareController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { compareSchema } from '../middleware/schemas';
import { verifyToken } from '../utils/jwt';

const router = Router();

// Optionally attach user if token is present (saves history when logged in)
const optionalAuth = (req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    try {
      req.user = verifyToken(authHeader.split(' ')[1]);
    } catch {
      // ignore — compare works without auth
    }
  }
  next();
};

router.post('/', optionalAuth, validate(compareSchema), compareColleges);
router.get('/history', authenticate, getCompareHistory);

export default router;
