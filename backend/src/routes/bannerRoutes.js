import express from 'express';
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner
} from '../controllers/bannerController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getBanners)
  .post(protect, upload.single('bannerImage'), createBanner);

router.route('/:id')
  .put(protect, upload.single('bannerImage'), updateBanner)
  .delete(protect, deleteBanner);

export default router;
