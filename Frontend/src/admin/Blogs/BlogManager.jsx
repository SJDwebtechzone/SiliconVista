import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaImage, FaCheckCircle, FaTimesCircle, FaBlog } from 'react-icons/fa';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
    is_published: true,
  });
  const [blogImage, setBlogImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    setBlogImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('content', formData.content);
    data.append('author', formData.author);
    data.append('is_published', formData.is_published);
    if (blogImage) {
      data.append('blogImage', blogImage);
    }

    try {
      if (editingId) {
        await axios.put(`/api/blogs/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccess('Blog updated successfully!');
      } else {
        await axios.post('/api/blogs', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccess('Blog created successfully!');
      }
      setFormData({ title: '', description: '', content: '', author: '', is_published: true });
      setBlogImage(null);
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      console.error('Error saving blog:', err);
      setError('Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      description: blog.description || '',
      content: blog.content || '',
      author: blog.author || '',
      is_published: blog.is_published,
    });
    setBlogImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`/api/blogs/${id}`);
        setSuccess('Blog deleted successfully');
        fetchBlogs();
      } catch (err) {
        console.error('Error deleting blog:', err);
        setError('Failed to delete blog');
      }
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="py-4 px-2" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="section-title fs-3 mb-0"><FaBlog className="me-2 text-primary"/> Blog Management</h2>
          <Badge bg="primary" className="mt-2 px-3 py-2 rounded-pill" style={{fontSize: '0.9rem'}}>
            <FaCheckCircle className="me-2"/> {blogs.length} Total Blogs
          </Badge>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="row">
        {/* Form Section */}
        <div className="col-lg-4 mb-4">
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
            <Card.Body className="p-4">
              <h5 className="mb-4 fw-bold text-primary border-bottom pb-2">
                <FaEdit className="me-2"/> {editingId ? 'Edit Blog' : 'Create New Blog'}
              </h5>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-secondary">Title *</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="title" 
                    placeholder="Enter blog title" 
                    value={formData.title} 
                    onChange={handleInputChange} 
                    required 
                    className="p-2 bg-light border-0"
                    style={{ borderRadius: '10px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-secondary">Author</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="author" 
                    placeholder="e.g., John Doe" 
                    value={formData.author} 
                    onChange={handleInputChange} 
                    className="p-2 bg-light border-0"
                    style={{ borderRadius: '10px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-secondary">Short Description</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    name="description" 
                    rows={2}
                    placeholder="A brief summary for the blog card..." 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    className="p-2 bg-light border-0"
                    style={{ borderRadius: '10px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-secondary">Main Content</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    name="content" 
                    rows={6}
                    placeholder="Write your full blog post here..." 
                    value={formData.content} 
                    onChange={handleInputChange} 
                    className="p-2 bg-light border-0"
                    style={{ borderRadius: '10px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold text-secondary">Cover Image</Form.Label>
                  <div className="bg-light p-3 text-center" style={{ borderRadius: '10px', border: '2px dashed #ccc' }}>
                    <Form.Control 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="d-none"
                      id="blogImageUpload"
                    />
                    <label htmlFor="blogImageUpload" style={{ cursor: 'pointer', margin: 0 }}>
                      <FaImage size={24} className="text-primary mb-2 d-block mx-auto" />
                      {blogImage ? (
                        <span className="text-success fw-bold"><FaCheckCircle className="me-1"/> File Selected</span>
                      ) : (
                        <span className="text-secondary">Click to browse image</span>
                      )}
                    </label>
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check 
                    type="switch"
                    id="is_published"
                    name="is_published"
                    label="Publish Immediately"
                    checked={formData.is_published}
                    onChange={handleInputChange}
                    className="fw-bold text-secondary"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" disabled={saving} className="py-2 fw-bold" style={{ borderRadius: '10px' }}>
                    {saving ? (
                      <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" /> Saving...</>
                    ) : (
                      <>{editingId ? 'Update Blog' : 'Publish Blog'}</>
                    )}
                  </Button>
                  
                  {editingId && (
                    <Button variant="outline-danger" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', content: '', author: '', is_published: true }); setBlogImage(null); }} className="py-2 fw-bold" style={{ borderRadius: '10px' }}>
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>

        {/* Display Section */}
        <div className="col-lg-8">
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px', backgroundColor: '#F4F7FE' }}>
            <Card.Body className="p-4">
              <h5 className="mb-4 fw-bold text-secondary">Manage Existing Blogs</h5>
              
              {blogs.length === 0 ? (
                <Alert variant="info" className="text-center py-5 border-0" style={{ borderRadius: '15px' }}>
                  <FaBlog size={40} className="mb-3 text-info opacity-50" />
                  <h4>No Blogs Found</h4>
                  <p>Use the form to create your first blog post.</p>
                </Alert>
              ) : (
                <div className="row g-4">
                  {blogs.map(blog => (
                    <div className="col-md-6" key={blog.id}>
                      <Card className="h-100 border-0 shadow-sm overflow-hidden blog-card-hover" style={{ borderRadius: '15px', transition: 'transform 0.2s' }}>
                        <div style={{ height: '160px', backgroundColor: '#f8f9fa', position: 'relative' }}>
                          {blog.cover_image_url ? (
                            <Card.Img variant="top" src={`/${blog.cover_image_url}`} style={{ height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                              <FaImage size={40} className="opacity-50 mb-2"/>
                              <small>No Image</small>
                            </div>
                          )}
                          <Badge bg={blog.is_published ? "success" : "secondary"} className="position-absolute top-0 end-0 m-2 px-3 py-2 rounded-pill shadow-sm">
                            {blog.is_published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                        <Card.Body className="d-flex flex-column p-4">
                          <Card.Title className="fw-bold fs-5 mb-2">{blog.title}</Card.Title>
                          <Card.Text className="text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
                            {blog.description ? (blog.description.length > 80 ? blog.description.substring(0, 80) + '...' : blog.description) : 'No description provided.'}
                          </Card.Text>
                          <div className="d-flex gap-2 mt-3 pt-3 border-top">
                            <Button variant="outline-primary" size="sm" className="flex-grow-1 fw-bold" onClick={() => handleEdit(blog)}>
                              <FaEdit className="me-1"/> Edit
                            </Button>
                            <Button variant="outline-danger" size="sm" className="flex-grow-1 fw-bold" onClick={() => handleDelete(blog.id)}>
                              <FaTrash className="me-1"/> Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
      <style>{`
        .blog-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default BlogManager;
