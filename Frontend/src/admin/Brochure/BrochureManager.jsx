import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Spinner, Card, Badge, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaCloudUploadAlt, FaCheckCircle, FaFileAlt, FaTrash, FaEdit } from 'react-icons/fa';
import '../admin.css';

const BrochureManager = () => {
  const [brochures, setBrochures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [title, setTitle] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchBrochures = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/brochure`);
      setBrochures(data);
    } catch (err) {
      setError('Error fetching brochures');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrochures();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('title', title);
    data.append('is_active', isActive);
    if (file) data.append('brochureFile', file);

    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/brochure/${editingId}`, data, config);
        setSuccess('Brochure updated successfully!');
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/brochure`, data, config);
        setSuccess('Brochure created successfully!');
      }
      
      setTitle('');
      setIsActive(true);
      setFile(null);
      setEditingId(null);
      
      const fileInput = document.getElementById('brochureFileInput');
      if (fileInput) fileInput.value = '';

      fetchBrochures();
    } catch (err) {
      setError('Error saving brochure');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this brochure?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/brochure/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        fetchBrochures();
      } catch (err) {
        alert('Error deleting brochure');
      }
    }
  };

  const handleEdit = (brochure) => {
    setEditingId(brochure.id);
    setTitle(brochure.title || '');
    setIsActive(brochure.is_active);
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setIsActive(true);
    setFile(null);
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="py-4 px-2" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="section-title fs-3 mb-0">Brochure Management</h2>
          <Badge bg="success" className="mt-2 px-3 py-2 rounded-pill" style={{fontSize: '0.9rem'}}>
            <FaCheckCircle className="me-2"/> {brochures.length} Total Brochures
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
                  <Form.Label className="section-title text-secondary" style={{ fontSize: '1rem' }}>Brochure Title</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter brochure title" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    required 
                    className="p-3 bg-light border-0"
                    style={{ borderRadius: '10px' }}
                  />
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
                    <Form.Label className="section-title text-secondary mb-1" style={{ fontSize: '1rem' }}>Brochure File</Form.Label>
                    <small className="text-muted">Allowed: .pdf, .doc, .docx, images</small>
                  </div>
                  <div 
                    className="border-dashed p-4 text-center mt-2 bg-light" 
                    style={{ borderRadius: '10px', border: '2px dashed #ccc', position: 'relative' }}
                  >
                    <input 
                      type="file" 
                      id="brochureFileInput"
                      accept=".pdf,.doc,.docx,image/*"
                      onChange={e => setFile(e.target.files[0])} 
                      required={!editingId}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                    <FaCloudUploadAlt size={40} className="text-primary mb-2" />
                    <h5 className="section-title m-0 text-primary" style={{ fontSize: '1.1rem' }}>Select Document</h5>
                    {file && <p className="mt-2 text-success fw-bold mb-0">{file.name}</p>}
                    {!file && editingId && <p className="mt-2 text-warning fw-bold mb-0">Leave blank to keep current file</p>}
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
                    {uploading ? 'Processing...' : (editingId ? 'Update Brochure' : 'Upload Brochure')}
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

        {/* Current Brochures Preview Section */}
        <div className="col-md-7">
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px', maxHeight: '600px', overflowY: 'auto' }}>
            <Card.Body className="p-4">
              <h3 className="section-title mb-4">All Brochures</h3>
              {brochures.length > 0 ? (
                <Row className="g-3">
                  {brochures.map(brochure => (
                    <Col sm={6} key={brochure.id}>
                      <Card className="border-0 shadow-sm overflow-hidden h-100 position-relative group">
                        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
                           <Badge bg={brochure.is_active ? 'success' : 'secondary'}>
                             {brochure.is_active ? 'Active' : 'Inactive'}
                           </Badge>
                        </div>
                        <div style={{ height: '140px', background: 'linear-gradient(135deg, #f8f9fa, #e2e8f0)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <FaFileAlt size={40} className="text-primary opacity-75 mb-2" />
                          <Badge bg="info" className="text-white">{brochure.file_size || 'PDF/Doc'}</Badge>
                        </div>
                        <div className="p-3 bg-white d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="fw-bold text-truncate" style={{ fontSize: '1rem', maxWidth: '75%' }}>{brochure.title}</span>
                            <div className="d-flex">
                              <Button 
                                variant="light" 
                                className="text-primary p-1 border-0 me-1" 
                                onClick={() => handleEdit(brochure)}
                                title="Edit Brochure"
                              >
                                <FaEdit size={14} />
                              </Button>
                              <Button 
                                variant="light" 
                                className="text-danger p-1 border-0" 
                                onClick={() => handleDelete(brochure.id)}
                                title="Delete Brochure"
                              >
                                <FaTrash size={14} />
                              </Button>
                            </div>
                          </div>
                          <a 
                            href={`${import.meta.env.VITE_FILE_BASE_URL}/${brochure.file_url}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-sm text-white rounded-pill mt-1"
                            style={{ background: 'linear-gradient(90deg, #00C6A0, #2196F3)', border: 'none', width: '100%' }}
                          >
                            View Document
                          </a>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center text-muted bg-light rounded h-100" style={{ minHeight: '300px' }}>
                  <FaFileAlt size={50} className="mb-3 opacity-50" />
                  <p className="m-0">No brochures available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrochureManager;
