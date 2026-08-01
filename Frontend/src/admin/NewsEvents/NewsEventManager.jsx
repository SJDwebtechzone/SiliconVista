import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Spinner, Card, Badge, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaCloudUploadAlt, FaCheckCircle, FaNewspaper, FaTrash, FaEdit } from 'react-icons/fa';
import '../admin.css';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const NewsEventManager = () => {
  const [sectionEnabled, setSectionEnabled] = useState(true);
  const [settingLoading, setSettingLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get('/api/news-events');
      setItems(data);
    } catch (err) {
      setError('Error fetching news & events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const { data } = await axios.get('/api/settings/show_news_events');
        setSectionEnabled(data.value === 'true');
      } catch (err) {
        setSectionEnabled(true); // default to visible if setting doesn't exist yet
      } finally {
        setSettingLoading(false);
      }
    };
    fetchSetting();
    fetchItems();
  }, []);

  const handleToggleSection = async (checked) => {
    setSectionEnabled(checked);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        '/api/settings/show_news_events',
        { value: checked ? 'true' : 'false' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      setError('Error updating section visibility');
      setSectionEnabled(!checked); // revert on failure
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('event_date', eventDate);
    data.append('is_active', isActive);
    if (file) data.append('newsImage', file);

    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingId) {
       await axios.put(`/api/news-events/${editingId}`, data, config);
        setSuccess('News/Event updated successfully!');
      } else {
        await axios.post('/api/news-events', data, config);
        setSuccess('News/Event created successfully!');
      }

      setTitle('');
      setDescription('');
      setEventDate('');
      setIsActive(true);
      setFile(null);
      setEditingId(null);

      const fileInput = document.getElementById('newsImageInput');
      if (fileInput) fileInput.value = '';

      fetchItems();
    } catch (err) {
      setError('Error saving news/event');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/news-events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        fetchItems();
      } catch (err) {
        alert('Error deleting item');
      }
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title || '');
    setDescription(item.description || '');
    setEventDate(item.event_date || '');
    setIsActive(item.is_active);
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setEventDate('');
    setIsActive(true);
    setFile(null);
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="py-4 px-2" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="section-title fs-3 mb-0">News & Events Management</h2>
          <Badge bg="success" className="mt-2 px-3 py-2 rounded-pill" style={{fontSize: '0.9rem'}}>
            <FaCheckCircle className="me-2"/> {items.length} Total Items
          </Badge>
        </div>
      </div>

      {!settingLoading && (
        <div className="mb-4 p-3 bg-white rounded-3 shadow-sm d-flex align-items-center justify-content-between">
          <div>
            <h6 className="fw-bold mb-1">Show on Website</h6>
            <small className="text-muted">Turn this off to hide the News & Events section from the homepage.</small>
          </div>
          <Form.Check 
            type="switch"
            id="section-toggle"
            checked={sectionEnabled}
            onChange={(e) => handleToggleSection(e.target.checked)}
          />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="row">
        {/* Form Section */}
        <div className="col-md-5 mb-4">
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="section-title text-secondary" style={{ fontSize: '1rem' }}>Title</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter news/event title" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    required 
                    className="p-3 bg-light border-0"
                    style={{ borderRadius: '10px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="section-title text-secondary" style={{ fontSize: '1rem' }}>Date</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="e.g. July 20, 2026" 
                    value={eventDate} 
                    onChange={e => setEventDate(e.target.value)} 
                    className="p-3 bg-light border-0"
                    style={{ borderRadius: '10px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="section-title text-secondary" style={{ fontSize: '1rem' }}>Description</Form.Label>
                  <div style={{ background: '#f8f9fa', borderRadius: '10px',  }}>
                    <ReactQuill 
                      theme="snow"
                      value={description} 
                      onChange={setDescription}
                      placeholder="Enter description..."
                      modules={{
                        toolbar: [
                          ['bold', 'italic', 'underline'],
                          [{ 'color': [] }],
                          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                          ['link'],
                          ['clean']
                        ]
                      }}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check 
                    type="switch"
                    id="active-switch"
                    label={isActive ? "Active (Will be shown to users)" : "Inactive (Hidden)"}
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="fw-bold text-secondary"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <div className="d-flex flex-column mb-2">
                    <Form.Label className="section-title text-secondary mb-1" style={{ fontSize: '1rem' }}>
                      Image <span className="text-danger">*</span>
                    </Form.Label>
                    <small className="text-muted">Allowed: .jpg, .jpeg, .png, .webp | Max: 200KB</small>
                  </div>
                  <div 
                    className="border-dashed p-4 text-center mt-2 bg-light" 
                    style={{ borderRadius: '10px', border: '2px dashed #ccc', position: 'relative' }}
                  >
                    <input 
                      type="file" 
                      id="newsImageInput"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={e => {
                        const selected = e.target.files[0];
                        if (!selected) return;

                        const MAX_SIZE = 200 * 1024 ; // 2MB

                        if (selected.size > MAX_SIZE) {
                          setError('Image size should not exceed 200KB.');
                          e.target.value = '';
                          setFile(null);
                          return;
                        }

                        setError('');
                        setFile(selected);
                      }} 
                      required={!editingId}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                    <FaCloudUploadAlt size={40} className="text-primary mb-2" />
                    <h5 className="section-title m-0 text-primary" style={{ fontSize: '1.1rem' }}>Select Image</h5>
                    {file && <p className="mt-2 text-success fw-bold mb-0">{file.name}</p>}
                    {!file && editingId && <p className="mt-2 text-warning fw-bold mb-0">Leave blank to keep current image</p>}
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
                    {uploading ? 'Processing...' : (editingId ? 'Update Item' : 'Add Item')}
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

        {/* Current Items Preview Section */}
        <div className="col-md-7">
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px', maxHeight: '600px', overflowY: 'auto' }}>
            <Card.Body className="p-4">
              <h3 className="section-title mb-4">All News & Events</h3>
              {items.length > 0 ? (
                <Row className="g-3">
                  {items.map(item => (
                    <Col sm={6} key={item.id}>
                      <Card className="border-0 shadow-sm overflow-hidden h-100 position-relative group">
                        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
                           <Badge bg={item.is_active ? 'success' : 'secondary'}>
                             {item.is_active ? 'Active' : 'Inactive'}
                           </Badge>
                        </div>
                        <div style={{ height: '140px', backgroundColor: '#f8f9fa' }}>
                          {item.image ? (
                            <img 
                              src={`${import.meta.env.VITE_FILE_BASE_URL}/${item.image}`} 
                              alt={item.title} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                          ) : (
                            <div className="d-flex h-100 align-items-center justify-content-center">
                              <FaNewspaper size={30} className="text-muted opacity-50" />
                            </div>
                          )}
                        </div>
                        <div className="p-3 bg-white d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="fw-bold text-truncate" style={{ fontSize: '1rem', maxWidth: '75%' }}>{item.title}</span>
                            <div className="d-flex">
                              <Button 
                                variant="light" 
                                className="text-primary p-1 border-0 me-1" 
                                onClick={() => handleEdit(item)}
                                title="Edit"
                              >
                                <FaEdit size={14} />
                              </Button>
                              <Button 
                                variant="light" 
                                className="text-danger p-1 border-0" 
                                onClick={() => handleDelete(item.id)}
                                title="Delete"
                              >
                                <FaTrash size={14} />
                              </Button>
                            </div>
                          </div>
                          {item.event_date && <small className="text-muted">{item.event_date}</small>}
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center text-muted bg-light rounded h-100" style={{ minHeight: '300px' }}>
                  <FaNewspaper size={50} className="mb-3 opacity-50" />
                  <p className="m-0">No news/events added yet</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewsEventManager;