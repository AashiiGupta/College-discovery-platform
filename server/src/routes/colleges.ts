import { Router } from 'express';
import { getColleges, getCollegeById, getStates } from '../controllers/collegeController';

const router = Router();

router.get('/', getColleges);
router.get('/states', getStates);
router.get('/:id', getCollegeById);

export default router;
