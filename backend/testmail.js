import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

transporter.sendMail({
  from: process.env.MAIL_USERNAME,
  to: 'admin@siliconvista.in', // test recipient
  subject: 'Test Email',
  text: 'It works!'
}, (err, info) => {
  if (err) console.log('Error:', err);
  else console.log('Email sent:', info.response);
});
