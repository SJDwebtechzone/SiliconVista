import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';

const AccountSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}');
    setName(adminInfo.name || '');
    setEmail(adminInfo.email || '');
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileError('');
    setProfileSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.put(
        '/api/admin/profile',
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}');
      localStorage.setItem('adminInfo', JSON.stringify({ ...adminInfo, name: data.name, email: data.email }));

      setProfileSuccess('Profile updated successfully!');
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    setPasswordSaving(true);

    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        '/api/admin/change-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPasswordSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="py-4 px-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 className="section-title fs-3 mb-4">Account Settings</h2>

      <Row>
        {/* Profile Info */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <FaUser className="text-primary" /> Profile Information
              </h5>

              {profileError && <Alert variant="danger">{profileError}</Alert>}
              {profileSuccess && <Alert variant="success">{profileSuccess}</Alert>}

              <Form onSubmit={handleProfileUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-secondary">Admin User Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="p-3 bg-light border-0"
                    style={{ borderRadius: '10px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold text-secondary">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="p-3 bg-light border-0"
                    style={{ borderRadius: '10px' }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  disabled={profileSaving}
                  className="w-100 py-3 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
                  style={{ background: 'linear-gradient(90deg, #00C6A0, #2196F3)', border: 'none' }}
                >
                  <FaSave /> {profileSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Change Password */} 
        <Col md={6} className="mb-4">
          <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <FaLock className="text-primary" /> Change Password
              </h5>

              {passwordError && <Alert variant="danger">{passwordError}</Alert>}
              {passwordSuccess && <Alert variant="success">{passwordSuccess}</Alert>}

              <Form onSubmit={handlePasswordChange}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-secondary">Current Password</Form.Label>
                  <div style={{ position: 'relative' }}>
                    <Form.Control
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      required
                      className="p-3 bg-light border-0"
                      style={{ borderRadius: '10px', paddingRight: '45px' }}
                    />
                    <div 
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888' }}
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-secondary">New Password</Form.Label>
                  <div style={{ position: 'relative' }}>
                    <Form.Control
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className="p-3 bg-light border-0"
                      style={{ borderRadius: '10px', paddingRight: '45px' }}
                    />
                    <div 
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888' }}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold text-secondary">Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="p-3 bg-light border-0"
                    style={{ borderRadius: '10px' }}
                  />   
                </Form.Group>

                <Button
                  type="submit"
                  disabled={passwordSaving}
                  className="w-100 py-3 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
                  style={{ background: 'linear-gradient(90deg, #00C6A0, #2196F3)', border: 'none' }}
                >
                  <FaLock /> {passwordSaving ? 'Updating...' : 'Update Password'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AccountSettings; 