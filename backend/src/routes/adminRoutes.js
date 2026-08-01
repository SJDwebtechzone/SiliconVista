import express from 'express';
import { authAdmin, getDashboardStats, updateProfile, changePassword, forgotPassword, resetPassword } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authAdmin);
router.get('/dashboard-stats', protect, getDashboardStats);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

export default router;