import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaStar, FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './admin.css';

// Chart data is now fetched from the backend

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        
        // Fetch stats
        const statsRes = await axios.get('/api/admin/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(statsRes.data);

        // Fetch recent reviews for the table
        const reviewsRes = await axios.get('/api/reviews/admin', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Just take the first 4 for the recent preview
        setRecentReviews(reviewsRes.data.slice(0, 4));

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      {/* Header Section */}
      <div className="page-header">
        <div>
          <h2 className="section-title fs-3">Dashboard</h2>
          <p className="page-subtitle">Welcome back! Here's what's happening with your website.</p>
        </div>
        <button className="date-picker-btn">
          <FaCalendarAlt color="var(--admin-text-muted)" /> May 12, 2024 - May 18, 2024
        </button>
      </div>

      {/* Metric Cards Row */}
      <Row className="mb-4">
        <Col md={3}>
          <div className="metric-card">
            <div className="metric-icon-box" style={{backgroundColor: 'var(--admin-primary)'}}>
              <FaStar />
            </div>
            <div className="metric-info">
              <span className="metric-title">Total Reviews</span>
              <span className="metric-value">{stats?.totalReviews || 0}</span>
              <div className="metric-trend">
                <span className="trend-up">↑ 12.5%</span> <span className="trend-text">from last week</span>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="metric-card">
            <div className="metric-icon-box" style={{backgroundColor: 'var(--color-warning)'}}>
              <FaStar />
            </div>
            <div className="metric-info">
              <span className="metric-title">Pending Reviews</span>
              <span className="metric-value">{stats?.pendingReviews || 0}</span>
              <div className="metric-trend">
                <span className="trend-up">↑ 5.3%</span> <span className="trend-text">from last week</span>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="metric-card">
            <div className="metric-icon-box" style={{backgroundColor: 'var(--color-success)'}}>
              <FaCheckCircle />
            </div>
            <div className="metric-info">
              <span className="metric-title">Approved Reviews</span>
              <span className="metric-value">{stats?.approvedReviews || 0}</span>
              <div className="metric-trend">
                <span className="trend-up">↑ 15.8%</span> <span className="trend-text">from last week</span>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="metric-card">
            <div className="metric-icon-box" style={{backgroundColor: 'var(--color-danger)'}}>
              <FaTimesCircle />
            </div>
            <div className="metric-info">
              <span className="metric-title">Rejected Reviews</span>
              <span className="metric-value">{stats?.rejectedReviews || 0}</span>
              <div className="metric-trend">
                <span className="trend-down">↓ 2.1%</span> <span className="trend-text">from last week</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Middle Section: Chart and Latest List */}
      <Row className="mb-4">
        {/* Chart Column */}
        <Col md={8}>
          <div className="dashboard-section h-100 mb-0">
            <div className="section-header">
              <h3 className="section-title">Reviews Overview</h3>
              <select className="form-select form-select-sm" style={{width: 'auto'}}>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={stats?.chartData || []} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                  <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                  <Line type="monotone" dataKey="Approved" stroke="#22c55e" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="Pending" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="Rejected" stroke="#ef4444" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>
        
        {/* Latest Reviews Column */}
        <Col md={4}>
          <div className="dashboard-section h-100 mb-0">
            <div className="section-header">
              <h3 className="section-title">Latest Reviews</h3>
              <Link to="/admin/reviews" style={{fontSize: '0.85rem', textDecoration: 'none'}}>View All</Link>
            </div>
            
            <div className="latest-reviews-list">
              {recentReviews.map((review, idx) => (
                <div className="latest-review-item" key={review.id || idx}>
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.name.charAt(0)}
                    </div>
                    <div className="reviewer-details">
                      <span className="reviewer-name">{review.name}</span>
                      {review.company && <span className="reviewer-company">{review.company}</span>}
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <div className="review-stars">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                    <span className={`status-badge mt-1 ${
                      review.status === 'Approved' ? 'status-approved' : 
                      review.status === 'Rejected' ? 'status-rejected' : 'status-pending'
                    }`}>
                      {review.status}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Fallback if no reviews */}
              {recentReviews.length === 0 && (
                <div className="text-center text-muted py-4">No recent reviews</div>
              )}
            </div>
          </div>
        </Col>
      </Row>

    </div>
  );
};

export default DashboardHome;
