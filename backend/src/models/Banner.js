import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Banner = sequelize.define('Banner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
  },
  title_color: {
    type: DataTypes.STRING(20),
    defaultValue: '#FFFFFF',
  },
  subtitle: {
    type: DataTypes.TEXT,
  },
  subtitle_color: {
    type: DataTypes.STRING(20),
    defaultValue: '#FFFFFF',
  },
  button_text: {
    type: DataTypes.STRING(100),
  },
  button_link: {
    type: DataTypes.STRING(255),
  },
  image: {
    type: DataTypes.STRING(255),
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'banners',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

export default Banner;
