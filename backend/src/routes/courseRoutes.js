import express from 'express';
import { 
  createSection, getSections, getSection, updateSection, deleteSection,
  createTopic, updateTopic, deleteTopic 
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/course-sections', getSections);
router.get('/course-sections/:id', getSection);

// Admin routes for Sections
router.post('/admin/course-sections', protect, createSection);
router.put('/admin/course-sections/:id', protect, updateSection);
router.delete('/admin/course-sections/:id', protect, deleteSection);

// Admin routes for Topics
router.post('/admin/course-section-items', protect, createTopic);
router.put('/admin/course-section-items/:id', protect, updateTopic);
router.delete('/admin/course-section-items/:id', protect, deleteTopic);

export default router;
