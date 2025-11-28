import { Router } from 'express';
import { generateStrategy, getStrategy } from '../controllers/strategyController';
import { manualUpdate } from '../controllers/updateController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Protect all routes
router.use(authenticateUser);

router.post('/generate', generateStrategy);
router.get('/:id', getStrategy);
router.post('/update/manual', manualUpdate);

export default router;
