import express from 'express';
import {
  syncGoogleReviews,
  getAllReviews,
  getFeaturedReviews,
  toggleFeature,
  getSyncStatus,
  getReviewStats
} from '../controllers/googleReview.controller.js';

// Assuming you have an admin authentication middleware, import it here if needed.
// import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to get featured reviews for the website
router.get('/', getFeaturedReviews);

// Public route to get status (last sync time and place ID for 'Read on Google' link)
router.get('/status', getSyncStatus);

// Public route to get stats dynamically
router.get('/stats', getReviewStats);

// Admin routes
// Optionally protect these with `protect, admin` middleware if it exists in this project
router.get('/all', getAllReviews);
router.get('/sync', syncGoogleReviews);
router.patch('/:id/feature', toggleFeature);

export default router;
