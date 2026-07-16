import Review from '../models/Review.js';

// Public endpoint
export const createReview = async (req, res) => {
  try {
    const { name, email, company, designation, rating, review } = req.body || {};
    let photo = '';
    
    if (req.file) {
      photo = req.file.path.replace(/\\/g, '/'); // Normalize path
    }

    const newReview = await Review.create({
      name,
      email,
      company,
      designation,
      rating,
      review,
      photo,
      status: 'Pending',
    });

    res.status(201).json({ message: 'Review submitted successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public endpoint
export const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { status: 'Approved' },
      order: [['created_at', 'DESC']],
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin endpoints
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      order: [['created_at', 'DESC']],
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (review) {
      review.status = 'Approved';
      await review.save();
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (review) {
      review.status = 'Rejected';
      await review.save();
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (review) {
      await review.destroy();
      res.json({ message: 'Review removed' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
