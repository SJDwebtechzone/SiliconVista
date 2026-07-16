import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';
import Review from '../models/Review.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_secret_key', {
    expiresIn: '30d',
  });
};

export const authAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid Email or Password'
      });
    }

    res.json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const reviews = await Review.findAll();

    const totalReviews = reviews.length;
    const pendingReviews = reviews.filter(r => r.status === 'Pending').length;
    const approvedReviews = reviews.filter(r => r.status === 'Approved').length;
    const rejectedReviews = reviews.filter(r => r.status === 'Rejected').length;

    // Generate last 7 days chart data
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      chartData.push({
        name: dateStr,
        Approved: 0,
        Pending: 0,
        Rejected: 0
      });
    }

    reviews.forEach(review => {
      // Find matching date in chartData
      const rDate = new Date(review.created_at);
      const rDateStr = rDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      const dayData = chartData.find(d => d.name === rDateStr);
      if (dayData) {
        if (review.status === 'Approved') dayData.Approved++;
        else if (review.status === 'Pending') dayData.Pending++;
        else if (review.status === 'Rejected') dayData.Rejected++;
      }
    });

    res.json({
      totalReviews,
      pendingReviews,
      approvedReviews,
      rejectedReviews,
      chartData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
