import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const GoogleReview = sequelize.define('GoogleReview', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  google_review_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  author_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  review_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  average_rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  total_reviews: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  last_sync: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'google_reviews',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default GoogleReview;
