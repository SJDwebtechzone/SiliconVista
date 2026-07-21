import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Spinner, Alert, Modal, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaTrash, FaCheck, FaTimes, FaStar, FaEye, FaUserCircle } from 'react-icons/fa';
import '../admin.css';

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Global settings state
  const [isSectionEnabled, setIsSectionEnabled] = useState(true);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.get('/api/reviews/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    
    // Fetch global setting for review section visibility
    const fetchSetting = async () => {
      try {
        const { data } = await axios.get('/api/settings/show_review_section');
        setIsSectionEnabled(data.value === 'true');
      } catch (err) {
        console.error('Error fetching review section setting:', err);
      }
    };
    fetchSetting();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (action === 'delete') {
        if (window.confirm('Are you sure you want to delete this review?')) {
          await axios.delete(`/api/reviews/admin/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } else {
          return;
        }
      } else {
        await axios.put(`/api/reviews/admin/${id}/${action}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchReviews(); 
      if (showModal) setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action} review`);
    }
  };

  const handleView = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleToggleSection = async (e) => {
    const newValue = e.target.checked;
    setIsSectionEnabled(newValue); // Optimistic UI update
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put('/api/settings/show_review_section', { value: newValue ? 'true' : 'false' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      alert('Failed to update global setting');
      setIsSectionEnabled(!newValue); // Revert on failure
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} size={14} className={i < rating ? "text-warning" : "text-muted opacity-25"} />
    ));
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved': return <Badge bg="success" className="px-2 py-1 rounded-pill">Approved</Badge>;
      case 'Rejected': return <Badge bg="danger" className="px-2 py-1 rounded-pill">Rejected</Badge>;
      default: return <Badge bg="warning" text="dark" className="px-2 py-1 rounded-pill">Pending</Badge>;
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'All') return true;
    return review.status === filter;
  });

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="py-4 px-2" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="section-title fs-3 mb-0">
          Admin Review Table
        </h2>
        
        {/* Clickable Filter Tabs */}
        <div className="d-flex gap-2">
          <Button 
            variant={filter === 'All' ? 'primary' : 'outline-primary'} 
            className="rounded-pill px-4 fw-bold shadow-sm"
            onClick={() => setFilter('All')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'Pending' ? 'warning' : 'outline-warning'} 
            className="rounded-pill px-4 fw-bold shadow-sm text-dark"
            onClick={() => setFilter('Pending')}
          >
            Pending
          </Button>
          <Button 
            variant={filter === 'Approved' ? 'success' : 'outline-success'} 
            className="rounded-pill px-4 fw-bold shadow-sm"
            onClick={() => setFilter('Approved')}
          >
            Approved
          </Button>
          <Button 
            variant={filter === 'Rejected' ? 'danger' : 'outline-danger'} 
            className="rounded-pill px-4 fw-bold shadow-sm"
            onClick={() => setFilter('Rejected')}
          >
            Rejected
          </Button>
        </div>
      </div>
      
      {/* Master Toggle */}
      <div className="d-flex justify-content-end mb-4">
        <div className="bg-white p-3 rounded shadow-sm border d-flex align-items-center gap-3">
          <div>
            <h6 className="mb-0 fw-bold">Homepage Review Section</h6>
            <small className="text-muted">Turn off to hide the entire section from the live website.</small>
          </div>
          <Form.Check 
            type="switch"
            id="global-review-toggle"
            className="ms-3 custom-switch"
            checked={isSectionEnabled}
            onChange={handleToggleSection}
            style={{ transform: 'scale(1.5)', margin: '0 10px' }}
          />
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="bg-white rounded shadow-sm overflow-hidden border">
        <div style={{overflowX: 'auto'}}>
          <table className="custom-table align-middle text-center" style={{ minWidth: '900px' }}>
            <thead>
              <tr>
                <th className="section-title" style={{ fontSize: '1rem', paddingBottom: '1rem' }}>Photo</th>
                <th className="section-title text-start" style={{ fontSize: '1rem', paddingBottom: '1rem' }}>Name</th>
                <th className="section-title text-start" style={{ fontSize: '1rem', paddingBottom: '1rem' }}>Rating</th>
                <th className="section-title text-start" style={{ fontSize: '1rem', paddingBottom: '1rem' }}>Review</th>
                <th className="section-title" style={{ fontSize: '1rem', paddingBottom: '1rem' }}>Status</th>
                <th className="section-title" style={{ fontSize: '1rem', paddingBottom: '1rem' }}>Date</th>
                <th className="section-title" style={{ fontSize: '1rem', paddingBottom: '1rem' }}>Action</th>
              </tr>
            </thead>
          <tbody>
            {filteredReviews.map(review => (
              <tr key={review.id} className="border-bottom">
                <td className="px-3">
                  {review.photo ? (
                    <img 
                      src={`${import.meta.env.VITE_FILE_BASE_URL}/${review.photo}`} 
                      alt="Customer" 
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <FaUserCircle size={35} className="text-secondary opacity-50" />
                  )}
                </td>
                <td className="px-3 text-start">
                  <div className="fw-bold text-dark" style={{ fontSize: '1.05rem' }}>{review.name}</div>
                  <div className="small text-muted">
                    {review.designation}{review.designation && review.company ? ' @ ' : ''}{review.company}
                  </div>
                </td>
                <td className="px-3 text-start">
                  <div className="d-flex gap-1">
                    {renderStars(review.rating)}
                  </div>
                </td>
                <td className="px-3 text-start" style={{ maxWidth: '250px' }}>
                  <div className="text-truncate text-muted font-italic">
                    "{review.review}"
                  </div>
                </td>
                <td className="px-3">
                  {getStatusBadge(review.status)}
                </td>
                <td className="px-3 text-muted small">
                  {new Date(review.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-3">
                  <div className="d-flex justify-content-center gap-2">
                    <OverlayTrigger placement="top" overlay={<Tooltip>View Details</Tooltip>}>
                      <Button variant="outline-primary" size="sm" className="rounded-circle p-2 d-flex" onClick={() => handleView(review)}>
                        <FaEye />
                      </Button>
                    </OverlayTrigger>

                    {review.status === 'Pending' && (
                      <>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Approve</Tooltip>}>
                          <Button variant="outline-success" size="sm" className="rounded-circle p-2 d-flex" onClick={() => handleAction(review.id, 'approve')}>
                            <FaCheck />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Reject</Tooltip>}>
                          <Button variant="outline-danger" size="sm" className="rounded-circle p-2 d-flex" onClick={() => handleAction(review.id, 'reject')}>
                            <FaTimes />
                          </Button>
                        </OverlayTrigger>
                      </>
                    )}
                    
                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                      <Button variant="outline-secondary" size="sm" className="rounded-circle p-2 d-flex" onClick={() => handleAction(review.id, 'delete')}>
                        <FaTrash />
                      </Button>
                    </OverlayTrigger>
                  </div>
                </td>
              </tr>
            ))}
            {filteredReviews.length === 0 && (
              <tr>
                <td colSpan="7" className="py-5 text-center text-muted">
                  <FaStar size={40} className="mb-3 opacity-25" />
                  <h5>No {filter !== 'All' ? filter : ''} reviews found</h5>
                </td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>

      {/* Review Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Review Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-3">
          {selectedReview && (
            <>
              <div className="d-flex align-items-center mb-4">
                {selectedReview.photo ? (
                  <img 
                    src={`${import.meta.env.VITE_FILE_BASE_URL}/${selectedReview.photo}`} 
                    alt="Customer" 
                    className="me-3"
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                ) : (
                  <FaUserCircle size={50} className="text-secondary opacity-50 me-3" />
                )}
                <div>
                  <h5 className="fw-bold mb-0">{selectedReview.name}</h5>
                  <p className="text-muted mb-1 small">
                    {selectedReview.designation}{selectedReview.designation && selectedReview.company ? ' at ' : ''}{selectedReview.company}
                  </p>
                  <div className="d-flex gap-1">{renderStars(selectedReview.rating)}</div>
                </div>
              </div>
              
              <div className="bg-light p-3 rounded mb-4" style={{ fontStyle: 'italic', borderLeft: '4px solid var(--admin-primary)' }}>
                "{selectedReview.review}"
              </div>

              <div className="d-flex justify-content-between align-items-center text-muted small border-top pt-3">
                <span>Submitted: {new Date(selectedReview.created_at).toLocaleDateString()}</span>
                {getStatusBadge(selectedReview.status)}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 bg-light">
          {selectedReview?.status === 'Pending' && (
            <>
              <Button variant="success" onClick={() => handleAction(selectedReview.id, 'approve')} className="rounded-pill px-4">
                <FaCheck className="me-2"/> Approve
              </Button>
              <Button variant="danger" onClick={() => handleAction(selectedReview.id, 'reject')} className="rounded-pill px-4">
                <FaTimes className="me-2"/> Reject
              </Button>
            </>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)} className="rounded-pill px-4">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewManager;
