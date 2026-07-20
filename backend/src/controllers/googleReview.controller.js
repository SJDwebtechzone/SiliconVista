import * as googleReviewService from '../services/googleReview.service.js';
import GoogleReview from '../models/GoogleReview.js';

export const syncGoogleReviews = async (req, res) => {
  try {
    const result = await googleReviewService.syncReviews();

    res.json({
      success: true,
      ...result
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getReviewStats = async (req, res) => {
  try {
    const latestReview = await GoogleReview.findOne({ order: [['last_sync', 'DESC']] });
    const featuredReviews = await GoogleReview.findAll({ where: { featured: true } });
    
    let averageRating = latestReview ? latestReview.average_rating : 0;
    let totalReviews = latestReview ? latestReview.total_reviews : 0;
    let lastSync = latestReview ? latestReview.last_sync : null;
    let positivePercentage = 0;

    if (featuredReviews.length > 0) {
      const positiveCount = featuredReviews.filter(r => r.rating >= 4).length;
      positivePercentage = Math.round((positiveCount / featuredReviews.length) * 100);
    }

    res.status(200).json({
      success: true,
      averageRating,
      totalReviews,
      positivePercentage,
      lastSync
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch review stats', error: error.message });
  }
};

export const getSyncStatus = async (req, res) => {
  try {
    console.log("DEBUG: INSIDE getSyncStatus");
    const placeId = process.env.GOOGLE_PLACE_ID || null;
    
    // Use a raw query to completely bypass Sequelize timestamp alias mapping bugs
    const { default: sequelize } = await import('../config/db.js');
    console.log("DEBUG: Executing raw query");
    const [results] = await sequelize.query('SELECT updated_at FROM google_reviews ORDER BY id DESC LIMIT 1');
    console.log("DEBUG: Query returned", results);

    res.status(200).json({
      success: true,
      data: {
        placeId,
        lastSyncTime: results.length > 0 ? results[0].updated_at : null
      }
    });
  } catch (error) {
    console.log("DEBUG: ERROR CAUGHT", error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch sync status', error: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await GoogleReview.findAll({
      order: [['review_time', 'DESC']]
    });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching reviews', error: error.message });
  }
};

export const getFeaturedReviews = async (req, res) => {
  try {
    const reviews = await GoogleReview.findAll({
      where: { featured: true },
      order: [['review_time', 'DESC']]
    });

    const allReviews = await GoogleReview.findAll();
    const totalReviewsCount = allReviews.length;
    
    let averageRating = "0.0";
    let positivePercentage = 0;

    if (totalReviewsCount > 0) {
      const sum = allReviews.reduce((acc, curr) => acc + curr.rating, 0);
      averageRating = (sum / totalReviewsCount).toFixed(1);
      
      const positiveCount = allReviews.filter(r => r.rating >= 4).length;
      positivePercentage = Math.round((positiveCount / totalReviewsCount) * 100);
    }

    res.status(200).json({ 
      success: true, 
      data: reviews,
      stats: {
        averageRating,
        totalReviews: totalReviewsCount,
        positivePercentage
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching featured reviews', error: error.message });
  }
};

export const toggleFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await GoogleReview.findByPk(id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    
    // Toggle the featured status
    review.featured = !review.featured;
    await review.save();
    
    res.status(200).json({ success: true, data: review, message: `Review ${review.featured ? 'featured' : 'hidden'} successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error toggling review feature status', error: error.message });
  }
};
