import express from 'express';
import { authAdmin, getDashboardStats } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authAdmin);
router.get('/dashboard-stats', protect, getDashboardStats);

export default router;
