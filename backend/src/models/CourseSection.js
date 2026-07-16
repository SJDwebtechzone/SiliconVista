import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CourseSection = sequelize.define('CourseSection', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'course_sections',
  timestamps: true,
});

export default CourseSection;
