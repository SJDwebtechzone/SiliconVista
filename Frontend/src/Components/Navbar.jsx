import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import ReactDOM from "react-dom";

import logo from "../assets/logo2.webp";
import './navbar.css';

const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const phoneNumber = "+91 79045 13540";
  const whatsappUrl = "https://wa.me/917904513540?text=Hi,%20I%20want%20to%20know%20about%20VLSI%20courses";
  const callUrl = "tel:+917904513540";

  // Detect scroll to apply shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when screen resized (safety)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setOpenMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style>{`
        /* Inline styles for the new buttons and mobile menu */


        .nav-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-call {
          background: rgba(33, 150, 243, 0.1);
          color: #2196F3;
          border: 1px solid rgba(33, 150, 243, 0.2);
        }
        .btn-call:hover {
          background: #2196F3;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
        }

        .btn-whatsapp {
          background: linear-gradient(90deg, #25D366, #128C7E);
          color: white;
          box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);
        }
        .btn-whatsapp:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
        }

        .hamburger {
          display: none;
          cursor: pointer;
          color: #112240;
        }

        @media (max-width: 1100px) {
          .nav-center-links { gap: 20px; }
          .action-btn span { display: none; }
          .action-btn { padding: 10px; border-radius: 50%; }
        }

        @media (max-width: 992px) {
          .nav-center-links, .nav-actions { display: none; }
          .hamburger { display: block; }
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(255, 255, 255, 0.98);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 25px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          pointer-events: all;
        }

        .mobile-menu-overlay a {
          text-decoration: none;
          color: #112240;
          font-size: 1.5rem;
          font-weight: 700;
          transition: color 0.2s;
        }

        .mobile-menu-overlay a:hover, .mobile-menu-overlay a.active {
          color: #2196F3;
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
          width: 80%;
          max-width: 300px;
        }

        .mobile-close {
          position: absolute;
          top: 30px;
          right: 30px;
          background: none;
          border: none;
          font-size: 2rem;
          color: #112240;
          cursor: pointer;
        }
      `}</style>

      {/* NAVBAR HEADER */}
      <div className={`mainNav ${scrolled ? "scrolled" : ""}`}>

        <div className="brand">
         <NavLink to={"/"}><img src={logo} alt="SiliconVista Logo" /></NavLink>
          <NavLink to={"/"}><span>Silicon Vista</span></NavLink>
        </div>

        <ul className="navLinks">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/courses">Courses</NavLink></li>
          <li><NavLink to="/blogs">Blogs</NavLink></li>
          <li><NavLink to="/contact">Contact Us</NavLink></li>
        </ul>

        <div className="nav-actions">
          <a href={callUrl} className="action-btn btn-call">
            <FaPhoneAlt /> <span>Call Us</span>
          </a>
          <a href={whatsappUrl} className="action-btn btn-whatsapp" target="_blank" rel="noreferrer">
            <FaWhatsapp size={18} /> <span>WhatsApp</span>
          </a>
        </div>

        <div className="hamburger">
          <FaBars size={28} onClick={() => setOpenMenu(true)} />
        </div>
      </div>

      {/* MOBILE MENU PORTAL */}
      {ReactDOM.createPortal(
        <div className={`mobile-menu-overlay ${openMenu ? "active" : ""}`}>
          <button className="mobile-close" onClick={() => setOpenMenu(false)}>&times;</button>
          
          <NavLink to="/" onClick={() => setOpenMenu(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setOpenMenu(false)}>About Us</NavLink>
          <NavLink to="/courses" onClick={() => setOpenMenu(false)}>Courses</NavLink>
          <NavLink to="/blogs" onClick={() => setOpenMenu(false)}>Blogs</NavLink>
          <NavLink to="/contact" onClick={() => setOpenMenu(false)}>Contact</NavLink>

          <div className="mobile-actions">
            <a href={callUrl} className="action-btn btn-call" style={{ justifyContent: 'center', padding: '15px' }} onClick={() => setOpenMenu(false)}>
              <FaPhoneAlt /> <span>Call Us</span>
            </a>
            <a href={whatsappUrl} className="action-btn btn-whatsapp" style={{ justifyContent: 'center', padding: '15px' }} target="_blank" rel="noreferrer" onClick={() => setOpenMenu(false)}>
              <FaWhatsapp size={20} /> <span>WhatsApp</span>
            </a>
          </div>
        </div>,
        document.getElementById("menu-root") || document.body
      )}
    </>
  );
};

export default Navbar;
