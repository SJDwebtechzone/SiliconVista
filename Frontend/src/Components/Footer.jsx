import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './footer.css';
import FooterParticles from './FooterParticles';

const Footer = () => {
  return (
    <footer className="modern-footer">
      
      <div className="footer-gradient-wrapper" style={{ position: 'relative' }}>
        <FooterParticles />
        {/* SVG Wave Divider at the Top */}
        <div className="custom-shape-divider-top" style={{ position: 'relative', zIndex: 1 }}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
      </div>

      {/* Main Gradient Section */}
      <div className="footer-main" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-container">
          
          {/* COLUMN 1: Brand Logo */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <img src={logo} alt="Silicon Vista Logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
              <h2>Silicon <span>Vista</span></h2>
            </div>
            <p className="brand-desc">
              Empowering the next generation<br />
              with industry-focused training<br />
              in VLSI and advanced technologies.
            </p>
            <div className="social-links mt-3">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://www.linkedin.com/company/silicon-vista/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://www.instagram.com/siliconvista/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.youtube.com/@SiliconVista" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/courses">Courses</NavLink></li>
              <li><NavLink to="/blogs">Blogs</NavLink></li>
              <li><NavLink to="/contact">Contact Us</NavLink></li>
            </ul>
          </div>

          {/* COLUMN 3: Programs */}
          <div className="footer-col">
            <h3>Programs</h3>
            <ul>
              <li><NavLink to="/courses">VLSI Design Verification</NavLink></li>
              <li><NavLink to="/courses">Internship Program</NavLink></li>
              <li><NavLink to="/courses">SystemVerilog & UVM</NavLink></li>
              <li><NavLink to="/courses">Protocol Training</NavLink></li>
            </ul>
          </div>

          {/* COLUMN 4: Contact */}
          <div className="footer-col contact-col">
            <h3>Contact</h3>
            <div className="contact-wrapper">
              <div className="contact-item">
                <div className="icon-wrapper"><FaEnvelope /></div>
                <span>info@siliconvista.in</span>
              </div>
              <div className="contact-item">
                <div className="icon-wrapper"><FaPhoneAlt /></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <a href="tel:+916369498025" style={{ color: 'inherit', textDecoration: 'none' }}>+91 63694 98025</a>
                  <a href="tel:+917904513540" style={{ marginTop: '5px', color: 'inherit', textDecoration: 'none' }}>+91 79045 13540</a>
                </div>
              </div>
              <div className="contact-item" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                <div className="icon-wrapper" style={{ flexShrink: 0 }}><FaMapMarkerAlt /></div>
                <span style={{ paddingTop: '5px', textAlign: 'left', display: 'block' }}>
                  No: 44, Venugopalapuram<br />
                  4th street Iyyappanthangal,<br />
                  Chennai
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom Simple White Bar */}
      <div className="footer-bottom-bar">
        <div className="bottom-bar-container">
          <div className="copy-text">
            © 2026 <a href='https://www.devspectra.in/' target='_blank' rel="noopener noreferrer">DevSpectra</a>. All Rights Reserved.
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
