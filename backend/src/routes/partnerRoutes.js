import express from 'express';
import { getPartners, createPartner, updatePartner, deletePartner } from '../controllers/partnerController.js';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPartners)
  .post(protect, upload.single('partnerLogo'), createPartner);

router.route('/:id')
  .put(protect, upload.single('partnerLogo'), updatePartner)
  .delete(protect, deletePartner);

export default router;
