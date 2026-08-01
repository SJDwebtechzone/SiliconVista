import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import './admin.css';
import logo from '../assets/logo.png';
import FeatureParticles from '../Components/FeatureParticles';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.put(`/api/admin/reset-password/${token}`, { newPassword });
      setMessage(data.message);
      setTimeout(() => navigate('/admin/login'), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset link is invalid or has expired');
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
            <h2 className="fw-bold mb-2">Reset Password</h2>
            <p className="text-muted small mb-4">Enter your new password below</p>
          </div>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          {!message && (
            <Form onSubmit={handleSubmit} className="login-form">
             <Form.Group className="mb-3">
  <Form.Label className="small fw-bold">New Password</Form.Label>
  <div className="input-group-custom">
    <div className="input-icon-box">
      <FaLock />
    </div>
    <Form.Control
      type={showNewPassword ? "text" : "password"}
      placeholder="Enter new password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
      minLength={6}
      className="custom-input"
    />
    <div className="input-icon-right" onClick={() => setShowNewPassword(!showNewPassword)}>
      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
    </div>
  </div>
</Form.Group>

              <Form.Group className="mb-3">
  <Form.Label className="small fw-bold">Confirm New Password</Form.Label>
  <div className="input-group-custom">
    <div className="input-icon-box">
      <FaLock />
    </div>
    <Form.Control
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm new password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
      minLength={6}
      className="custom-input"
    />
    <div className="input-icon-right" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
    </div>
  </div>
</Form.Group>

              <Button type="submit" className="w-100 login-submit-btn" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </Form>
          )}

          <div className="secure-access-text text-center text-muted small mt-4">
            <FaShieldAlt className="text-primary me-2" /> Secure Admin Access
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;