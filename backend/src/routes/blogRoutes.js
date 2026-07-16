import express from 'express';
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', upload.single('blogImage'), createBlog);
router.put('/:id', upload.single('blogImage'), updateBlog);
router.delete('/:id', deleteBlog);

export default router;
