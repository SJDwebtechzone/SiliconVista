import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
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

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const admin = await Admin.findByPk(req.admin.id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (email && email !== admin.email) {
      const existing = await Admin.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: 'This email is already in use' });
      }
    }

    admin.name = name !== undefined ? name : admin.name;
    admin.email = email !== undefined ? email : admin.email;

    await admin.save();

    res.json({ id: admin.id, name: admin.name, email: admin.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findByPk(req.admin.id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      // Don't reveal whether the email exists, for security
      return res.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
    await admin.save();

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Silicon Vista Admin" <${process.env.MAIL_USERNAME}>`,
      to: admin.email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset for your Silicon Vista Admin account.</p>
        <p>Click the link below to reset your password. This link expires in 30 minutes.</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you did not request this, please ignore this email.</p>
      `
    });

    res.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const admin = await Admin.findOne({
      where: { resetPasswordToken: token }
    });

    if (!admin || !admin.resetPasswordExpires || admin.resetPasswordExpires < new Date()) {
      return res.status(400).json({ message: 'Reset link is invalid or has expired' });
    }

    admin.password = newPassword;
    admin.resetPasswordToken = null;
    admin.resetPasswordExpires = null;
    await admin.save();

    res.json({ message: 'Password reset successfully. You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};