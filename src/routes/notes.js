import { Router } from 'express';
import controllers from '../controllers/index.js';
import { authRequired } from '../middleware/authRequired.js';

const { notes } = controllers;
const router = Router();

// routes
router.get('/', authRequired, notes.index);
router.get('/:id', authRequired, notes.show);
router.post('/', authRequired, notes.create);
router.put('/:id', authRequired, notes.update);
router.delete('/:id', authRequired, notes.destroy);

export default router;