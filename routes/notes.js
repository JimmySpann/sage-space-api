import { Router } from 'express';
import ctrl from '../controllers/index.js';
import authRequired from '../middleware/authRequired.js';

const router = Router();

// routes
router.get('/', authRequired, ctrl.notes.index);
router.get('/:id', authRequired, ctrl.notes.show);
router.post('/', authRequired, ctrl.notes.create);
router.put('/:id', authRequired, ctrl.notes.update);
router.delete('/:id', authRequired, ctrl.notes.destroy);

export default router;