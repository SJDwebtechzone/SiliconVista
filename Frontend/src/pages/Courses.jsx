import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './course.css';
import Footer from '../Components/Footer';
import { Helmet } from "react-helmet-async";
import { Modal, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaClock, FaGraduationCap, FaChevronDown, FaChevronUp, FaAngleRight } from 'react-icons/fa';

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
        await axios.post('/api/brochure/download', {
          ...brochureFormData,
          brochureTitle: selectedBrochure.title
        });
        
        // Trigger actual download instead of opening a popup tab
        const link = document.createElement('a');
        link.href = `http://localhost:8080/${selectedBrochure.file_url}`;
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
          const { data } = await axios.get('http://localhost:8080/api/brochure');
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
            <title>VLSI Courses | SiliconVista – Design Verification & Chip Design Training</title>

            <meta 
              name="description" 
              content="Explore SiliconVista’s VLSI courses including Design Verification, UVM, internships, and semiconductor fundamentals. Learn with real-time tools and industry experts."
            />


            <meta name="keywords" content="
                vlsi courses online,
                systemverilog course syllabus,
                uvm full course online,
                vlsi design verification course india,
                best vlsi course for freshers,
                online vlsi internship,
                chip design course online,
                advanced vlsi course,
                semiconductor course online,
                vlsi professional training,
                vlsi real-time project course,
                learn uvm online,
                learn systemverilog from scratch,
                vlsi design course with placement,
                industry-ready vlsi course,
                online digital electronics course,
                asic verification course,
                rtl design course online,
                top vlsi training courses,
                vlsi verification engineer training,
                verification and validation course,
                vlsi testing course,
                complete vlsi course package
            " />



            <link rel="canonical" href="https://siliconvista.in/courses" />

            
            <meta property="og:title" content="VLSI Courses – Learn Chip Design & Verification" />
            <meta property="og:description" content="Hands-on VLSI courses with real-time industry tools and expert-led sessions." />
            <meta property="og:image" content="https://siliconvista.in/og-courses.png" />
            <meta property="og:url" content="https://siliconvista.in/courses" />

            
            <meta name="twitter:card" content="summary_large_image" />
      </Helmet>


      <div className='courseHero'>
        <div className='heroContent'>
          <h1>Comprehensive VLSI Design Verification Course</h1>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '80px 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
          
          {/* Main Content Column */}
          <div style={{ flex: '1 1 700px', background: '#fff', padding: '50px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)' }}>
            <h1 style={{ color: '#112240', fontSize: '2.2rem', fontWeight: '800', marginBottom: '25px', lineHeight: '1.3' }}>
              Professional Development Program in <span style={{ color: '#2196F3' }}>VLSI Design Verification</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
              Our VLSI Design Verification Professional Development Program is a comprehensive, industry-focused training designed to prepare engineers for careers in the global semiconductor industry.
            </p>

            <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
              The course is carefully structured with the right balance of in-depth classroom sessions and extensive hands-on lab projects, enabling graduates to transition into skilled verification professionals.
            </p>

            <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.8', marginBottom: '40px' }}>
              The program is designed to address the growing demand for VLSI Design Verification engineers, equipping learners with both theoretical fundamentals and practical expertise required by today’s semiconductor companies.
            </p>

            <h2 style={{ color: '#112240', fontSize: '1.8rem', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
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
                        <FaCheckCircle color="#00C6A0" size={20} flexShrink={0} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
          </div>

          {/* Sidebar / Info Column */}
          <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            <div style={{ background: 'linear-gradient(135deg, #00C6A0, #2196F3, #7A1FA2)', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', color: 'white' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '30px', color: '#fff' }}>Salient Features</h2>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                        <FaClock size={24} />
                    </div>
                    <div>
                        <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '1.1rem', fontWeight: '700' }}>Course Duration</h4>
                        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem' }}>4 Months</p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                        <FaGraduationCap size={24} />
                    </div>
                    <div>
                        <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '1.1rem', fontWeight: '700' }}>Eligibility</h4>
                        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', lineHeight: '1.5' }}>
                            Engineering Degree in ECE, EEE, CSE, E&I, or equivalent Master’s Engineering programs
                        </p>
                    </div>
                </div>
            </div>

            {/* Dynamic Brochures Section */}
            {brochures.length > 0 && (
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)' }}>
                <h2 style={{ color: '#112240', fontSize: '1.8rem', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '25px', height: '25px', background: 'linear-gradient(135deg, #00C6A0, #2196F3)', borderRadius: '5px' }}></div>
                    Download Brochure
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {brochures.map(bro => (
                    <div key={bro.id} style={{
                      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                      transition: 'transform 0.3s ease',
                      border: '1px solid rgba(0, 198, 160, 0.2)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #00C6A0, #2196F3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '22px',
                        marginRight: '15px',
                        flexShrink: 0
                      }}>
                        📄
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.15rem', color: '#112240', fontWeight: '800' }}>{bro.title}</h4>
                        <span style={{ fontSize: '0.85rem', color: '#555', backgroundColor: '#e2e8f0', padding: '5px 12px', borderRadius: '20px', fontWeight: '600' }}>
                          {bro.file_size || 'Unknown Size'}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedBrochure(bro);
                          setShowBrochureModal(true);
                        }}
                        style={{
                          background: 'linear-gradient(90deg, #00C6A0, #2196F3)',
                          color: 'white',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '20px',
                          fontWeight: '700',
                          fontSize: '0.9rem',
                          marginLeft: '15px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 4px 10px rgba(0,198,160,0.2)',
                          transition: 'transform 0.2s'
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
        <div style={{ backgroundColor: '#fff', padding: '80px 5%' }} id='cd'>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ color: '#112240', fontSize: '2.5rem', fontWeight: '800', marginBottom: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              Course Content
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
                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: isActive ? '#2196F3' : '#112240', display: 'flex', alignItems: 'center', gap: '15px' }}>
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
