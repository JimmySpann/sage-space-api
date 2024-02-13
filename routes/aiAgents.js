import { Router } from 'express';
import ctrl from '../controllers/index.js';
import authRequired from '../middleware/authRequired.js';

const router = Router();

router.post('/getAgentTextResponse/', authRequired, ctrl.aiAgents.getAgentTextResponse);
router.post('/getVoiceFromText/', authRequired, ctrl.aiAgents.getVoiceFromText);

export default router;