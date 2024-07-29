import { Router } from 'express';
import controllers from '../controllers/index.js';
import { authRequired } from '../middleware/authRequired.js';

const { tasks } = controllers;
const router = Router();

router.get('/', authRequired, tasks.index);
router.get('/:id', authRequired, tasks.show);
router.post('/', authRequired, tasks.create);
router.put('/:id', authRequired, tasks.update);
router.delete('/:id', authRequired, tasks.destroy);

export default router;