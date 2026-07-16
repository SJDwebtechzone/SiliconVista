import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(150),
  },
  company: {
    type: DataTypes.STRING(150),
  },
  designation: {
    type: DataTypes.STRING(150),
  },
  message: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING(255),
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'testimonials',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

export default Testimonial;
