import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'silicon_vista', 
  process.env.DB_USER || 'postgres', 
  process.env.DB_PASSWORD || 'password', 
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Database connected successfully.');
    
    // Initialize models and relationships
    const { default: Setting } = await import('../models/Setting.js');
    const { default: CourseSection } = await import('../models/CourseSection.js');
    const { default: CourseSectionItem } = await import('../models/CourseSectionItem.js');
    const { default: Popup } = await import('../models/Popup.js');
    const { default: Brochure } = await import('../models/Brochure.js');
    const { default: CareerPartner } = await import('../models/CareerPartner.js');
    const { default: Blog } = await import('../models/Blog.js');
    const { default: GoogleReview } = await import('../models/GoogleReview.js');
    
    // Relationships
    CourseSection.hasMany(CourseSectionItem, { foreignKey: 'section_id', onDelete: 'CASCADE' });
    CourseSectionItem.belongsTo(CourseSection, { foreignKey: 'section_id' });

    // Sync all models (in production, use migrations instead)
    await sequelize.sync({ alter: true }); 
    await Brochure.sync({ alter: true });
    await CareerPartner.sync({ alter: true }); 
    await Blog.sync({ alter: true });
    await GoogleReview.sync({ alter: true });
    console.log('Database synced.');
    
    // Initialize default settings if they don't exist
    const [setting, created] = await Setting.findOrCreate({
      where: { key: 'show_review_section' },
      defaults: { value: 'true' }
    });
    if (created) {
      console.log('Default setting for show_review_section created.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
