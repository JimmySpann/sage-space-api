import { Router } from 'express';
import ctrl from '../controllers/index.js';
import authRequired from '../middleware/authRequired.js';

const router = Router();

router.get('/', authRequired, ctrl.lists.index);
router.get('/:id', authRequired, ctrl.lists.show);
router.post('/', authRequired, ctrl.lists.create);
router.put('/:id', authRequired, ctrl.lists.update);
router.delete('/:id', authRequired, ctrl.lists.destroy);

export default router;