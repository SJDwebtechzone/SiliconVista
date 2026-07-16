import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Brochure = sequelize.define('Brochure', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  file_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  file_size: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'brochures',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

export default Brochure;
