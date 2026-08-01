import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from "react-helmet-async";
import { FaLaptopCode, FaChalkboardTeacher, FaCertificate, FaBriefcase, FaCheckCircle, FaMicrochip } from 'react-icons/fa';

import Footer from '../Components/Footer.jsx';
import HeroCarousel from '../Components/HeroCarousel.jsx';
import ReviewForm from '../Components/ReviewForm.jsx';
import ReviewSection from '../Components/ReviewSection.jsx';
import GoogleReviewsSection from '../Components/GoogleReviewsSection.jsx';
import CareerOpportunitiesSection from '../Components/CareerOpportunitiesSection.jsx';

import h1 from '../assets/h1.jpg';
import h2 from '../assets/h2.jpg';
import h3 from '../assets/h3.jpg';
import h4 from '../assets/h4.jpg';
import h5 from '../assets/h5.jpg';
import h6 from '../assets/h6.webp';
import h7 from '../assets/h7.jpg';
import h9 from '../assets/h9.jpg';
import h10 from '../assets/h10.jpg';
import faqImage from '../assets/what.png';
import CircuitBackground from '../Components/CircuitBackground';
import ParticleBackground from '../Components/ParticleBackground';
import FeatureParticles from '../Components/FeatureParticles';
import NewsEventsSection from '../Components/NewsEventsSection.jsx';



const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is VLSI ?",
      answer: "VLSI is the technology used to design integrated circuits with millions of transistors."
    },
    {
      question: "Who can study VLSI ?",
      answer: "ECE, EEE, CSE students, freshers, and working professionals can study VLSI."
    },
    {
      question: "What is the role of a VLSI Design Engineer ?",
      answer: "A VLSI Design Engineer designs, verifies, and implements chip-level circuits using industry tools for processors, SoCs, and ICs."
    },
    {
      question: "Is VLSI a good career ?",
      answer: "Yes, VLSI is a high-demand, future-proof career with strong growth opportunities and competitive salaries in the global semiconductor industry."
    },
    {
      question: "Is VLSI course useful for ECE / EEE students ?",
      answer: "Yes, VLSI courses align closely with ECE/EEE core subjects and open doors to core electronics and semiconductor design roles."
    },
    {
      question: "Do I need coding knowledge to learn VLSI ?",
      answer: "Basic programming knowledge is helpful, but not mandatory; required coding concepts are covered during the course."
    },
    {
      question: "What is verification VLSI design ?",
      answer: "Verification in VLSI is the process of validating the functionality of a chip design to ensure it performs correctly according to specifications, using simulation, testbenches, and verification methodologies like UVM before fabrication."
    }
  ];

  return (
    <div style={{
      flex: '1 1 500px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            borderLeft: activeIndex === index ? '4px solid #00C6A0' : '4px solid transparent',
            transition: 'all 0.3s ease'
          }}
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontWeight: '600', color: '#333', fontSize: '1.1rem', cursor: 'pointer', margin: 0 }}>
              {faq.question}
            </label>
            <button 
              style={{
                background: activeIndex === index ? '#00C6A0' : '#f1f1f1',
                color: activeIndex === index ? '#fff' : '#333',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {activeIndex === index ? "-" : "+"}
            </button>
          </div>

          <div style={{
            maxHeight: activeIndex === index ? '200px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease, margin-top 0.4s ease',
            marginTop: activeIndex === index ? '15px' : '0'
          }}>
            <p style={{ color: '#555', margin: 0, lineHeight: '1.6' }}>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Home = () => {



  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data } = await axios.get('/api/partners');
        // Filter only active partners
        setPartners(data.filter(p => p.is_active));
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  return (
    <div className='homeDiv' style={{ overflowX: 'hidden', width: '100%' }}>
      <style>
        {`
          html, body {
            overflow-x: hidden;
          }
        `}
      </style>
      <Helmet>
        <title>Best VLSI Training Institute Chennai | Silicon Vista</title>
        <meta name="description" content="Accelerate your semiconductor career with Silicon Vista, the best VLSI Training Institute in Chennai. We offer online & offline Design Verification courses." />
        <meta name="keywords" content="Best VLSI Training Institute Chennai, VLSI Design Verification Course, Offline VLSI Training, Online VLSI Training, Semiconductor Training, Chip Design, SystemVerilog, UVM" />
        <link rel="canonical" href="https://siliconvista.com/" />

        {/* OpenGraph */}
        <meta property="og:title" content="Silicon Vista | Top VLSI Training Institute in Chennai" />
        <meta property="og:description" content="Accelerate your semiconductor career with expert online & offline training in Design Verification, SystemVerilog, and UVM." />
        <meta property="og:image" content="https://siliconvista.com/og-home.png" />
        <meta property="og:url" content="https://siliconvista.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Silicon Vista | Top VLSI Training Institute in Chennai" />
        <meta name="twitter:description" content="Accelerate your semiconductor career with expert online & offline training in Design Verification, SystemVerilog, and UVM." />
        <meta name="twitter:image" content="https://siliconvista.com/og-home.png" />

        {/* Structured Data: Organization & LocalBusiness & FAQ */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://siliconvista.com/#organization",
                "name": "Silicon Vista",
                "url": "https://siliconvista.com/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://siliconvista.com/logo.png"
                },
                "sameAs": [
                  "https://www.linkedin.com/company/silicon-vista",
                  "https://twitter.com/siliconvista"
                ]
              },
              {
                "@type": "EducationalOrganization",
                "@id": "https://siliconvista.com/#localBusiness",
                "name": "Silicon Vista VLSI Training Institute",
                "image": "https://siliconvista.com/campus.jpg",
                "telephone": "+91-6369498025",
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
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is VLSI?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "VLSI is the process of creating integrated circuits by combining millions of MOS transistors into a single chip."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Who can study VLSI?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "ECE, EEE, CSE students, fresh graduates, and working professionals can study VLSI and semiconductor courses."
                    }
                  }
                ]
              }
            ]
          }
          `}
        </script>
      </Helmet>


    <HeroCarousel />

      <div style={{ backgroundColor: '#f8f9fa', padding: '100px 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '60px' }}>
          
          {/* Left Content Column */}
          <div style={{ flex: '1 1 600px' }}>
            <h1 style={{ color: '#112240', marginBottom: '20px' }}>
              Why You Need to <span style={{ color: '#2196F3' }}>Choose Us?</span>
            </h1>

            <p style={{ color: '#555', marginBottom: '30px', textAlign: 'justify' }}>
              <b>SiliconVista offers Design Verification Courses </b> and bridge the gap between academic knowledge and real-world semiconductor
              industry requirements. Our VLSI programs are designed by industry experts
              to make you job-ready, not just certificate-ready.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
              {[
                "Industry-oriented aligned with VLSI curriculum",
                "Hands-on projects with real tools",
                "Internship & real-time exposure",
                "Expert mentors from semiconductor industry",
                "Offers Advanced VLSI Design Verification",
                "Courses for freshers & professionals",
                "Our real-time, hands-on training combined with individual one-on-one mentoring ensures you understand every concept deeply and progress with confidence."
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1.05rem', color: '#444', lineHeight: '1.5', textAlign: 'justify' }}>
                  <FaCheckCircle color="#00C6A0" size={20} style={{ marginTop: '4px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="features-grid">
              <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderTop: '4px solid #2196F3', transition: 'transform 0.3s', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <FaCertificate size={32} color="#2196F3" style={{ marginBottom: '15px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#112240', marginBottom: '10px', textAlign: 'left' }}>Government Certified</h3>
                <p style={{ fontSize: '0.95rem', color: '#666', margin: 0, lineHeight: '1.5', textAlign: 'justify' }}>Trusted certification that adds strong value to your resume.</p>
              </div>

              <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderTop: '4px solid #00C6A0', transition: 'transform 0.3s', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <FaLaptopCode size={32} color="#00C6A0" style={{ marginBottom: '15px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#112240', marginBottom: '10px', textAlign: 'left' }}>Hands-On Experience</h3>
                <p style={{ fontSize: '0.95rem', color: '#666', margin: 0, lineHeight: '1.5', textAlign: 'justify' }}>Work with real industry tools and practical design flows.</p>
              </div>

              <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderTop: '4px solid #7A1FA2', transition: 'transform 0.3s', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <FaMicrochip size={32} color="#7A1FA2" style={{ marginBottom: '15px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#112240', marginBottom: '10px', textAlign: 'left' }}>Real-Time VLSI Projects</h3>
                <p style={{ fontSize: '0.95rem', color: '#666', margin: 0, lineHeight: '1.5', textAlign: 'justify' }}>Gain experience through practical verification & design projects.</p>
              </div>
            </div>

          </div>

          {/* Right Image Column */}
          <div style={{ flex: '1 1 450px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
              {/* Procedural Glowing Circuit Background */}
              <CircuitBackground />

              <div className="honeycomb" style={{ zIndex: 1, position: 'relative' }}>
                <div className="honeycomb-row">
                  <div className="hex"><img src={h9} alt="Hex Top" /></div>
                </div>
                <div className="honeycomb-row">
                  <div className="hex"><img src={h1} alt="Hex 1" /></div>
                  <div className="hex"><img src={h2} alt="Hex 2" /></div>
                </div>
                <div className="honeycomb-row">
                  <div className="hex"><img src={h3} alt="Hex 3" /></div>
                  <div className="hex"><img src={h4} alt="Hex 4" /></div>
                  <div className="hex"><img src={h5} alt="Hex 5" /></div>
                </div>
                <div className="honeycomb-row">
                  <div className="hex"><img src={h6} alt="Hex 6" /></div>
                  <div className="hex"><img src={h7} alt="Hex 7" /></div>
                </div>
                <div className="honeycomb-row">
                  <div className="hex"><img src={h10} alt="Hex Bottom" /></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div id='internship' style={{
        background: 'linear-gradient(135deg, #00C6A0, #2196F3, #7A1FA2)',
        padding: '80px 5%',
        color: '#fff',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '50px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <style>
          {`
            @keyframes pulseLine {
              0% { transform: translateY(-100%); opacity: 0; }
              50% { opacity: 0.5; }
              100% { transform: translateY(100%); opacity: 0; }
            }
            @keyframes pulseNode {
              0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
              70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
              100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
            }
            .circuit-line {
              position: absolute;
              width: 2px;
              height: 100%;
              background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5), transparent);
              animation: pulseLine 4s linear infinite;
            }
            .circuit-node {
              position: absolute;
              width: 8px;
              height: 8px;
              background: #fff;
              border-radius: 50%;
              animation: pulseNode 2s infinite;
            }
          `}
        </style>

        {/* Animated Particle Background */}
        <ParticleBackground />

        <div style={{
          flex: '1 1 500px',
          maxWidth: '600px',
          zIndex: 1,
          textAlign: 'left'
        }}>
          <h1 style={{ marginBottom: '25px', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            Internship Program
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.15rem)', lineHeight: '1.8', color: '#fff', marginBottom: '35px', textShadow: '0 1px 3px rgba(0,0,0,0.3)', fontWeight: '500', textAlign: 'justify' }}>
            We don’t just train — we provide real industry exposure.
            Our students get the opportunity to work on practical VLSI
            projects under the guidance of experienced semiconductor professionals.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: '#fff', lineHeight: '1.5', fontWeight: '500', textAlign: 'justify' }}>
              <FaLaptopCode style={{ color: '#fff', fontSize: '1.5rem', marginRight: '15px', marginTop: '3px', flexShrink: 0, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }} />
              <span>Internship on live VLSI projects</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: '#fff', lineHeight: '1.5', fontWeight: '500', textAlign: 'justify' }}>
              <FaChalkboardTeacher style={{ color: '#fff', fontSize: '1.5rem', marginRight: '15px', marginTop: '3px', flexShrink: 0, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }} />
              <span>Mentorship from working VLSI engineers</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: '#fff', lineHeight: '1.5', fontWeight: '500', textAlign: 'justify' }}>
              <FaCertificate style={{ color: '#fff', fontSize: '1.5rem', marginRight: '15px', marginTop: '3px', flexShrink: 0, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }} />
              <span>Internship certificate upon completion</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: '#fff', lineHeight: '1.5', fontWeight: '500', textAlign: 'justify' }}>
              <FaBriefcase style={{ color: '#fff', fontSize: '1.5rem', marginRight: '15px', marginTop: '3px', flexShrink: 0, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }} />
              <span>Internship aligned with placement preparation</span>
            </li>
          </ul>
        </div>

        <div style={{
          flex: '1 1 350px',
          maxWidth: '450px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '24px',
          padding: '50px 30px',
          textAlign: 'center',
          zIndex: 1,
          boxShadow: '0 25px 50px rgba(0,0,0,0.2), inset 0 0 20px rgba(255, 255, 255, 0.2)',
          transform: 'translateY(0)',
          transition: 'transform 0.4s ease, box-shadow 0.4s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.3), inset 0 0 20px rgba(255, 255, 255, 0.3)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2), inset 0 0 20px rgba(255, 255, 255, 0.2)'; }}
        >
            <h2 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '15px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              Industry-Backed
            </h2>
            <h1 style={{ margin: '20px 0', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              VLSI Internship
            </h1>
            <div style={{ width: '80px', height: '4px', background: '#fff', margin: '25px auto', borderRadius: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
            <p style={{ color: '#fff', letterSpacing: '1px', marginBottom: 0, textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
              Hands-on | Mentor-Led | Real Projects
            </p>
        </div>
      </div>





      

         {/* news event section*/}
      <NewsEventsSection />

      {/* Google Reviews Section */}
      <GoogleReviewsSection />

      {/* Career Partners Section */}
      <CareerOpportunitiesSection partners={partners} />

      <ReviewSection />
      
      <div style={{ background: '#f8f9fa', paddingBottom: '3rem' }}>
        <ReviewForm />
      </div>

      {/* Admission CTA Section */}
      <div style={{
        padding: '60px 5%',
        background: 'linear-gradient(135deg, #00C6A0, #2196F3, #7A1FA2)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <FeatureParticles />
        {/* Subtle background decoration */}
        <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(50px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '300px', height: '300px', background: 'rgba(33,150,243,0.2)', borderRadius: '50%', filter: 'blur(50px)' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: '#fff', marginBottom: '20px', textShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
            Launch Your Career in VLSI Design Verification
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', marginBottom: '35px' }}>
            Gain industry-ready skills through hands-on projects, expert mentorship, and real-world semiconductor training. Build the confidence employers look for and prepare for a successful career in the VLSI industry.
          </p>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#fff',
              color: '#073738',
              padding: '16px 45px',
              borderRadius: '30px',
              fontSize: '1.15rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 25px rgba(0,0,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)'; }}
            >
              Enroll Today & Secure Your Future
            </button>
          </Link>
        </div>
      </div>

      <div className='faqDiv' style={{
        padding: '60px 5%',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <FeatureParticles theme="light" />
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto',
          gap: '40px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Left Column: Image & Heading */}
          <div style={{
            flex: '1 1 400px',
            textAlign: 'center'
          }}>
            <h1 style={{ color: '#073738', marginBottom: '10px' }}>Have Doubts?</h1>
            <h2 style={{ color: '#00C6A0', marginBottom: '30px' }}>Read Our FAQs</h2>
            <img 
              src={faqImage} 
              alt="FAQ Illustration" 
              style={{ 
                width: '100%', 
                maxWidth: '350px', 
                objectFit: 'contain', 
                borderRadius: '30px',
                border: '6px solid #fff',
                boxShadow: '0 20px 50px rgba(0, 198, 160, 0.2), 0 5px 15px rgba(0,0,0,0.05)',
                transition: 'transform 0.4s ease'
              }} 
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            />
          </div>

          <FaqAccordion />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
