import { Router } from 'express';
import ctrl from '../controllers/index.js';
import authRequired from '../middleware/authRequired.js';

const router = Router();

// routes
router.get('/', authRequired, ctrl.tasks.index);
router.get('/:id', authRequired, ctrl.tasks.show);
router.post('/', authRequired, ctrl.tasks.create);
router.put('/:id', authRequired, ctrl.tasks.update);
router.delete('/:id', authRequired, ctrl.tasks.destroy);

export default router;