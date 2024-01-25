// imports
import { Router } from 'express';
import ctrl from '../controllers/index.js';

const router = Router();

router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.get('/verify', ctrl.auth.verify);

export default router;
