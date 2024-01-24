// imports
import { Router } from 'express';
import ctrl from '../controllers/index.js';

const router = Router();

// Current Path = '/api/v1/auth'

router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.get('/verify', ctrl.auth.verify);

export default router;
