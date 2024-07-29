import { Router } from 'express';
import controllers from '../controllers/index.js';
import { authRequired } from '../middleware/authRequired.js';

const { events } = controllers;
const router = Router();

router.get('/', authRequired, events.index);
router.get('/:id', authRequired, events.show);
router.post('/', authRequired, events.create);
router.put('/:id', authRequired, events.update);
router.delete('/:id', authRequired, events.destroy);

export default router;