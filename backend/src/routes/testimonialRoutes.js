import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

// Admin routes for testimonials
router.get('/', protect, async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({ order: [['created_at', 'DESC']] });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, upload.single('testimonialImage'), async (req, res) => {
  try {
    const { name, company, designation, message, status } = req.body;
    let image = '';
    if (req.file) {
      image = req.file.path.replace(/\\/g, '/');
    }

    const testimonial = await Testimonial.create({
      name,
      company,
      designation,
      message,
      image,
      status: status === 'true' || status === true,
    });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, upload.single('testimonialImage'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company, designation, message, status } = req.body;
    
    const testimonial = await Testimonial.findByPk(id);

    if (testimonial) {
      if (req.file) {
        testimonial.image = req.file.path.replace(/\\/g, '/');
      }

      testimonial.name = name || testimonial.name;
      testimonial.company = company || testimonial.company;
      testimonial.designation = designation || testimonial.designation;
      testimonial.message = message || testimonial.message;
      if (status !== undefined) {
        testimonial.status = status === 'true' || status === true;
      }

      await testimonial.save();
      res.json(testimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (testimonial) {
      await testimonial.destroy();
      res.json({ message: 'Testimonial removed' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
