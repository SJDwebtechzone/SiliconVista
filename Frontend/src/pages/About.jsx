import React from 'react';
import './about.css';

import { Helmet } from "react-helmet-async";
import { FaBullseye, FaRocket, FaHandshake, FaHandsHelping, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { RiEyeLine } from "react-icons/ri";
import { MdOutlineTrackChanges } from "react-icons/md";

import Footer from '../Components/Footer.jsx';
import aboutImg from '../assets/about.png';
import bannerImg from '../assets/about-banner.png';

const About = () => {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Helmet>
        <title>About Silicon Vista | Leading VLSI Institute Chennai</title>
        <meta name="description" content="Learn about Silicon Vista, a leading VLSI institute in Chennai. Our industry expert trainers provide real-time projects and hands-on semiconductor training." />
        <meta name="keywords" content="About Silicon Vista, Leading VLSI Institute Chennai, Real Time Projects, Hands-on Training, Industry Expert Trainers, Semiconductor Training" />
        <link rel="canonical" href="https://siliconvista.com/about" />

        {/* OpenGraph */}
        <meta property="og:title" content="About Silicon Vista - Leading VLSI Institute" />
        <meta property="og:description" content="Learn about our mission to provide industry-standard chip design training and real-time projects." />
        <meta property="og:image" content="https://siliconvista.com/og-about.png" />
        <meta property="og:url" content="https://siliconvista.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Silicon Vista - Leading VLSI Institute" />
        <meta name="twitter:description" content="Learn about our mission to provide industry-standard chip design training and real-time projects." />
        <meta name="twitter:image" content="https://siliconvista.com/og-about.png" />

        {/* Structured Data: LocalBusiness */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "@id": "https://siliconvista.com/#localBusiness",
            "name": "Silicon Vista VLSI Training Institute",
            "image": "https://siliconvista.com/campus.jpg",
            "telephone": "+91-7904513540",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Tiruvallur",
              "addressLocality": "Chennai",
              "addressRegion": "Tamil Nadu",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 13.1430,
              "longitude": 79.9079
            }
          }
          `}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div style={{ 
        background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${bannerImg}) center/cover no-repeat`, 
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5%',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '60px' // Adjust for navbar
      }}>
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '300px', height: '300px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', filter: 'blur(50px)' }}></div>
        
        <h1 style={{ 
          color: '#ffffff', 
          fontFamily: '"Poppins", sans-serif',
          fontSize: '52px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textShadow: '0 4px 15px rgba(0,0,0,0.5)',
          marginBottom: '20px', 
          position: 'relative', 
          zIndex: 1
        }}>
          About <span style={{ color: '#ffffff' }}>Silicon Vista</span>
        </h1>
        <p style={{ 
          color: '#fff', 
          fontFamily: '"Poppins", sans-serif',
          fontSize: '1.5rem', 
          fontWeight: 500,
          letterSpacing: '1px',
          maxWidth: '700px', 
          margin: '0 auto', 
          position: 'relative', 
          zIndex: 1, 
          textShadow: '0 4px 15px rgba(0,0,0,0.5)', 
          textAlign: 'center' 
        }}>
          VLSI Learning Designed for Your Success
        </p>
      </div>
  
      <div style={{ flex: 1, padding: '80px 5%', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

        {/* Introduction Block */}
        <div style={{ 
            background: '#fff', 
            borderRadius: '24px', 
            boxShadow: '0 20px 50px rgba(0,0,0,0.06)', 
            padding: '50px',
            marginBottom: '50px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '50px'
        }}>
            <div style={{ flex: '1 1 500px' }}>
                <h2 style={{ color: '#112240', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '50px', height: '5px', background: 'linear-gradient(90deg, #00C6A0, #2196F3)', borderRadius: '5px' }}></div>
                    About Us
                </h2>
                
                <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify' }}>
                    <b>SiliconVista</b> is a premier training institute offering both online and offline programs in <b>VLSI</b> and semiconductor technology. We are dedicated to nurturing skilled and confident engineers for the semiconductor industry, driven by a simple goal — to help learners build strong foundations and practical skills required to succeed in <b>VLSI and chip</b> design careers.
                </p>
                <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.8', textAlign: 'justify' }}>
                    With the rapid growth of the semiconductor domain, there is a growing demand for engineers who not only understand theory but can also apply concepts effectively. At <b>SiliconVista</b>, we focus on transforming academic concepts into practical, industry-relevant skills through structured and <b>application-oriented training</b>.
                </p>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                    <div style={{ position: 'absolute', top: '15px', left: '-15px', width: '100%', height: '100%', background: 'linear-gradient(135deg, #00C6A0, #2196F3)', borderRadius: '24px', zIndex: 0, opacity: 0.15 }}></div>
                    <img 
                        src={aboutImg} 
                        alt="Students learning VLSI concepts at SiliconVista" 
                        style={{ width: '100%', height: 'auto', borderRadius: '24px', position: 'relative', zIndex: 1, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }} 
                    />
                </div>
            </div>
        </div>

        {/* Vision, Mission, Commitment Block */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            
            {/* Vision */}
            <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)', padding: '40px', borderTop: '4px solid #2196F3', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <h3 style={{ fontSize: '1.4rem', color: '#112240', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: 'rgba(33, 150, 243, 0.1)', color: '#2196F3', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <RiEyeLine size={26} />
                    </div>
                    Our Vision 
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.7', marginBottom: '25px', textAlign: 'justify' }}>
                    To become a trusted learning platform that empowers students and professionals with clear knowledge, hands-on exposure, and career-focused guidance in the field of <b>VLSI and semiconductors.</b>
                </p>
                <div style={{ background: 'linear-gradient(90deg, rgba(0, 198, 160, 0.1), rgba(33, 150, 243, 0.1))', padding: '15px 20px', borderRadius: '12px', color: '#2196F3', fontWeight: '700', fontSize: '1.1rem', borderLeft: '4px solid #2196F3' }}>
                    SiliconVista – Learn VLSI. Build Careers.
                </div>
            </div>

            {/* Mission */}
            <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)', padding: '40px', borderTop: '4px solid #7A1FA2', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <h3 style={{ fontSize: '1.4rem', color: '#112240', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: 'rgba(122, 31, 162, 0.1)', color: '#7A1FA2', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaRocket size={26} />
                    </div>
                    Our Mission
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.7', marginBottom: '15px', textAlign: 'justify' }}>
                    Our mission is to empower students and professionals with the confidence, clarity, and skills needed to excel in semiconductor design, verification, and emerging chip technologies.
                </p>
                <p style={{ fontSize: '1.1rem', color: '#7A1FA2', lineHeight: '1.7', fontWeight: '600', textAlign: 'justify' }}>
                    To make advanced VLSI education accessible, practical, and career-oriented for every learner.
                </p>
            </div>

            {/* Commitment */}
            <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)', padding: '40px', borderTop: '4px solid #00C6A0', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <h3 style={{ fontSize: '1.4rem', color: '#112240', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: 'rgba(0, 198, 160, 0.1)', color: '#00C6A0', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaHandsHelping size={26} />
                    </div>
                    Our Commitment
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.7', marginBottom: '15px', textAlign: 'justify' }}>
                    At <b>SiliconVista</b>, we are committed to:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                        "Delivering quality education",
                        "Providing honest career guidance",
                        "Maintaining industry relevance",
                        "Supporting learners throughout their learning journey"
                    ].map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1.05rem', color: '#444', lineHeight: '1.5' }}>
                            <FaCheckCircle color="#00C6A0" size={20} style={{ marginTop: '3px', flexShrink: 0 }} />
                            {item === "Providing honest career guidance" ? <span>Providing honest <b>career guidance</b></span> : <span>{item}</span>}
                        </li>
                    ))}
                </ul>
                <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.7', textAlign: 'justify' }}>
                    We believe that with the right guidance and practical exposure, anyone with passion can build a successful career.
                </p>
            </div>

        </div>

      </div>

      <div style={{ height: '50px', background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 100%)', width: '100%', marginTop: 'auto' }}></div>
      <Footer />
    </div>
  );
};

export default About;
