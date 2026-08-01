import React, { useState, useEffect } from 'react';
import { Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

import { 
  FaHome, FaImage, FaStar, FaQuoteLeft, FaSignOutAlt, 
  FaBars, FaBell, FaSearch, FaUserAlt, FaCog, FaUsers, FaEnvelope, FaExternalLinkAlt, FaBook, FaClone, FaHandshake, FaBlog, FaGoogle, FaNewspaper
} from 'react-icons/fa';
import './admin.css';
import logo from '../assets/logo.png'; // Make sure you have this

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminInfo, setAdminInfo] = useState(() => JSON.parse(localStorage.getItem('adminInfo') || '{}'));

  useEffect(() => {
    const handleStorageUpdate = () => {
      setAdminInfo(JSON.parse(localStorage.getItem('adminInfo') || '{}'));
    };
    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaHome /> },
    { name: 'Homepage Banner', path: '/admin/banner', icon: <FaImage /> },
    { name: 'Customer Review', path: '/admin/reviews', icon: <FaStar /> },
    { name: 'Course Sections', path: '/admin/courses', icon: <FaBook /> },
    { name: 'Popup', path: '/admin/popup', icon: <FaClone /> },
    { name: 'Brochure', path: '/admin/brochure', icon: <FaBook /> },
    { name: 'Career Partners', path: '/admin/partners', icon: <FaHandshake /> },
    { name: 'News & Events', path: '/admin/news-events', icon: <FaNewspaper /> },
    { name: 'Blogs', path: '/admin/blogs', icon: <FaBlog /> },
    { name: 'Google Reviews', path: '/admin/google-reviews', icon: <FaGoogle /> },
    { name: 'Account Settings', path: '/admin/account-settings', icon: <FaCog /> }
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="admin-sidebar shadow-lg">
        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <img src={logo} alt="Silicon Vista Logo" style={{ width: '45px', height: '45px' }} />
          <span style={{
            background: 'linear-gradient(90deg, #00C6A0, #2196F3, #7A1FA2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700',
            fontSize: '1.2rem',
            fontFamily: '"Poppins", sans-serif'
          }}>Silicon Vista</span>
        </div>

        <div className="sidebar-menu">
          <div className="menu-label">MAIN MENU</div>
          <Nav className="flex-column">
            {navItems.map((item) => (
              <Nav.Link 
                as={Link} 
                to={item.path} 
                key={item.name}
                className={`admin-nav-link p-2 d-flex align-items-center ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.icon} <span className="ms-3">{item.name}</span>
              </Nav.Link>
            ))}
          </Nav>
        </div>

        <div className="sidebar-footer">
          <Button variant="outline-light" className="btn-view-website mb-3" onClick={() => window.open('/', '_blank')}>
            View Website <FaExternalLinkAlt />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navbar */}
        <div className="top-navbar" style={{justifyContent: 'flex-end'}}>
          <div className="navbar-right">
            <Dropdown align="end">
              <Dropdown.Toggle as="div" className="navbar-profile" style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div className="navbar-profile-avatar">
                  <FaUserAlt size={16} />
                </div>
                <div className="navbar-profile-info">
                  <span className="navbar-profile-name" style={{color: 'var(--admin-text-main)'}}>{adminInfo.name || 'Admin'}</span>
                  <span className="navbar-profile-role" style={{color: 'var(--admin-text-muted)'}}>Super Admin</span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm border-0 mt-2">
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  <FaSignOutAlt className="me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Dynamic Page Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
        
        {/* Admin Footer */}
        <div style={{ textAlign: 'center', padding: '15px 20px', color: '#8b9bb4', fontSize: '0.85rem', marginTop: 'auto' }}>
          &copy; 2026 DevSpectra. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;