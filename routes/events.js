import { Router } from 'express';
import ctrl from '../controllers/index.js';
import authRequired from '../middleware/authRequired.js';

const router = Router();

// routes
router.get('/', authRequired, ctrl.events.index);
router.get('/:id', authRequired, ctrl.events.show);
router.post('/', authRequired, ctrl.events.create);
router.put('/:id', authRequired, ctrl.events.update);
router.delete('/:id', authRequired, ctrl.events.destroy);

export default router;