import { Router } from 'express';
import { getSavedColleges, saveCollege, unsaveCollege, getSavedIds } from '../controllers/savedController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { saveCollegeSchema } from '../middleware/schemas';

const router = Router();

router.use(authenticate);

router.get('/', getSavedColleges);
router.get('/ids', getSavedIds);
router.post('/', validate(saveCollegeSchema), saveCollege);
router.delete('/:collegeId', unsaveCollege);

export default router;
