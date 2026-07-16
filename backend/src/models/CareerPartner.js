import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CareerPartner = sequelize.define('CareerPartner', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

export default CareerPartner;
