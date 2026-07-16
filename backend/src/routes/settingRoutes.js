import express from 'express';
import { getSetting, updateSetting } from '../controllers/settingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to get a setting (needed for homepage)
router.get('/:key', getSetting);

// Protected route to update a setting (only admin)
router.put('/:key', protect, updateSetting);

export default router;
