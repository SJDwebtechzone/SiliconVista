import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import './globalBrochureButton.css'; 

const GlobalBrochureButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1); 
  const [brochures, setBrochures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBrochure, setSelectedBrochure] = useState(null);

  const [brochureFormData, setBrochureFormData] = useState({
    name: '', email: '', phone: '', qualification: '', profile: '', graduationYear: ''
  });
  const [submittingBrochure, setSubmittingBrochure] = useState(false);
  const [brochureError, setBrochureError] = useState('');

  useEffect(() => {
    if (showModal && brochures.length === 0) {
      fetchBrochures();
    }
  }, [showModal]);

  const fetchBrochures = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/brochure`);
      setBrochures(Array.isArray(data) ? data : (data?.data || []));
    } catch (err) {
      console.error("Error fetching brochures:", err);
      setError('Failed to load brochures. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBrochure = (brochure) => {
    setSelectedBrochure(brochure);
    setStep(2);
    setBrochureError('');
  };

  const handleBrochureSubmit = async (e) => {
    e.preventDefault();
    setSubmittingBrochure(true);
    setBrochureError('');
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/brochure/download`, {
        ...brochureFormData,
        brochureTitle: selectedBrochure.title
      });
      
      const link = document.createElement('a');
      link.href = `${import.meta.env.VITE_FILE_BASE_URL}/${selectedBrochure.file_url}`;
      link.setAttribute('download', selectedBrochure.title || 'brochure');
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      handleClose();
    } catch (err) {
      setBrochureError(err.response?.data?.message || 'Error processing request. Please try again.');
    } finally {
      setSubmittingBrochure(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      setStep(1);
      setSelectedBrochure(null);
      setBrochureError('');
      setBrochureFormData({
        name: '', email: '', phone: '', qualification: '', profile: '', graduationYear: ''
      });
    }, 300); 
  };

  return (
    <>
      {!showModal && (
        <div className="global-brochure-button" title="Download Brochure" onClick={() => setShowModal(true)}>
          <FaDownload className="btn-icon" />
          <span className="btn-text">Download Brochure</span>
        </div>
      )}

      <Modal show={showModal} onHide={handleClose} centered scrollable size="md">
        <Modal.Header closeButton style={{ background: '#f8f9fa', borderBottom: '2px solid #00C6A0' }}>
          <Modal.Title style={{ color: '#073738', fontWeight: 'bold' }}>
            {step === 1 ? 'Download Brochure' : `Download ${selectedBrochure?.title}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '24px' }}>
          
          {step === 1 && (
            <div>
              <p className="text-muted mb-4 text-center">
                Please select a brochure or course details document to download.
              </p>
              
              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" style={{ color: '#00C6A0' }} />
                  <p className="mt-2 text-muted">Loading brochures...</p>
                </div>
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : brochures.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No brochures available right now.</p>
                </div>
              ) : (
                <div className="brochure-list">
                  {brochures.map(bro => (
                    <div 
                      key={bro.id || bro._id} 
                      className="brochure-list-item"
                      onClick={() => handleSelectBrochure(bro)}
                    >
                      <div className="icon-wrapper">
                        <FaFilePdf size={24} color="#e53935" />
                      </div>
                      <div className="brochure-title">{bro.title}</div>
                      <FaDownload color="#00C6A0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', cursor: 'pointer', color: '#2196F3', fontWeight: '500' }} onClick={() => setStep(1)}>
                <span>&larr; Back to list</span>
              </div>
              <p className="text-muted mb-4">Please fill out this quick form to receive your brochure.</p>
              
              {brochureError && <Alert variant="danger">{brochureError}</Alert>}

              <Form onSubmit={handleBrochureSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" required value={brochureFormData.name} onChange={(e) => setBrochureFormData({...brochureFormData, name: e.target.value})} placeholder="Enter your full name" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email (Gmail) <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="email" required value={brochureFormData.email} onChange={(e) => setBrochureFormData({...brochureFormData, email: e.target.value})} placeholder="Enter your email address" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="tel" required value={brochureFormData.phone} onChange={(e) => setBrochureFormData({...brochureFormData, phone: e.target.value})} placeholder="Enter your phone number" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Educational Qualification <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" required value={brochureFormData.qualification} onChange={(e) => setBrochureFormData({...brochureFormData, qualification: e.target.value})} placeholder="e.g., B.E ECE, M.Tech VLSI" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Current Profile <span className="text-danger">*</span></Form.Label>
                  <Form.Select required value={brochureFormData.profile} onChange={(e) => setBrochureFormData({...brochureFormData, profile: e.target.value})}>
                    <option value="">Select your profile...</option>
                    <option value="Student">Student</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Experienced in IT Industry">Experienced in IT Industry</option>
                    <option value="Experienced in Non-IT Industry">Experienced in Non-IT Industry</option>
                    <option value="Experienced in Core Electronic">Experienced in Core Electronic</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Graduation Year <span className="text-danger">*</span></Form.Label>
                  <Form.Select required value={brochureFormData.graduationYear} onChange={(e) => setBrochureFormData({...brochureFormData, graduationYear: e.target.value})}>
                    <option value="">Select graduation year...</option>
                    {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + 2 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button 
                  type="submit" 
                  className="w-100 fw-bold border-0" 
                  style={{ background: 'linear-gradient(90deg, #00C6A0, #2196F3)', padding: '12px' }}
                  disabled={submittingBrochure}
                >
                  {submittingBrochure ? (
                    <><Spinner animation="border" size="sm" className="me-2" /> Processing...</>
                  ) : (
                    <>Submit & Download</>
                  )}
                </Button>
              </Form>
            </div>
          )}

        </Modal.Body>
      </Modal>
    </>
  );
};

export default GlobalBrochureButton;
