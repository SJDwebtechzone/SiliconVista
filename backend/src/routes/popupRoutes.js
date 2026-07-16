import express from 'express';
import { getPopups, createPopup, updatePopup, deletePopup } from '../controllers/popupController.js';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPopups);
router.post('/', protect, upload.single('popupImage'), createPopup);
router.put('/:id', protect, upload.single('popupImage'), updatePopup);
router.delete('/:id', protect, deletePopup);

export default router;
