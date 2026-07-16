import { connectDB } from './src/config/db.js';
import Admin from './src/models/Admin.js';
import sequelize from './src/config/db.js';

const seed = async () => {
  try {
    await connectDB();
    
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ where: { email: 'admin@siliconvista.com' } });
    if (existingAdmin) {
      console.log('Admin already exists! Updating password...');
      existingAdmin.password = 'Silicon@123';
      await existingAdmin.save();
      console.log('Password updated successfully!');
      process.exit();
    }

    await Admin.create({
      name: 'Super Admin',
      email: 'admin@siliconvista.com',
      password: 'Silicon@123',
    });

    console.log('Admin successfully created!');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seed();
