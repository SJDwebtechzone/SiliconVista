import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Setting = sequelize.define('Setting', {
  key: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
}, {
  tableName: 'settings',
  timestamps: true,
});

export default Setting;
