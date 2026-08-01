import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import axios from 'axios';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import './admin.css';
import logo from '../assets/logo.png'; // Assuming a logo exists or I'll use text if it fails
import FeatureParticles from '../Components/FeatureParticles';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminInfo', JSON.stringify(data));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      {/* Animated Particles Background */}
      <FeatureParticles count={40} sizeMultiplier={3.5} />

      {/* Main Content */}
      <div className="login-content-wrapper">
        <div className="login-card shadow-lg">
          <div className="login-card-header text-center">
            <div className="mb-3">
              <img src={logo} alt="Silicon Vista Logo" style={{ maxWidth: '80px', height: 'auto' }} />
            </div>
            <h2 className="fw-bold mb-2">Welcome Back!</h2>
            <p className="text-muted small mb-4">Sign in to continue to Silicon Vista Admin Panel</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin} className="login-form">
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

            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Password</Form.Label>
              <div className="input-group-custom">
                <div className="input-icon-box">
                  <FaLock />
                </div>
                <Form.Control 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="custom-input"
                />
                <div className="input-icon-right" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </Form.Group>

            <Button type="submit" className="w-100 login-submit-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center mt-3">
              <Link to="/admin/forgot-password" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                Forgot Password?
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

export default Login;
