import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Spinner, Badge, Alert, Row, Col } from 'react-bootstrap';
import { FaSync, FaStar, FaEye, FaEyeSlash, FaInfoCircle, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import '../admin.css';

const GoogleReviewsManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null); // { type: 'success' | 'error', message: '', details: {} }
  const [lastSyncTime, setLastSyncTime] = useState(null);

  const fetchStatusAndReviews = async () => {
    try {
      setLoading(true);
      // Fetch Status
      const statusRes = await axios.get('/api/google-reviews/status');
      if (statusRes.data.success && statusRes.data.data.lastSyncTime) {
        setLastSyncTime(new Date(statusRes.data.data.lastSyncTime));
      }

      // Fetch Reviews
      const res = await axios.get('/api/google-reviews/all');
      if (res.data.success) {
        setReviews(res.data.data);
      } else {
        setSyncStatus({ type: 'error', message: 'Failed to fetch Google Reviews' });
      }
    } catch (error) {
      console.error('Error fetching Google Reviews:', error);
      setSyncStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'An error occurred while fetching reviews. Please ensure your backend server is running and updated.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusAndReviews();
  }, []);

  const handleSync = async () => {
    try {
      setSyncing(true);
      setSyncStatus(null);
      const res = await axios.get('/api/google-reviews/sync');
      if (res.data.success) {
        setSyncStatus({
          type: 'success',
          message: 'Successfully synced with Google!',
          details: {
            new: res.data.newReviewsCount,
            total: res.data.totalReviewsFetched
          }
        });
        fetchStatusAndReviews(); // Refresh the list
      }
    } catch (error) {
      console.error('Error syncing Google Reviews:', error);
      setSyncStatus({
        type: 'error',
        message: error.response?.data?.message || 'An unexpected error occurred during sync.'
      });
    } finally {
      setSyncing(false);
    }
  };

  const toggleFeature = async (id) => {
    try {
      const res = await axios.patch(`/api/google-reviews/${id}/feature`);
      if (res.data.success) {
        setReviews(reviews.map(r => r.id === id ? { ...r, featured: res.data.data.featured } : r));
      } else {
        alert(`Failed to toggle feature status: ${res.data.message}`);
      }
    } catch (error) {
      console.error('Error toggling feature:', error);
      alert('An error occurred while updating the review.');
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar key={i} color={i < rating ? '#ffc107' : '#e4e5e9'} />
    ));
  };

  return (
    <div className="admin-content-inner">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title m-0">Google Reviews Management</h2>
        <Button 
          variant="primary" 
          className="d-flex align-items-center gap-2 custom-btn px-4"
          onClick={handleSync}
          disabled={syncing}
        >
          {syncing ? <Spinner animation="border" size="sm" /> : <FaSync />}
          {syncing ? 'Syncing with Google...' : 'Sync Now'}
        </Button>
      </div>

      {syncStatus && (
        <Alert variant={syncStatus.type === 'success' ? 'success' : 'danger'} className="mb-4 d-flex align-items-center shadow-sm" onClose={() => setSyncStatus(null)} dismissible>
          {syncStatus.type === 'success' ? <FaCheckCircle className="me-2 fs-5" /> : <FaExclamationTriangle className="me-2 fs-5" />}
          <div>
            <strong>{syncStatus.type === 'success' ? 'Sync Successful:' : 'Sync Error:'}</strong> {syncStatus.message}
            {syncStatus.details && (
              <div className="mt-1 small">
                Total Reviews Fetched from Google API: <strong>{syncStatus.details.total}</strong> | New Reviews Added: <strong>{syncStatus.details.new}</strong>
              </div>
            )}
          </div>
        </Alert>
      )}

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 bg-light h-100">
            <Card.Body className="d-flex align-items-center">
              <FaClock className="text-primary fs-3 me-3" />
              <div>
                <h6 className="mb-1 text-muted">Last Sync Time</h6>
                <p className="mb-0 fw-bold">
                  {lastSyncTime ? lastSyncTime.toLocaleString() : 'Never synced'}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 bg-light h-100">
            <Card.Body className="d-flex align-items-center">
              <FaStar className="text-warning fs-3 me-3" />
              <div>
                <h6 className="mb-1 text-muted">Total Saved Reviews</h6>
                <p className="mb-0 fw-bold">
                  {reviews.length}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 bg-light h-100">
            <Card.Body className="d-flex align-items-center">
              <FaEye className="text-success fs-3 me-3" />
              <div>
                <h6 className="mb-1 text-muted">Featured Reviews</h6>
                <p className="mb-0 fw-bold">
                  {reviews.filter(r => r.featured).length}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="custom-card shadow-sm border-0">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-5">
              <FaInfoCircle className="text-muted fs-1 mb-3" />
              <p className="text-muted mb-3 fs-5">No Google Reviews found in the database.</p>
              <Button variant="outline-primary" onClick={handleSync} disabled={syncing}>
                Sync Now to Fetch Reviews from Google
              </Button>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="admin-table align-middle">
                <thead>
                  <tr>
                    <th>Reviewer</th>
                    <th>Rating</th>
                    <th style={{ width: '40%' }}>Review</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {review.profile_photo ? (
                            <img 
                              src={review.profile_photo} 
                              alt="" 
                              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.onerror = null; 
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            style={{ 
                              width: '40px', 
                              height: '40px', 
                              borderRadius: '50%', 
                              backgroundColor: '#e2e8f0', 
                              display: review.profile_photo ? 'none' : 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              fontWeight: 'bold' 
                            }}
                          >
                            {review.author_name.charAt(0)}
                          </div>
                          <span className="fw-semibold">{review.author_name}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex text-warning">
                          {renderStars(review.rating)}
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 text-truncate" style={{ maxWidth: '300px' }} title={review.review}>
                          {review.review || <span className="text-muted fst-italic">No text</span>}
                        </p>
                      </td>
                      <td>
                        {new Date(review.review_time).toLocaleDateString()}
                      </td>
                      <td>
                        {review.featured ? (
                          <Badge bg="success">Featured</Badge>
                        ) : (
                          <Badge bg="secondary">Hidden</Badge>
                        )}
                      </td>
                      <td className="text-nowrap">
                        <Button 
                          variant={review.featured ? "outline-secondary" : "outline-success"}
                          size="sm"
                          className="d-flex align-items-center gap-1"
                          onClick={() => toggleFeature(review.id)}
                        >
                          {review.featured ? (
                            <><FaEyeSlash /> Hide</>
                          ) : (
                            <><FaEye /> Feature</>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default GoogleReviewsManager;
