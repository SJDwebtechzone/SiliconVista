import Brochure from '../models/Brochure.js';
import nodemailer from 'nodemailer';

// Helper function to format bytes to human readable format
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getBrochures = async (req, res) => {
  try {
    const brochures = await Brochure.findAll({
      order: [['created_at', 'DESC']],
    });
    res.json(brochures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBrochure = async (req, res) => {
  try {
    const { title, is_active } = req.body;
    let file_url = '';
    let file_size = '';
    
    if (req.file) {
      file_url = req.file.path.replace(/\\/g, '/'); // Normalize path
      file_size = formatBytes(req.file.size);
    }

    if (!file_url) {
      return res.status(400).json({ message: 'File is required' });
    }

    const brochure = await Brochure.create({
      title,
      file_url,
      file_size,
      is_active: is_active === 'true' || is_active === true,
    });

    res.status(201).json(brochure);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBrochure = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, is_active } = req.body;
    
    const brochure = await Brochure.findByPk(id);

    if (brochure) {
      if (req.file) {
        brochure.file_url = req.file.path.replace(/\\/g, '/');
        brochure.file_size = formatBytes(req.file.size);
      }

      brochure.title = title !== undefined ? title : brochure.title;
      
      const parsedIsActive = is_active === 'true' || is_active === true;
      brochure.is_active = is_active !== undefined ? parsedIsActive : brochure.is_active;

      await brochure.save();
      res.json(brochure);
    } else {
      res.status(404).json({ message: 'Brochure not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBrochure = async (req, res) => {
  try {
    const { id } = req.params;
    const brochure = await Brochure.findByPk(id);

    if (brochure) {
      await brochure.destroy();
      res.json({ message: 'Brochure removed' });
    } else {
      res.status(404).json({ message: 'Brochure not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadBrochureRequest = async (req, res) => {
  try {
    const { name, email, phone, qualification, profile, graduationYear, brochureTitle } = req.body;

    if (!name || !email || !phone || !qualification || !profile || !graduationYear) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    const adminMail = {
      from: `"Silicon Vista Brochure Leads" <${process.env.MAIL_USERNAME}>`,
      to: process.env.MAIL_USERNAME,
      replyTo: email,
      subject: `New Brochure Download: ${brochureTitle}`,
      html: `
        <h3>New Brochure Download Request</h3>
        <p><b>Brochure:</b> ${brochureTitle}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Educational Qualification:</b> ${qualification}</p>
        <p><b>Current Profile:</b> ${profile}</p>
        <p><b>Graduation Year:</b> ${graduationYear}</p>
      `
    };

    const userMail = {
      from: `"Silicon Vista Team" <${process.env.MAIL_USERNAME}>`,
      to: email,
      subject: "Your Silicon Vista Brochure Download",
      text: `Hi ${name},\n\nThank you for your interest in Silicon Vista! You requested to download the brochure: ${brochureTitle}.\n\nBest regards,\nSilicon Vista Team`
    };

    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error("Error sending brochure email: ", error);
    res.status(500).json({ message: 'Error processing download request.' });
  }
};
