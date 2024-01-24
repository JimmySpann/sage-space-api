import { Router } from 'express';
import ctrl from '../controllers/index.js';
import authRequired from '../middleware/authRequired.js';

const router = Router();

// routes
router.get('/', authRequired, ctrl.workTime.index);
router.get('/:id', authRequired, ctrl.workTime.show);
router.post('/', authRequired, ctrl.workTime.create);
router.put('/:id', authRequired, ctrl.workTime.update);
router.delete('/:id', authRequired, ctrl.workTime.destroy);

export default router;