import express from 'express';
import { getBrochures, createBrochure, updateBrochure, deleteBrochure, downloadBrochureRequest } from '../controllers/brochureController.js';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getBrochures)
  .post(protect, upload.single('brochureFile'), createBrochure);

router.post('/download', downloadBrochureRequest);

router.route('/:id')
  .put(protect, upload.single('brochureFile'), updateBrochure)
  .delete(protect, deleteBrochure);

export default router;
