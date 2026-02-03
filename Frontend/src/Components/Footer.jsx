import React from 'react'
import { HashLink } from 'react-router-hash-link'
import './footer.css'

import { NavLink } from 'react-router-dom'

const Footer = () => {


  return (
    <footer className="footerDiv">

      <div className="footerContent">

        {/* LEFT – BRAND / QUICK LINKS */}
        <div className="footerCol">
          <h3>Quick Links</h3>
          <ul>
            <li><NavLink to = "/">Home</NavLink></li>
            <li><NavLink to = "/about">About us</NavLink></li>
            <li><NavLink to = "/courses">Courses</NavLink></li>
            <li><NavLink to = "/contact">Contact us </NavLink></li>
          </ul>
        </div>

        {/* MIDDLE – PROGRAMS */}
        <div className="footerCol">
          <h3>Programs</h3>
          <ul>
            <li><HashLink smooth to={"/courses/#co"}>VLSI Design Verification</HashLink></li>
            <li><HashLink smooth to={"/#internship"}>Internship Program</HashLink></li>
            <li><HashLink smooth to={"/courses/#cd"}>SystemVerilog & UVM</HashLink></li>
            <li><HashLink smooth to={"/courses/#cd"}>Protocol Training</HashLink></li>
          </ul>
        </div>

        {/* RIGHT – CONTACT */}
        <div className="footerCol">
          <h3>Contact</h3>
          <p>Email: info@siliconvista.in</p>
          <p>Phone: +91 63694 98025</p>
          <p>Location: Chennai, India</p>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="footerDivider"></div>

      {/* COPYRIGHT */}
      <div className="footerBottom">
        © 2026 <a href='https://www.devspectra.in/' target='_blank' rel="noopener noreferrer">DevSpectra</a> All Rights Reserved.
      </div>

    </footer>
  )
}

export default Footer
