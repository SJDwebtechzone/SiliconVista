import express from 'express';
import { getNewsEvents, createNewsEvent, updateNewsEvent, deleteNewsEvent } from '../controllers/newsEventController.js';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getNewsEvents);
router.post('/', protect, upload.single('newsImage'), createNewsEvent);
router.put('/:id', protect, upload.single('newsImage'), updateNewsEvent);
router.delete('/:id', protect, deleteNewsEvent);

export default router;