import express from 'express';
import {
  createReview,
  getApprovedReviews,
  getAllReviews,
  approveReview,
  rejectReview,
  deleteReview
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', upload.single('photo'), createReview);
router.get('/', getApprovedReviews);

// Admin routes
router.get('/admin', protect, getAllReviews);
router.put('/admin/:id/approve', protect, approveReview);
router.put('/admin/:id/reject', protect, rejectReview);
router.delete('/admin/:id', protect, deleteReview);

export default router;
