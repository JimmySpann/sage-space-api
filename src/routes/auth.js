import { Router } from 'express';
import controllers from '../controllers/index.js';

const { auth } = controllers;
const router = Router();

router.post('/register', auth.register);
router.post('/login', auth.login);

export default router;
