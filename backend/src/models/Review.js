import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(150),
  },
  email: {
    type: DataTypes.STRING(150),
  },
  company: {
    type: DataTypes.STRING(150),
  },
  designation: {
    type: DataTypes.STRING(150),
  },
  photo: {
    type: DataTypes.STRING(255),
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  review: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'Pending',
    validate: {
      isIn: [['Pending', 'Approved', 'Rejected']]
    }
  }
}, {
  tableName: 'reviews',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

export default Review;
