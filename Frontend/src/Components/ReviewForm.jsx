import React, { useState } from 'react';
import { Button, Modal, Form, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaCloudUploadAlt, FaStar } from 'react-icons/fa';

const ReviewForm = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    designation: '',
    rating: 5,
    review: ''
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    setStatus({ type: '', message: '' });
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('rating', formData.rating);
    submitData.append('review', formData.review);
    
    if (photoFile) {
      submitData.append('photo', photoFile);
    }

    try {
      await axios.post('/api/reviews', submitData);
      setStatus({ type: 'success', message: 'Thank you! Your review has been submitted and is pending approval.' });
      setFormData({ name: '', company: '', designation: '', rating: 5, review: '' });
      setPhotoFile(null);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      setStatus({ type: 'danger', message: err.response?.data?.message || 'Failed to submit review. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '20vh', padding: '2rem 0' }}>
        <Button 
          size="lg" 
          onClick={handleShow}
          className="rounded-pill px-5 py-3 fw-bold shadow-sm text-white"
          style={{ background: 'linear-gradient(90deg, #00C6A0, #2196F3)', border: 'none' }}
        >
          Write Your Review
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <div style={{ background: 'linear-gradient(90deg, #00C6A0, #2196F3)', height: '10px' }}></div>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold ps-2" style={{ color: '#073738', fontSize: '1.8rem' }}>
            Write Your Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4 pt-3">
          {status.message && <Alert variant={status.type} className="rounded-3">{status.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <Form.Label className="fw-bold text-secondary mb-0">Your Photo (Optional)</Form.Label>
                <small className="text-muted">Allowed: JPG, PNG | Max: 200KB</small>
              </div>
              <div 
                className="border-dashed p-4 text-center bg-light rounded-3" 
                style={{ border: '2px dashed #00C6A0', position: 'relative' }}
              >
                <input 
                  type="file" 
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleFileChange} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                />
                <FaCloudUploadAlt size={40} style={{ color: '#2196F3' }} className="mb-2" />
                <h6 className="m-0 fw-bold" style={{ color: '#073738' }}>Click or Drag to upload Photo</h6>
                {photoFile && <p className="mt-2 mb-0 text-success fw-bold">{photoFile.name}</p>}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-secondary">Full Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="p-3 bg-light border-0 rounded-3"
                placeholder="e.g. Ragul Sankar"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-secondary">Rating</Form.Label>
              <Form.Select 
                name="rating" 
                value={formData.rating} 
                onChange={handleChange} 
                required 
                className="p-3 bg-light border-0 rounded-3"
              >
                <option value="5">⭐⭐⭐⭐⭐ - 5/5 Excellent</option>
                <option value="4">⭐⭐⭐⭐ - 4/5 Very Good</option>
                <option value="3">⭐⭐⭐ - 3/5 Good</option>
                <option value="2">⭐⭐ - 2/5 Fair</option>
                <option value="1">⭐ - 1/5 Poor</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold text-secondary">Review</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                name="review" 
                value={formData.review} 
                onChange={handleChange} 
                required 
                className="p-3 bg-light border-0 rounded-3"
                placeholder="Share your experience with Silicon Vista..."
              />
            </Form.Group>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-100 py-3 fw-bold rounded-pill shadow-sm"
              style={{ background: 'linear-gradient(90deg, #00C6A0, #2196F3)', border: 'none', fontSize: '1.1rem' }}
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReviewForm;
