import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaPhoneAlt, FaWhatsapp, FaTimes, FaHome, FaInfoCircle, FaGraduationCap, FaBloggerB, FaEnvelope } from "react-icons/fa";
import ReactDOM from "react-dom";

import logo from "../assets/logo2.webp";
import './navbar.css';

const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const phoneNumber = "+91 63694 98025";
  const whatsappUrl = "https://wa.me/917904513540?text=Hi,%20I%20want%20to%20know%20about%20VLSI%20courses";
  const callUrl = "tel:+916369498025";

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
          right: -100%;
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, rgba(248, 251, 255, 0.95), rgba(255, 255, 255, 0.98));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          transition: right 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          overflow: hidden;
        }

        .mobile-menu-overlay::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(33, 150, 243, 0.08) 0%, transparent 50%);
          animation: pulseGlow 10s ease-in-out infinite alternate;
          z-index: -1;
          pointer-events: none;
        }
        
        .mobile-menu-overlay::after {
           content: '';
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           background-image: radial-gradient(rgba(17, 34, 64, 0.05) 1px, transparent 1px);
           background-size: 20px 20px;
           z-index: -1;
           pointer-events: none;
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        .mobile-menu-overlay.active {
          right: 0;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 32px;
          width: 100%;
          box-sizing: border-box;
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
        }

        .mobile-logo::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(33, 150, 243, 0.15) 0%, transparent 70%);
          z-index: -1;
        }

        .mobile-logo img {
          width: 65px;
          height: 65px;
          margin-left: -10px;
        }

        .mobile-logo span {
          font-size: 1.4rem;
          font-weight: 700;
          background: linear-gradient(90deg, #00C6A0, #2196F3, #7A1FA2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-left: -5px;
        }

        .mobile-close {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(17, 34, 64, 0.05);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #112240;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .mobile-close:hover {
          background: rgba(33, 150, 243, 0.1);
          color: #2196F3;
          transform: rotate(90deg);
        }

        .mobile-nav-links {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 30px;
          padding: 0 32px;
          width: 100%;
          box-sizing: border-box;
        }

        .nav-item-wrapper {
          overflow: hidden;
        }

        .mobile-menu-overlay a.mobile-link {
          text-decoration: none;
          color: #1F2937;
          font-family: 'Poppins', sans-serif;
          font-size: clamp(24px, 6vw, 28px);
          font-weight: 600;
          letter-spacing: 0.3px;
          transition: all 0.3s ease;
          display: block;
          text-align: center;
          position: relative;
          transform: translateY(100%);
          opacity: 0;
        }

        .mobile-menu-overlay.active a.mobile-link {
          animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .mobile-menu-overlay.active .nav-item-wrapper:nth-child(1) a { animation-delay: 0.1s; }
        .mobile-menu-overlay.active .nav-item-wrapper:nth-child(2) a { animation-delay: 0.15s; }
        .mobile-menu-overlay.active .nav-item-wrapper:nth-child(3) a { animation-delay: 0.2s; }
        .mobile-menu-overlay.active .nav-item-wrapper:nth-child(4) a { animation-delay: 0.25s; }
        .mobile-menu-overlay.active .nav-item-wrapper:nth-child(5) a { animation-delay: 0.3s; }

        @keyframes slideUpFade {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .mobile-menu-overlay a.mobile-link:hover, .mobile-menu-overlay a.mobile-link.active {
          background: linear-gradient(90deg, #2196F3, #00BCD4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transform: scale(1.05);
        }

        .mobile-menu-overlay a.mobile-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #2196F3, #00BCD4);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .mobile-menu-overlay a.mobile-link:hover::after, .mobile-menu-overlay a.mobile-link.active::after {
          width: 40px;
        }

        .mobile-bottom-actions {
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 16px;
          padding: 32px;
          width: 100%;
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(20px);
        }

        .mobile-menu-overlay.active .mobile-bottom-actions {
          animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
        }

        .premium-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 160px;
          height: 52px;
          border-radius: 999px;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .btn-premium-call {
          background: #ffffff;
          color: #2196F3;
          border: 2px solid rgba(33, 150, 243, 0.2);
        }

        .btn-premium-call:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(33, 150, 243, 0.15);
          border-color: #2196F3;
        }

        .btn-premium-whatsapp {
          background: linear-gradient(135deg, #25D366, #1EBE5A);
          color: #ffffff;
          border: none;
        }

        .btn-premium-whatsapp:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
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
          
          {/* Header */}
          <div className="mobile-menu-header">
            <div className="mobile-logo">
              <img src={logo} alt="SiliconVista Logo" />
              <span>Silicon Vista</span>
            </div>
            <button className="mobile-close" onClick={() => setOpenMenu(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Nav Links */}
          <div className="mobile-nav-links">
            <div className="nav-item-wrapper"><NavLink className="mobile-link" to="/" onClick={() => setOpenMenu(false)}>Home</NavLink></div>
            <div className="nav-item-wrapper"><NavLink className="mobile-link" to="/about" onClick={() => setOpenMenu(false)}>About Us</NavLink></div>
            <div className="nav-item-wrapper"><NavLink className="mobile-link" to="/courses" onClick={() => setOpenMenu(false)}>Courses</NavLink></div>
            <div className="nav-item-wrapper"><NavLink className="mobile-link" to="/blogs" onClick={() => setOpenMenu(false)}>Blogs</NavLink></div>
            <div className="nav-item-wrapper"><NavLink className="mobile-link" to="/contact" onClick={() => setOpenMenu(false)}>Contact</NavLink></div>
          </div>

          {/* Bottom Actions */}
          <div className="mobile-bottom-actions">
            <a href={callUrl} className="premium-btn btn-premium-call" onClick={() => setOpenMenu(false)}>
              <FaPhoneAlt size={16} /> <span>Call Now</span>
            </a>
            <a href={whatsappUrl} className="premium-btn btn-premium-whatsapp" target="_blank" rel="noreferrer" onClick={() => setOpenMenu(false)}>
              <FaWhatsapp size={18} /> <span>WhatsApp</span>
            </a>
          </div>

        </div>,
        document.getElementById("menu-root") || document.body
      )}
    </>
  );
};

export default Navbar;
