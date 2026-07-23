import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './course.css';
import Footer from '../Components/Footer';
import { Helmet } from "react-helmet-async";
import { Modal, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaClock, FaGraduationCap, FaChevronDown, FaChevronUp, FaAngleRight, FaLaptop } from 'react-icons/fa';
import FeatureParticles from '../Components/FeatureParticles';

const Courses = () => {

    const [activeIndex , setActiveIndex] = useState(null);

    const [courseContent, setCourseContent] = useState([]);
    const [brochures, setBrochures] = useState([]);
    const [loading, setLoading] = useState(true);

    // Brochure Modal States
    const [showBrochureModal, setShowBrochureModal] = useState(false);
    const [selectedBrochure, setSelectedBrochure] = useState(null);
    const [brochureFormData, setBrochureFormData] = useState({
      name: '',
      email: '',
      phone: '',
      qualification: '',
      profile: '',
      graduationYear: ''
    });
    const [submittingBrochure, setSubmittingBrochure] = useState(false);
    const [brochureError, setBrochureError] = useState('');

    const handleBrochureSubmit = async (e) => {
      e.preventDefault();
      setSubmittingBrochure(true);
      setBrochureError('');
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/brochure/download`, {
          ...brochureFormData,
          brochureTitle: selectedBrochure.title
        });
        
        // Trigger actual download instead of opening a popup tab
        const link = document.createElement('a');
        link.href = `${import.meta.env.VITE_FILE_BASE_URL}/${selectedBrochure.file_url}`;
        link.setAttribute('download', selectedBrochure.title || 'brochure');
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset and close
        setShowBrochureModal(false);
        setBrochureFormData({
          name: '', email: '', phone: '', qualification: '', profile: '', graduationYear: ''
        });
      } catch (err) {
        setBrochureError(err.response?.data?.message || 'Error processing request. Please try again.');
      } finally {
        setSubmittingBrochure(false);
      }
    };

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const { data } = await axios.get('/api/course-sections');
          setCourseContent(data);
        } catch (error) {
          console.error("Error fetching course content:", error);
        } finally {
          setLoading(false);
        }
      };

      const fetchBrochures = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/brochure`);
          setBrochures(data.filter(b => b.is_active));
        } catch (error) {
          console.error("Error fetching brochures:", error);
        }
      };

      fetchCourses();
      fetchBrochures();
    }, []);
    
  return (
    <div className='course' >

      <Helmet>
        <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "VLSI Courses - SiliconVista",
              "url": "https://siliconvista.in/courses",
              "itemListElement": [
                {
                  "@type": "Course",
                  "position": 1,
                  "name": "VLSI Design Verification Course",
                  "description": "Industry-oriented online VLSI Design Verification course covering SystemVerilog, UVM, testbenches, and real-time projects.",
                  "provider": {
                    "@type": "EducationalOrganization",
                    "name": "SiliconVista",
                    "url": "https://siliconvista.in"
                  }
                },
                {
                  "@type": "Course",
                  "position": 2,
                  "name": "VLSI Internship Program",
                  "description": "Hands-on VLSI internship with real semiconductor projects, mentor-led learning, and industry exposure.",
                  "provider": {
                    "@type": "EducationalOrganization",
                    "name": "SiliconVista",
                    "url": "https://siliconvista.in"
                  }
                }
              ]
            }
            `}
        </script>
      </Helmet>



        <Helmet>
          <title>VLSI Courses | Design Verification & ASIC | Silicon Vista</title>
          <meta name="description" content="Explore premium VLSI courses at Silicon Vista. Master Design Verification, SystemVerilog, UVM, and ASIC Verification with our job-oriented career programs." />
          <meta name="keywords" content="VLSI Courses, Design Verification, SystemVerilog, UVM, ASIC Verification, RTL Design, Career Programs" />
          <link rel="canonical" href="https://siliconvista.com/courses" />

          {/* OpenGraph */}
          <meta property="og:title" content="Premium VLSI & Design Verification Courses" />
          <meta property="og:description" content="Master SystemVerilog, UVM, and ASIC Verification with our job-oriented career programs." />
          <meta property="og:image" content="https://siliconvista.com/og-courses.png" />
          <meta property="og:url" content="https://siliconvista.com/courses" />
          <meta property="og:type" content="website" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Premium VLSI & Design Verification Courses" />
          <meta name="twitter:description" content="Master SystemVerilog, UVM, and ASIC Verification with our job-oriented career programs." />
          <meta name="twitter:image" content="https://siliconvista.com/og-courses.png" />

          {/* Structured Data: Course */}
          <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "VLSI Design Verification Professional Development Program",
              "description": "Comprehensive, industry-focused training designed to prepare engineers for careers in the global semiconductor industry, covering SystemVerilog and UVM.",
              "provider": {
                "@type": "EducationalOrganization",
                "name": "Silicon Vista",
                "sameAs": "https://siliconvista.com/"
              },
              "courseMode": ["online", "offline"],
              "educationalCredentialAwarded": "Certificate of Completion",
              "offers": {
                "@type": "Offer",
                "category": "Paid"
              }
            }
            `}
          </script>
        </Helmet>


      <div className='courseHero'>
        <div className='heroContent'>
          <h1>Comprehensive <span>VLSI Design Verification</span> Course</h1>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '80px 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '50px' }}>
          
          {/* Main Content Column */}
          <div style={{ width: '100%', background: '#fff', padding: '50px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)' }}>
            <h1 style={{ color: '#112240', marginBottom: '25px' }}>
              Professional Development Program in <span style={{ color: '#2196F3' }}>VLSI Design Verification</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify' }}>
              Our VLSI Design Verification Professional Development Program is a comprehensive, industry-focused training designed to prepare engineers for careers in the global semiconductor industry.
            </p>

            <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify' }}>
              The course is carefully structured with the right balance of in-depth classroom sessions and extensive hands-on lab projects, enabling graduates to transition into skilled verification professionals.
            </p>

            <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.8', marginBottom: '40px', textAlign: 'justify' }}>
              The program is designed to address the growing demand for VLSI Design Verification engineers, equipping learners with both theoretical fundamentals and practical expertise required by today’s semiconductor companies.
            </p>

            <h2 style={{ color: '#112240', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '4px', background: 'linear-gradient(90deg, #00C6A0, #2196F3)', borderRadius: '4px' }}></div>
                What Makes This Course Stand Out
            </h2>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                    "Strong foundation in Digital Design and Verilog",
                    "Coverage of state-of-the-art VLSI verification concepts",
                    "Extensive training in SystemVerilog and UVM",
                    "Training delivered by experienced industry professionals",
                    "Hands-on project experience using advanced technologies"
                ].map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1.1rem', color: '#444', background: '#f8f9fa', padding: '15px 20px', borderRadius: '12px' }}>
                        <FaCheckCircle color="#00C6A0" size={20} style={{ flexShrink: 0 }} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
          </div>

          {/* Features and Brochures Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '50px' }}>
            
            <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #00C6A0, #2196F3, #7A1FA2)', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', color: 'white' }}>
                <FeatureParticles />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ marginBottom: '30px', color: '#fff' }}>Salient Features</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                <FaClock size={24} />
                            </div>
                            <h4 style={{ margin: 0, color: '#fff' }}>Course Duration</h4>
                        </div>
                        <p style={{ margin: '0 0 0 70px', color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem' }}>4 Months</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                <FaGraduationCap size={24} />
                            </div>
                            <h4 style={{ margin: 0, color: '#fff' }}>Eligibility</h4>
                        </div>
                        <p style={{ margin: '0 0 0 70px', color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', lineHeight: '1.5' }}>
                            Engineering Degree in ECE, EEE, CSE, E&I, or equivalent Master’s Engineering programs
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                <FaLaptop size={24} />
                            </div>
                            <h4 style={{ margin: 0, color: '#fff' }}>Mode of Training</h4>
                        </div>
                        <p style={{ margin: '0 0 0 70px', color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', lineHeight: '1.5' }}>
                            Offline / Online courses available
                        </p>
                    </div>
                </div>
            </div>

            {/* Dynamic Brochures Section */}
            {brochures.length > 0 && (
              <div style={{ background: '#fff', padding: 'clamp(18px, 5vw, 40px)', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)' }}>
                <h2 style={{ color: '#112240', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '25px', height: '25px', background: 'linear-gradient(135deg, #00C6A0, #2196F3)', borderRadius: '5px' }}></div>
                    Download Brochure
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {brochures.map(bro => (
                    <div key={bro.id} className="brochure-card"
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div className="brochure-icon">
                        📄
                      </div>
                      <div className="brochure-info">
                        <h4 style={{ margin: '0 0 8px 0', color: '#112240', fontSize: '1.2rem', textAlign: 'left' }}>{bro.title}</h4>
                        <span style={{ fontSize: '0.85rem', color: '#555', backgroundColor: '#e2e8f0', padding: '5px 12px', borderRadius: '20px', fontWeight: '600' }}>
                          {bro.file_size || 'Unknown Size'}
                        </span>
                      </div>
                      <button 
                        className="brochure-btn"
                        onClick={() => {
                          setSelectedBrochure(bro);
                          setShowBrochureModal(true);
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
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

      <div style={{ backgroundColor: '#fff', padding: '80px 5%' }} id='cd'>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <span style={{ background: 'linear-gradient(90deg, #00C6A0, #2196F3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Course Content</span>
              <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #00C6A0, #2196F3)', borderRadius: '4px' }}></div>
            </h1>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: '#f8f9fa', borderRadius: '16px' }}>
                <Spinner animation="border" style={{ color: '#2196F3' }} />
                <p style={{ marginTop: '15px', color: '#666', fontWeight: '600' }}>Loading course modules...</p>
              </div>
            ) : courseContent.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {courseContent.map((course, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div key={course.id || index} style={{
                      background: '#fff',
                      borderRadius: '16px',
                      boxShadow: isActive ? '0 15px 35px rgba(0,0,0,0.08)' : '0 5px 15px rgba(0,0,0,0.04)',
                      border: '1px solid #eee',
                      borderLeft: isActive ? '4px solid #2196F3' : '4px solid transparent',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}>
                      {/* Accordion Header */}
                      <div 
                        onClick={() => setActiveIndex(isActive ? null : index)}
                        style={{
                          padding: '25px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          background: isActive ? '#f8faff' : '#fff',
                          transition: 'background 0.3s'
                        }}
                      >
                        <h3 style={{ margin: 0, color: isActive ? '#2196F3' : '#112240', display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <span style={{ 
                            background: isActive ? 'linear-gradient(135deg, #00C6A0, #2196F3)' : '#f0f0f0', 
                            color: isActive ? '#fff' : '#666', 
                            width: '35px', 
                            height: '35px', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            fontSize: '1rem',
                            flexShrink: 0 
                          }}>
                            {index + 1}
                          </span>
                          {course.title}
                        </h3>
                        <div style={{ color: isActive ? '#2196F3' : '#999', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600', transition: 'color 0.3s' }}>
                          <span className="d-none d-sm-inline">{isActive ? "Hide Modules" : "See Modules"}</span>
                          {isActive ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                        </div>
                      </div>

                      {/* Accordion Body */}
                      <div style={{
                        maxHeight: isActive ? '1000px' : '0',
                        opacity: isActive ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.5s ease-in-out, opacity 0.4s ease-in-out',
                        background: '#fafafa',
                        borderTop: isActive ? '1px solid #eee' : 'none'
                      }}>
                        <div style={{ padding: '25px 25px 25px 75px' }}>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {course.CourseSectionItems && course.CourseSectionItems.map((module) => (
                              <li key={module.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1.05rem', color: '#444' }}>
                                <FaAngleRight color="#00C6A0" style={{ marginTop: '5px', flexShrink: 0 }} />
                                <span>{module.content}</span>
                              </li>
                            ))}
                            {(!course.CourseSectionItems || course.CourseSectionItems.length === 0) && (
                              <li style={{ fontStyle: 'italic', color: '#888', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                No modules added yet.
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', background: '#f8f9fa', borderRadius: '16px' }}>
                <p style={{ margin: 0, color: '#666', fontWeight: '600', fontSize: '1.1rem' }}>Course content will be updated soon.</p>
              </div>
            )}
          </div>
        </div>


    <Footer />
    
    {/* Brochure Download Form Modal */}
    <Modal show={showBrochureModal} onHide={() => setShowBrochureModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#073738', fontWeight: 'bold' }}>
          Download {selectedBrochure?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted mb-4">Please fill out this quick form to receive your brochure.</p>
        
        {brochureError && <Alert variant="danger">{brochureError}</Alert>}

        <Form onSubmit={handleBrochureSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" required value={brochureFormData.name} onChange={(e) => setBrochureFormData({...brochureFormData, name: e.target.value})} placeholder="Enter your full name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email (Gmail) <span className="text-danger">*</span></Form.Label>
            <Form.Control type="email" required value={brochureFormData.email} onChange={(e) => setBrochureFormData({...brochureFormData, email: e.target.value})} placeholder="Enter your email address" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
            <Form.Control type="tel" required value={brochureFormData.phone} onChange={(e) => setBrochureFormData({...brochureFormData, phone: e.target.value})} placeholder="Enter your phone number" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Educational Qualification <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" required value={brochureFormData.qualification} onChange={(e) => setBrochureFormData({...brochureFormData, qualification: e.target.value})} placeholder="e.g., B.E ECE, M.Tech VLSI" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Current Profile <span className="text-danger">*</span></Form.Label>
            <Form.Select required value={brochureFormData.profile} onChange={(e) => setBrochureFormData({...brochureFormData, profile: e.target.value})}>
              <option value="">Select your profile...</option>
              <option value="Student">Student</option>
              <option value="Fresher">Fresher</option>
              <option value="Experienced in IT Industry">Experienced in IT Industry</option>
              <option value="Experienced in Non-IT Industry">Experienced in Non-IT Industry</option>
              <option value="Experienced in Core Electronic">Experienced in Core Electronic</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Graduation Year <span className="text-danger">*</span></Form.Label>
            <Form.Select required value={brochureFormData.graduationYear} onChange={(e) => setBrochureFormData({...brochureFormData, graduationYear: e.target.value})}>
              <option value="">Select graduation year...</option>
              {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + 2 - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button 
            type="submit" 
            className="w-100 fw-bold border-0" 
            style={{ background: 'linear-gradient(90deg, #00C6A0, #2196F3)', padding: '12px' }}
            disabled={submittingBrochure}
          >
            {submittingBrochure ? (
              <><Spinner animation="border" size="sm" className="me-2" /> Processing...</>
            ) : (
              'Download Brochure'
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>

    </div>
  )
}

export default Courses
