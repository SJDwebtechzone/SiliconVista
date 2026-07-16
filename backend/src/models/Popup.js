import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Popup = sequelize.define('Popup', {
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
  image: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'popups',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

export default Popup;
