import Blog from '../models/Blog.js';
import fs from 'fs';
import path from 'path';

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error fetching blogs.' });
  }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Server error fetching blog.' });
  }
};

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, content, author, is_published } = req.body;
    let cover_image_url = null;

    if (req.file) {
      // Normalize path for web delivery
      cover_image_url = req.file.path.replace(/\\/g, '/');
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      author,
      is_published: is_published === 'true' || is_published === true,
      cover_image_url
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error creating blog.' });
  }
};

// Update an existing blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, author, is_published } = req.body;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    let cover_image_url = blog.cover_image_url;
    if (req.file) {
      cover_image_url = req.file.path.replace(/\\/g, '/');
      // Delete old image
      if (blog.cover_image_url && fs.existsSync(path.resolve(blog.cover_image_url))) {
        fs.unlinkSync(path.resolve(blog.cover_image_url));
      }
    }

    await blog.update({
      title,
      description,
      content,
      author,
      is_published: is_published === 'true' || is_published === true,
      cover_image_url
    });

    res.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Server error updating blog.' });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    // Delete associated image file
    if (blog.cover_image_url && fs.existsSync(path.resolve(blog.cover_image_url))) {
      fs.unlinkSync(path.resolve(blog.cover_image_url));
    }

    await blog.destroy();
    res.json({ message: 'Blog deleted successfully.' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Server error deleting blog.' });
  }
};
