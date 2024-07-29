import { Router } from 'express';
import controllers from '../controllers/index.js';
import { authRequired } from '../middleware/authRequired.js';

const { lists } = controllers;
const router = Router();

router.get('/', authRequired, lists.index);
router.get('/:id', authRequired, lists.show);
router.post('/', authRequired, lists.create);
router.put('/:id', authRequired, lists.update);
router.delete('/:id', authRequired, lists.destroy);

export default router;