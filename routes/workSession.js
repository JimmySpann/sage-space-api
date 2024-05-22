import { Router } from 'express';
import ctrl from '../controllers/index.js';
import authRequired from '../middleware/authRequired.js';

const router = Router();

router.post('/', authRequired, ctrl.workSession.create);
router.put('/:id', authRequired, ctrl.workSession.update);
router.delete('/:id', authRequired, ctrl.workSession.destroy);

export default router;