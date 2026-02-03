import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import ReactDOM from "react-dom";

import logo from "../assets/logo2.webp";

import './navbar.css';

const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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
      if (window.innerWidth > 768) {
        setOpenMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* NAVBAR HEADER */}
      <div className={`mainNav ${scrolled ? "scrolled" : ""}`}>

        <div className="brand">
         <NavLink to={"/"}><img src={logo} /></NavLink>
          <NavLink to={"/"}><span>Silicon Vista</span></NavLink>
        </div>

        <ul className="navLinks">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/courses">Courses</NavLink></li>
          <li><NavLink to="/contact">Contact Us</NavLink></li>
        </ul>

        <div className="hamburger">
          <FaBars size={28} onClick={() => setOpenMenu(prev => !prev)} />
        </div>
      </div>

      {/* MOBILE MENU (Rendered in Portal so nothing blocks it) */}
      {ReactDOM.createPortal(
        <div className={`menu ${openMenu ? "active" : ""}`}>
          <NavLink to="/" onClick={() => setOpenMenu(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setOpenMenu(false)}>About Us</NavLink>
          <NavLink to="/courses" onClick={() => setOpenMenu(false)}>Courses</NavLink>
          <NavLink to="/contact" onClick={() => setOpenMenu(false)}>Contact</NavLink>
        </div>,
        document.getElementById("menu-root") // from public/index.html
      )}
    </>
  );
};

export default Navbar;
