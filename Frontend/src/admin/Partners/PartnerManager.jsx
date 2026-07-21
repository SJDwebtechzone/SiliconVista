import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Spinner, Card, Badge, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaCloudUploadAlt, FaCheckCircle, FaImage, FaTrash, FaEdit, FaBuilding } from 'react-icons/fa';
import '../admin.css';

const PartnerManager = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchPartners = async () => {
    try {
      const { data } = await axios.get('/api/partners');
      setPartners(data);
    } catch (err) {
      setError('Error fetching career partners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('name', name);
    data.append('is_active', isActive);
    if (file) data.append('partnerLogo', file);

    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingId) {
        await axios.put(`/api/partners/${editingId}`, data, config);
        setSuccess('Partner updated successfully!');
      } else {
        await axios.post('/api/partners', data, config);
        setSuccess('Partner created successfully!');
      }
      
      setName('');
      setIsActive(true);
      setFile(null);
      setEditingId(null);
      
      const fileInput = document.getElementById('partnerLogoInput');
      if (fileInput) fileInput.value = '';

      fetchPartners();
    } catch (err) {
      setError('Error saving partner');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/partners/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        fetchPartners();
      } catch (err) {
        alert('Error deleting partner');
      }
    }
  };

  const handleEdit = (partner) => {
    setEditingId(partner.id);
    setName(partner.name || '');
    setIsActive(partner.is_active);
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setIsActive(true);
    setFile(null);
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="py-4 px-2" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="section-title fs-3 mb-0">Career Partner Management</h2>
          <Badge bg="success" className="mt-2 px-3 py-2 rounded-pill" style={{fontSize: '0.9rem'}}>
            <FaCheckCircle className="me-2"/> {partners.length} Total Partners
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
                  <Form.Label className="section-title text-secondary" style={{ fontSize: '1rem' }}>Company Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter company name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
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
                    <Form.Label className="section-title text-secondary mb-1" style={{ fontSize: '1rem' }}>Company Logo</Form.Label>
                    <small className="text-muted">Allowed: .jpg, .png, .webp (Transparent BG recommended)</small>
                  </div>
                  <div 
                    className="border-dashed p-4 text-center mt-2 bg-light" 
                    style={{ borderRadius: '10px', border: '2px dashed #ccc', position: 'relative' }}
                  >
                    <input 
                      type="file" 
                      id="partnerLogoInput"
                      accept=".jpg,.jpeg,.png,.gif,.webp"
                      onChange={e => setFile(e.target.files[0])} 
                      required={!editingId}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                    <FaCloudUploadAlt size={40} className="text-primary mb-2" />
                    <h5 className="section-title m-0 text-primary" style={{ fontSize: '1.1rem' }}>Select Logo</h5>
                    {file && <p className="mt-2 text-success fw-bold mb-0">{file.name}</p>}
                    {!file && editingId && <p className="mt-2 text-warning fw-bold mb-0">Leave blank to keep current logo</p>}
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
                    {uploading ? 'Processing...' : (editingId ? 'Update Partner' : 'Add Partner')}
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

        {/* Current Partners Preview Section */}
        <div className="col-md-7">
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px', maxHeight: '600px', overflowY: 'auto' }}>
            <Card.Body className="p-4">
              <h3 className="section-title mb-4">All Career Partners</h3>
              {partners.length > 0 ? (
                <Row className="g-3">
                  {partners.map(partner => (
                    <Col sm={6} key={partner.id}>
                      <Card className="border-0 shadow-sm overflow-hidden h-100 position-relative group">
                        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
                           <Badge bg={partner.is_active ? 'success' : 'secondary'}>
                             {partner.is_active ? 'Active' : 'Inactive'}
                           </Badge>
                        </div>
                        <div style={{ height: '120px', background: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                          {partner.logo_url ? (
                            <img 
                              src={`${import.meta.env.VITE_FILE_BASE_URL}/${partner.logo_url}`} 
                              alt={partner.name} 
                              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                            />
                          ) : (
                            <FaBuilding size={40} className="text-muted opacity-50" />
                          )}
                        </div>
                        <div className="p-3 bg-white d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="fw-bold text-truncate" style={{ fontSize: '1rem', maxWidth: '75%' }}>{partner.name}</span>
                            <div className="d-flex">
                              <Button 
                                variant="light" 
                                className="text-primary p-1 border-0 me-1" 
                                onClick={() => handleEdit(partner)}
                                title="Edit Partner"
                              >
                                <FaEdit size={14} />
                              </Button>
                              <Button 
                                variant="light" 
                                className="text-danger p-1 border-0" 
                                onClick={() => handleDelete(partner.id)}
                                title="Delete Partner"
                              >
                                <FaTrash size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center text-muted bg-light rounded h-100" style={{ minHeight: '300px' }}>
                  <FaBuilding size={50} className="mb-3 opacity-50" />
                  <p className="m-0">No career partners added yet</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerManager;
