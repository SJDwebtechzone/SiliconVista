import cron from 'node-cron';
import { syncReviews } from '../services/googleReview.service.js';

export const initCronJobs = () => {
  // Run every 24 hours (midnight)
  cron.schedule('0 0 * * *', async () => {
    console.log('Running automatic Google Reviews sync (every 24 hours)...');
    try {
      await syncReviews();
      console.log('Google Reviews sync completed successfully.');
    } catch (error) {
      console.error('Failed to sync Google Reviews in cron job:', error);
    }
  });
  
  console.log('Google Reviews sync cron job initialized.');
};
