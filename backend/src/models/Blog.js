import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cover_image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'blogs',
  timestamps: true,
});

export default Blog;
