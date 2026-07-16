import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcrypt';

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
  },
  email: {
    type: DataTypes.STRING(150),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: 'admins',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false, // According to schema, only created_at is needed
});

// Hook to hash password before saving
Admin.beforeCreate(async (admin) => {
  if (admin.password) {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
  }
});

Admin.beforeUpdate(async (admin) => {
  if (admin.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
  }
});

// Method to verify password
Admin.prototype.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default Admin;
