import { Router } from 'express';
import controllers from '../controllers/index.js';
import { authRequired } from '../middleware/authRequired.js';

const { workTime } = controllers;
const router = Router();

// routes
router.get('/', authRequired, workTime.index);
router.get('/:id', authRequired, workTime.show);
router.post('/', authRequired, workTime.create);
router.put('/:id', authRequired, workTime.update);
router.delete('/:id', authRequired, workTime.destroy);

export default router;
