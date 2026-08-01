import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Spinner, Card, Badge, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaCloudUploadAlt, FaCheckCircle, FaImage, FaTrash, FaEdit } from 'react-icons/fa';
import '../admin.css';

const BannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [titleColor, setTitleColor] = useState('#FFFFFF');
  const [subtitleColor, setSubtitleColor] = useState('#FFFFFF');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchBanners = async () => {
    try {
      const { data } = await axios.get('/api/banner');
      setBanners(data);
    } catch (err) {
      setError('Error fetching banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('title', title);
    data.append('subtitle', subtitle);
    data.append('title_color', titleColor);
    data.append('subtitle_color', subtitleColor);
    data.append('is_active', true);
    if (imageFile) data.append('bannerImage', imageFile);

    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingId) {
        await axios.put(`/api/banner/${editingId}`, data, config);
        setSuccess('Banner updated successfully!');
      } else {
        await axios.post('/api/banner', data, config);
        setSuccess('Banner pushed to production successfully!');
      }
      
      setTitle('');
      setSubtitle('');
      setTitleColor('#FFFFFF');
      setSubtitleColor('#FFFFFF');
      setImageFile(null);
      setEditingId(null);
      
      // Clear file input visually
      const fileInput = document.getElementById('bannerImageInput');
      if (fileInput) fileInput.value = '';

      fetchBanners();
    } catch (err) {
      setError('Error saving banner');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/banner/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        fetchBanners();
      } catch (err) {
        alert('Error deleting banner');
      }
    }
  };

  const handleEdit = (banner) => {
    setEditingId(banner.id);
    setTitle(banner.title || '');
    setSubtitle(banner.subtitle || '');
    setTitleColor(banner.title_color || '#FFFFFF');
    setSubtitleColor(banner.subtitle_color || '#FFFFFF');
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setTitleColor('#FFFFFF');
    setSubtitleColor('#FFFFFF');
    setImageFile(null);
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="py-4 px-2" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="section-title fs-3 mb-0">Banner Management</h2>
          <Badge bg="success" className="mt-2 px-3 py-2 rounded-pill" style={{fontSize: '0.9rem'}}>
            <FaCheckCircle className="me-2"/> {banners.length} Active Banners
          </Badge>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="row">
        {/* Form Section */}
        <div className="col-md-5 mb-4">
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="section-title text-secondary" style={{ fontSize: '1rem' }}>Banner Title</Form.Label>
                  <div className="d-flex bg-light p-1 align-items-center" style={{ borderRadius: '10px' }}>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter display title" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      required 
                      className="p-2 border-0 bg-transparent flex-grow-1"
                      style={{ boxShadow: 'none' }}
                    />
                    <Form.Control 
                      type="color" 
                      value={titleColor} 
                      onChange={e => setTitleColor(e.target.value)} 
                      className="p-0 border-0 bg-transparent mx-2"
                      style={{ width: '35px', height: '35px', cursor: 'pointer', borderRadius: '5px' }}
                      title="Choose title color"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="section-title text-secondary" style={{ fontSize: '1rem' }}>Banner Subtitle (Supports multiple lines / bullet points)</Form.Label>
                  <div className="d-flex bg-light p-1 align-items-start" style={{ borderRadius: '10px' }}>
                    <Form.Control 
                      as="textarea"
                      rows={3}
                      placeholder="Enter display subtitle (e.g. 1. Feature one&#10;2. Feature two)" 
                      value={subtitle} 
                      onChange={e => setSubtitle(e.target.value)} 
                      className="p-2 border-0 bg-transparent flex-grow-1"
                      style={{ boxShadow: 'none', resize: 'vertical' }}
                    />
                    <Form.Control 
                      type="color" 
                      value={subtitleColor} 
                      onChange={e => setSubtitleColor(e.target.value)} 
                      className="p-0 border-0 bg-transparent mx-2 mt-1"
                      style={{ width: '35px', height: '35px', cursor: 'pointer', borderRadius: '5px' }}
                      title="Choose subtitle color"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <div className="d-flex flex-column mb-2">
                    <Form.Label className="section-title text-secondary mb-1" style={{ fontSize: '1rem' }}>Hero Image <span className="text-danger">*</span></Form.Label>
                    <small className="text-muted">Allowed: .jpg, .jpeg, .png, .gif, .webp | Max size: 200KB</small>
                  </div>
                  <div 
                    className="border-dashed p-4 text-center mt-2 bg-light" 
                    style={{ borderRadius: '10px', border: '2px dashed #ccc', position: 'relative' }}
                  >
                    <input 
                      type="file" 
                      id="bannerImageInput"
                      accept=".jpg,.jpeg,.png,.gif,.webp"
                      onChange={e => setImageFile(e.target.files[0])} 
                      required={!editingId}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                    <FaCloudUploadAlt size={40} className="text-primary mb-2" />
                    <h5 className="section-title m-0 text-primary" style={{ fontSize: '1.1rem' }}>Select JPG / PNG</h5>
                    {imageFile && <p className="mt-2 text-success fw-bold mb-0">{imageFile.name}</p>}
                  </div>
                </Form.Group>

                <div className="d-flex gap-2 mt-3">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="flex-grow-1 py-3 fw-bold rounded-pill shadow-sm"
                    disabled={uploading}
                    style={{ background: 'linear-gradient(90deg, #00C6A0, #2196F3)', border: 'none' }}
                  >
                    {uploading ? 'Processing...' : (editingId ? 'Update Banner' : 'Push to Production')}
                  </Button>
                  {editingId && (
                    <Button 
                      variant="secondary" 
                      type="button" 
                      onClick={cancelEdit}
                      className="py-3 fw-bold rounded-pill shadow-sm px-4"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>

        {/* Current Production Banners Preview Section */}
        <div className="col-md-7">
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px', maxHeight: '600px', overflowY: 'auto' }}>
            <Card.Body className="p-4">
              <h3 className="section-title mb-4">Currently Live Banners</h3>
              {banners.length > 0 ? (
                <Row className="g-3">
                  {banners.map(banner => (
                    <Col sm={6} key={banner.id}>
                      <Card className="border-0 shadow-sm overflow-hidden h-100 position-relative group">
                        <div style={{ height: '140px', backgroundColor: '#f8f9fa' }}>
                          {banner.image ? (
                            <img 
                              src={`${import.meta.env.VITE_FILE_BASE_URL}/${banner.image}`} 
                              alt={banner.title} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                          ) : (
                            <div className="d-flex h-100 align-items-center justify-content-center">
                              <FaImage size={30} className="text-muted opacity-50" />
                            </div>
                          )}
                        </div>
                        <div className="p-2 bg-white d-flex justify-content-between align-items-center">
                          <span className="fw-bold text-truncate" style={{ fontSize: '0.9rem', maxWidth: '80%' }}>{banner.title}</span>
                          <div className="d-flex">
                            <Button 
                              variant="light" 
                              className="text-primary p-1 border-0 me-2" 
                              onClick={() => handleEdit(banner)}
                              title="Edit Banner"
                            >
                              <FaEdit size={14} />
                            </Button>
                            <Button 
                              variant="light" 
                              className="text-danger p-1 border-0" 
                              onClick={() => handleDelete(banner.id)}
                              title="Delete Banner"
                            >
                              <FaTrash size={14} />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center text-muted bg-light rounded h-100" style={{ minHeight: '300px' }}>
                  <FaImage size={50} className="mb-3 opacity-50" />
                  <p className="m-0">No banners currently active</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BannerManager;
