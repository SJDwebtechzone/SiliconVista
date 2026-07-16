import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './footer.css';

const Footer = () => {
  return (
    <footer className="modern-footer">
      
      <div className="footer-gradient-wrapper">
        {/* SVG Wave Divider at the Top */}
        <div className="custom-shape-divider-top">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
      </div>

      {/* Main Gradient Section */}
      <div className="footer-main">
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
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/courses">Courses</NavLink></li>
              <li><HashLink smooth to="/#internship">Blogs</HashLink></li>
              <li><NavLink to="/">Success Stories</NavLink></li>
              <li><NavLink to="/contact">Contact Us</NavLink></li>
            </ul>
          </div>

          {/* COLUMN 3: Programs */}
          <div className="footer-col">
            <h3>Programs</h3>
            <ul>
              <li><HashLink smooth to="/courses/#co">VLSI Design Verification</HashLink></li>
              <li><HashLink smooth to="/#internship">Internship Program</HashLink></li>
              <li><HashLink smooth to="/courses/#cd">SystemVerilog & UVM</HashLink></li>
              <li><HashLink smooth to="/courses/#cd">Protocol Training</HashLink></li>
              <li><HashLink smooth to="/">Industrial Training</HashLink></li>
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
                <span>+91 79045 13540</span>
              </div>
              <div className="contact-item">
                <div className="icon-wrapper"><FaMapMarkerAlt /></div>
                <span>No: 44, Venugopalapuram 4th street Iyyappanthangal, Chennai</span>
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
