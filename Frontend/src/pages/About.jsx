import React from 'react';
import './about.css';

import { Helmet } from "react-helmet-async";
import { FaBullseye, FaRocket , FaHandshake , FaHandsHelping, FaShieldAlt} from "react-icons/fa";
import { RiEyeLine } from "react-icons/ri";
import { MdOutlineTrackChanges } from "react-icons/md";



import Footer from '../Components/Footer.jsx';
import aboutImg from '../assets/abt.webp';
import visionImg from '../assets/vision.webp';

const About = () => {
  return (
    <div className='about'>

      <Helmet>
          <title>About Us | SiliconVista – VLSI & Semiconductor Training Institute</title>

          <meta 
            name="description" 
            content="Learn about SiliconVista — a trusted online VLSI training platform offering hands-on chip design education, expert mentoring, and industry-oriented learning."
          />


          <meta name="keywords" content="
                about siliconvista,
                online vlsi institute india,
                best semiconductor training institute,
                vlsi training platform,
                vlsi education provider,
                trusted vlsi institute,
                vlsi coaching center india,
                vlsi design education,
                semiconductor skill development,
                vlsi learning platform,
                vlsi e-learning institute,
                chip design learning center,
                systemverilog training institute,
                uvm training institute,
                online electronics training,
                vlsi institute for beginners,
                career-focused vlsi institute,
                industry-based vlsi training,
                learn semiconductor online,
                what is siliconvista,
                siliconvista vlsi verification training,
                online technical training institute,
                semiconductor design education
          " />



          <link rel="canonical" href="https://siliconvista.in/about" />

          {/* OG */}
          <meta property="og:title" content="About SiliconVista – Online VLSI Institute" />
          <meta property="og:description" content="Know our vision, mission, and why SiliconVista is the trusted platform for VLSI learning." />
          <meta property="og:image" content="https://siliconvista.in/og-about.png" />
          <meta property="og:url" content="https://siliconvista.in/about" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
      </Helmet>



      {/* HERO SECTION */}
      <div className='aboutHero'>
        <div className='heroContentAbt'>
          <h1>About SiliconVista</h1>
          <h3>Online VLSI Learning Designed for Your Success</h3>
        </div>
      </div>

  
      <div className="aboutContentGrid">

        {/* ABOUT CONTENT */}
        <div className="aboutBox">
          <div className='boxFlex'>
            <div className='boxText'>
              <h2>About Us</h2>
          <p>
           <b>SiliconVista</b> is an online <b>VLSI</b> and semiconductor training institute
            dedicated to nurturing skilled and confident engineers for the
            semiconductor industry. We are driven by a simple goal — to help
            learners build strong foundations and practical skills required to
            succeed in <b>VLSI and chip</b> design careers.
          </p>

          <p>
            With the rapid growth of the semiconductor domain, there is a growing
            demand for engineers who not only understand theory but can also apply
            concepts effectively. At <b>SiliconVista</b>, we focus on transforming
            academic concepts into practical, industry-relevant skills through
            structured and <b>application-oriented training</b>.
          </p>
            </div>
          <div className='boxImage'>
              <img src= {aboutImg} alt="Students learning VLSI concepts at SiliconVista" />
          </div>
          </div>
          
        </div>

        {/* COMMITMENT CONTENT */}
        <div className="aboutBox">

          <div className='boxFlex'>
            <div className='boxText'>

          <h2 className="iconHeading">
            <RiEyeLine className="headingIcon" />
              Our Vision 
          </h2>
          <p>
            To become a trusted learning platform that empowers students and
            professionals with clear knowledge, hands-on exposure, and
            career-focused guidance in the field of <b>VLSI and semiconductors.</b>
          </p>

          <p className="highlightText">
            SiliconVista – Learn VLSI. Build Careers.
          </p>

          <h3 className="iconHeading">
            <FaRocket className="headingIcon" />
              Our Mission
          </h3>


          <p>
            Our mission is to empower students and professionals with the confidence, clarity,
            and skills needed to excel in semiconductor design, verification, and emerging chip technologies.
          </p>

          <p className='highlightText'>
            To make advanced VLSI education accessible, practical, and career-oriented for every learner.
          </p>

          <h3 className="iconHeading">
            <FaHandsHelping className="headingIcon" />
              Our Commitment
          </h3>

          <p>At <b>SiliconVista</b>, we are committed to:</p>

          <ul>
            <li>Delivering quality education</li>
            <li>Providing honest <b>career guidance</b></li>
            <li>Maintaining industry relevance</li>
            <li>Supporting learners throughout their learning journey</li>
          </ul>

          <p>
            We believe that with the right guidance and practical exposure, anyone
            with passion can build a successful career in the semiconductor
            industry.
          </p>
            </div>

          <div className='boxImage'>
            <img src = {visionImg} alt="SiliconVista mission and vision illustration about VLSI training" />
          </div>

          </div>

        </div>

      </div>

    <Footer />
    </div>
  );
};

export default About;
