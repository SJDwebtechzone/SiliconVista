import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import './admin.css';
import logo from '../assets/logo.png';
import FeatureParticles from '../Components/FeatureParticles';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { data } = await axios.post('/api/admin/forgot-password', { email });
      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <FeatureParticles count={40} sizeMultiplier={3.5} />

      <div className="login-content-wrapper">
        <div className="login-card shadow-lg">
          <div className="login-card-header text-center">
            <div className="mb-3">
              <img src={logo} alt="Silicon Vista Logo" style={{ maxWidth: '80px', height: 'auto' }} />
            </div>
            <h2 className="fw-bold mb-2">Forgot Password?</h2>
            <p className="text-muted small mb-4">Enter your email and we'll send you a reset link</p>
          </div>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Email Address</Form.Label>
              <div className="input-group-custom">
                <div className="input-icon-box">
                  <FaEnvelope />
                </div>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="custom-input"
                />
              </div>
            </Form.Group>

            <Button type="submit" className="w-100 login-submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <div className="text-center mt-4">
              <Link to="/admin/login" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                <FaArrowLeft className="me-2" /> Back to Login
              </Link>
            </div>

            <div className="secure-access-text text-center text-muted small mt-4">
              <FaShieldAlt className="text-primary me-2" /> Secure Admin Access
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;