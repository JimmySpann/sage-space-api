import { Router } from 'express';
import ctrl from '../controllers/index.js';
import authRequired from '../middleware/authRequired.js';

const router = Router();

router.post('/', authRequired, ctrl.tasks.create);
router.put('/:id', authRequired, ctrl.tasks.update);
router.delete('/:id', authRequired, ctrl.tasks.destroy);
router.delete('/deleteCompleted/:id', authRequired, ctrl.tasks.destroyCompleted);

export default router;