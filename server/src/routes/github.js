import { Router } from 'express';
import { getUserData } from '../controllers/githubController.js';

const router = Router();
router.get('/:username', getUserData);
export default router;