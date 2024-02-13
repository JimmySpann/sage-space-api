import { Router } from 'express';
import ctrl from '../controllers/index.js';
import authRequired from '../middleware/authRequired.js';

const router = Router();

router.get('/', authRequired, ctrl.habits.index);
router.get('/:id', authRequired, ctrl.habits.show);
router.post('/', authRequired, ctrl.habits.create);
router.put('/:id', authRequired, ctrl.habits.update);
router.delete('/:id', authRequired, ctrl.habits.destroy);

export default router;