import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet-async";
import { FaLaptopCode, FaChalkboardTeacher, FaCertificate, FaBriefcase, FaCheckCircle, FaMicrochip } from 'react-icons/fa';

import Footer from '../Components/Footer.jsx';
import HeroCarousel from '../Components/HeroCarousel.jsx';
import ReviewForm from '../Components/ReviewForm.jsx';
import ReviewSection from '../Components/ReviewSection.jsx';

import descImage from '../assets/desImg.webp';
import faqImage from '../assets/faqImage.png';



const Home = () => {

  const [activeIndex , setActiveIndex] = useState(null);
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

  const faqs = [
  {
    question: "What is VLSI ?",
    answer:
      "VLSI is the technology used to design integrated circuits with millions of transistors."
  },
  {
    question: "Who can study VLSI ?",
    answer:
      "ECE, EEE, CSE students, freshers, and working professionals can study VLSI."
  },
  {
    question: "What is the role of a VLSI Design Engineer ?",
    answer: 
    "A VLSI Design Engineer designs, verifies, and implements chip-level circuits using industry tools for processors, SoCs, and ICs."
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
    <div className='homeDiv' style={{ overflowX: 'hidden', width: '100%' }}>

      <Helmet>
          <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
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
                },
                {
                  "@type": "Question",
                  "name": "Is VLSI a good career?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VLSI is a highly rewarding and future-proof career with strong industry demand, excellent packages, and global opportunities."
                  }
                }
              ]
            }
            `}
          </script>
      </Helmet>


      <Helmet>
          <title>SiliconVista – Online VLSI Training Institute | Hands-On Chip Design & Verification</title>

          <meta 
            name="description" 
            content="SiliconVista offers real-time VLSI training, Design Verification courses, and internship programs with expert 1-on-1 mentoring to build your semiconductor career."
          />

          <meta name="keywords" content="
              vlsi online training,
              vlsi course online,
              vlsi design verification course,
              best vlsi institute in india,
              vlsi internship program,
              systemverilog course online,
              uvm training online,
              online semiconductor courses,
              chip design training,
              vlsi training for freshers,
              vlsi training in chennai,
              vlsi coaching online,
              vlsi hands-on course,
              learn vlsi online from scratch,
              vlsi design engineer course,
              beginner vlsi course,
              vlsi placement training,
              semiconductor online training,
              advanced vlsi verification course,
              real-time vlsi projects,
              mentor-led vlsi training,
              industry-oriented vlsi training,
              chip verification online course,
              vlsi classes for ece students,
              vlsi training platform,
              best vlsi coaching institute,
              online vlsi certification course,
              vlsi design verification online training
          " />

          <link rel="canonical" href="https://siliconvista.in/" />

          {/* OpenGraph */}
          <meta property="og:title" content="SiliconVista – Online VLSI Training Institute" />
          <meta property="og:description" content="Learn VLSI with real-time tools, hands-on projects, and expert mentoring. Build your semiconductor career with SiliconVista." />
          <meta property="og:image" content="https://siliconvista.in/og-home.png" />
          <meta property="og:url" content="https://siliconvista.in/" />
          <meta property="og:type" content="website" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="SiliconVista – Online VLSI Training Institute" />
          <meta name="twitter:description" content="Hands-on VLSI courses built for your semiconductor career growth." />
          <meta name="twitter:image" content="https://siliconvista.in/og-home.png" />

      </Helmet>


    <HeroCarousel />

      <div style={{ backgroundColor: '#f8f9fa', padding: '100px 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '60px' }}>
          
          {/* Left Content Column */}
          <div style={{ flex: '1 1 600px' }}>
            <h1 style={{ color: '#112240', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
              Why You Need to <span style={{ color: '#2196F3' }}>Choose Us?</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.8', marginBottom: '30px' }}>
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
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1.05rem', color: '#444', lineHeight: '1.5' }}>
                  <FaCheckCircle color="#00C6A0" size={20} style={{ marginTop: '4px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px', background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderTop: '4px solid #2196F3', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <FaCertificate size={32} color="#2196F3" style={{ marginBottom: '15px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#112240', marginBottom: '10px' }}>Government Certified</h3>
                <p style={{ fontSize: '0.95rem', color: '#666', margin: 0, lineHeight: '1.5' }}>Trusted certification that adds strong value to your resume.</p>
              </div>

              <div style={{ flex: '1 1 200px', background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderTop: '4px solid #00C6A0', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <FaLaptopCode size={32} color="#00C6A0" style={{ marginBottom: '15px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#112240', marginBottom: '10px' }}>Hands-On Experience</h3>
                <p style={{ fontSize: '0.95rem', color: '#666', margin: 0, lineHeight: '1.5' }}>Work with real industry tools and practical design flows.</p>
              </div>

              <div style={{ flex: '1 1 200px', background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderTop: '4px solid #7A1FA2', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <FaMicrochip size={32} color="#7A1FA2" style={{ marginBottom: '15px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#112240', marginBottom: '10px' }}>Real-Time VLSI Projects</h3>
                <p style={{ fontSize: '0.95rem', color: '#666', margin: 0, lineHeight: '1.5' }}>Gain experience through practical verification & design projects.</p>
              </div>
            </div>

          </div>

          {/* Right Image Column */}
          <div style={{ flex: '1 1 450px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
              <div style={{ position: 'absolute', top: '20px', left: '-20px', width: '100%', height: '100%', background: 'linear-gradient(135deg, #00C6A0, #2196F3)', borderRadius: '24px', zIndex: 0, opacity: 0.2 }}></div>
              <img 
                src={descImage} 
                alt="VLSI design verification training illustration" 
                style={{ width: '100%', height: 'auto', borderRadius: '24px', position: 'relative', zIndex: 1, boxShadow: '0 20px 50px rgba(0,0,0,0.15)', objectFit: 'cover' }}
              />
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

        {/* Animated Semiconductor Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.3, pointerEvents: 'none' }}>
          <div className="circuit-line" style={{ left: '10%', animationDelay: '0s' }}></div>
          <div className="circuit-line" style={{ left: '30%', animationDelay: '1.5s', height: '150%', top: '-25%' }}></div>
          <div className="circuit-line" style={{ left: '70%', animationDelay: '0.8s' }}></div>
          <div className="circuit-line" style={{ left: '90%', animationDelay: '2.2s', height: '120%', top: '-10%' }}></div>
          
          <div className="circuit-line" style={{ top: '20%', left: 0, width: '100%', height: '2px', background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent)', animation: 'none', opacity: 0.5 }}></div>
          <div className="circuit-line" style={{ top: '70%', left: 0, width: '100%', height: '2px', background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent)', animation: 'none', opacity: 0.5 }}></div>

          <div className="circuit-node" style={{ top: '20%', left: '30%' }}></div>
          <div className="circuit-node" style={{ top: '70%', left: '70%', animationDelay: '1s' }}></div>
          <div className="circuit-node" style={{ top: '50%', left: '10%', animationDelay: '0.5s' }}></div>
          <div className="circuit-node" style={{ top: '80%', left: '90%', animationDelay: '1.5s' }}></div>
        </div>

        <div style={{
          flex: '1 1 500px',
          maxWidth: '600px',
          zIndex: 1,
          textAlign: 'left'
        }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: '800', marginBottom: '25px', color: '#fff', lineHeight: '1.2', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            Internship Program
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.15rem)', lineHeight: '1.8', color: '#fff', marginBottom: '35px', textShadow: '0 1px 3px rgba(0,0,0,0.3)', fontWeight: '500' }}>
            We don’t just train — we provide real industry exposure.
            Our students get the opportunity to work on practical VLSI
            projects under the guidance of experienced semiconductor professionals.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: '#fff', lineHeight: '1.5', fontWeight: '500' }}>
              <FaLaptopCode style={{ color: '#fff', fontSize: '1.5rem', marginRight: '15px', marginTop: '3px', flexShrink: 0, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }} />
              <span>Internship on live VLSI projects</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: '#fff', lineHeight: '1.5', fontWeight: '500' }}>
              <FaChalkboardTeacher style={{ color: '#fff', fontSize: '1.5rem', marginRight: '15px', marginTop: '3px', flexShrink: 0, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }} />
              <span>Mentorship from working VLSI engineers</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: '#fff', lineHeight: '1.5', fontWeight: '500' }}>
              <FaCertificate style={{ color: '#fff', fontSize: '1.5rem', marginRight: '15px', marginTop: '3px', flexShrink: 0, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }} />
              <span>Internship certificate upon completion</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: '#fff', lineHeight: '1.5', fontWeight: '500' }}>
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
            <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: '700', color: '#fff', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '15px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              Industry-Backed
            </h2>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: '800', margin: '20px 0', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.3)', lineHeight: '1.2' }}>
              VLSI Internship
            </h1>
            <div style={{ width: '80px', height: '4px', background: '#fff', margin: '25px auto', borderRadius: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
            <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', fontWeight: '600', color: '#fff', letterSpacing: '1px', marginBottom: 0, textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
              Hands-on | Mentor-Led | Real Projects
            </p>
        </div>
      </div>

      <div className='faqDiv' style={{
        padding: '60px 5%',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Left Column: Image & Heading */}
          <div style={{
            flex: '1 1 400px',
            textAlign: 'center'
          }}>
            <h1 style={{ fontSize: '2.5rem', color: '#073738', fontWeight: 'bold', marginBottom: '10px' }}>Have Doubts?</h1>
            <h2 style={{ fontSize: '1.8rem', color: '#00C6A0', marginBottom: '30px' }}>Read Our FAQs</h2>
            <img 
              src={faqImage} 
              alt="FAQ Illustration" 
              style={{ width: '100%', maxWidth: '350px', objectFit: 'contain', dropShadow: '0 10px 20px rgba(0,0,0,0.1)' }} 
            />
          </div>

          {/* Right Column: Accordion */}
          <div style={{
            flex: '1 1 500px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {faqs.map((faq , index) => (
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
        </div>
      </div>

      {/* Career Partners Section */}
      {partners.length > 0 && (
        <div style={{ padding: '40px 5%', background: '#ffffff', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', 
            fontWeight: '700', 
            color: '#073738', 
            marginBottom: '30px' 
          }}>
            Career opportunity and VLSI industry
          </h1>
          <div style={{
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            padding: '10px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <style>
              {`
                @keyframes scrollLeft {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                @keyframes scrollRight {
                  0% { transform: translateX(-50%); }
                  100% { transform: translateX(0); }
                }
                .marquee-content-left {
                  display: flex;
                  gap: 20px;
                  width: max-content;
                  animation: scrollLeft 35s linear infinite;
                }
                .marquee-content-right {
                  display: flex;
                  gap: 20px;
                  width: max-content;
                  animation: scrollRight 35s linear infinite;
                }
                .marquee-content-left:hover, .marquee-content-right:hover {
                  animation-play-state: paused;
                }
              `}
            </style>
            
            {/* Top Row: Right to Left */}
            <div className="marquee-content-left">
              {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                <div key={`top-${partner.id}-${index}`} style={{
                  width: 'clamp(120px, 30vw, 180px)',
                  height: 'clamp(70px, 15vw, 100px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  padding: '10px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {partner.logo_url ? (
                    <img 
                      src={`http://localhost:8080/${partner.logo_url}`} 
                      alt={partner.name} 
                      title={partner.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <span style={{ fontWeight: 'bold', color: '#666', fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>{partner.name}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Row: Left to Right - using a shifted array so logos don't align vertically */}
            <div className="marquee-content-right">
              {[
                ...partners.slice(Math.ceil(partners.length / 2)), 
                ...partners.slice(0, Math.ceil(partners.length / 2)),
                ...partners.slice(Math.ceil(partners.length / 2)), 
                ...partners.slice(0, Math.ceil(partners.length / 2)),
                ...partners.slice(Math.ceil(partners.length / 2)), 
                ...partners.slice(0, Math.ceil(partners.length / 2)),
                ...partners.slice(Math.ceil(partners.length / 2)), 
                ...partners.slice(0, Math.ceil(partners.length / 2))
              ].map((partner, index) => (
                <div key={`bottom-${partner.id}-${index}`} style={{
                  width: 'clamp(120px, 30vw, 180px)',
                  height: 'clamp(70px, 15vw, 100px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  padding: '10px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {partner.logo_url ? (
                    <img 
                      src={`http://localhost:8080/${partner.logo_url}`} 
                      alt={partner.name} 
                      title={partner.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <span style={{ fontWeight: 'bold', color: '#666', fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ReviewSection />
      
      <div style={{ background: '#f8f9fa', paddingBottom: '3rem' }}>
        <ReviewForm />
      </div>

      <Footer />
    </div>
  )
}

export default Home
