import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const NewsEvent = sequelize.define('NewsEvent', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  event_date: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'news_events',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

export default NewsEvent;