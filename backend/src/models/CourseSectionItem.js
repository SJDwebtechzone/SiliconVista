import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CourseSectionItem = sequelize.define('CourseSectionItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  section_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'course_sections',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  content: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'course_section_items',
  timestamps: true,
});

export default CourseSectionItem;
