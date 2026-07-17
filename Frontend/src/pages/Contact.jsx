import React, { useState } from "react";
import "./contact.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

import Footer from "../Components/Footer.jsx";
import { useContact } from "../context/ContactContext.jsx";
import ParticleBackground from "../Components/ParticleBackground.jsx";

const Contact = () => {
    const { sendEnquiry, loading, successMsg, errorMsg } = useContact();

    const [formFields, setFormfields] = useState({
        userName: "",
        email: "",
        phone: "",
        message: "",
        course: "",
        duration: ""
    });

    const handleFields = (e) => {
        const { name, value } = e.target;
        setFormfields((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await sendEnquiry(formFields);

      if(result.ok){
        setFormfields({
              userName: "",
              email: "",
              phone: "",
              message: "",
              course:"",
              duration:""
        })
      }
    }

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            <Helmet>
                <title>Contact Silicon Vista | VLSI Institute Chennai</title>
                <meta name="description" content="Contact Silicon Vista, the top VLSI Institute in Chennai. Visit our Tiruvallur training centre for admission enquiries or book a free demo session today." />
                <meta name="keywords" content="Contact Silicon Vista, VLSI Institute Chennai, Training Centre Tiruvallur, Admission Enquiry, Book Free Demo" />
                <link rel="canonical" href="https://siliconvista.com/contact" />

                {/* OpenGraph */}
                <meta property="og:title" content="Contact Silicon Vista | VLSI Institute Chennai" />
                <meta property="og:description" content="Reach out for admission enquiries or book a free demo today." />
                <meta property="og:image" content="https://siliconvista.com/og-contact.png" />
                <meta property="og:url" content="https://siliconvista.com/contact" />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Silicon Vista | VLSI Institute Chennai" />
                <meta name="twitter:description" content="Reach out for admission enquiries or book a free demo today." />
                <meta name="twitter:image" content="https://siliconvista.com/og-contact.png" />

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

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: '120px 5% 60px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    background: '#fff', 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    boxShadow: '0 20px 50px rgba(0,0,0,0.08)' 
                }}>
                    
                    {/* Form Section */}
                    <div style={{ flex: '1 1 500px', padding: '50px' }}>
                        <h2 style={{ color: '#112240', marginBottom: '10px' }}>Register Here</h2>
                        <p style={{ color: '#666', marginBottom: '30px' }}>Fill out the form below and our team will get back to you shortly.</p>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Control
                                    type="text"
                                    name="userName"
                                    onChange={handleFields}
                                    value={formFields.userName}
                                    placeholder="Enter Name"
                                    required
                                    style={{ padding: '15px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', backgroundColor: '#f9f9f9', fontSize: '16px' }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={handleFields}
                                    value={formFields.email}
                                    placeholder="Enter Email"
                                    required
                                    style={{ padding: '15px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', backgroundColor: '#f9f9f9', fontSize: '16px' }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Control
                                    type="number"
                                    name="phone"
                                    onChange={handleFields}
                                    value={formFields.phone}
                                    placeholder="Enter Phone Number"
                                    required
                                    style={{ padding: '15px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', backgroundColor: '#f9f9f9', fontSize: '16px' }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Select
                                    name="course"
                                    value={formFields.course || ""}
                                    onChange={handleFields}
                                    required
                                    style={{ padding: '15px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', backgroundColor: '#f9f9f9', fontSize: '16px', color: formFields.course ? '#333' : '#6c757d' }}
                                >
                                    <option value="" disabled>Select Program</option>
                                    <option value="Internship">Internship</option>
                                    <option value="VLSI Design Course">VLSI Design Course</option>
                                </Form.Select>
                            </Form.Group>

                            {formFields.course === "Internship" && (
                                <Form.Group className="mb-4" style={{ animation: 'fadeIn 0.3s ease' }}>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="duration"
                                        onChange={handleFields}
                                        value={formFields.duration || ""}
                                        placeholder="Enter The Duration (e.g., 3 months)"
                                        style={{ padding: '15px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', backgroundColor: '#f9f9f9', fontSize: '16px' }}
                                    />
                                </Form.Group>
                            )}

                            <Form.Group className="mb-4">
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="message"
                                    onChange={handleFields}
                                    value={formFields.message}
                                    placeholder="Enter Message"
                                    required
                                    style={{ padding: '15px 20px', borderRadius: '12px', border: '1px solid #e0e0e0', backgroundColor: '#f9f9f9', fontSize: '16px', resize: 'vertical' }}
                                />
                            </Form.Group>

                            <Button 
                              type="submit" 
                              disabled={loading}
                              style={{ 
                                width: '100%', 
                                padding: '15px', 
                                borderRadius: '12px', 
                                background: 'linear-gradient(90deg, #00C6A0, #2196F3)', 
                                border: 'none', 
                                fontWeight: '700', 
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(33, 150, 243, 0.3)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                                {loading ? "Sending..." : <><FaPaperPlane /> Submit Application</>}
                            </Button>

                            {successMsg && <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '12px', fontWeight: '600', textAlign: 'center' }}>{successMsg}</div>}
                            {errorMsg && <div style={{ marginTop: '20px', padding: '15px', background: '#ffebee', color: '#c62828', borderRadius: '12px', fontWeight: '600', textAlign: 'center' }}>{errorMsg}</div>}
                        </Form>
                    </div>

                    {/* Contact Details Section */}
                    <div style={{ 
                        flex: '1 1 350px', 
                        background: 'linear-gradient(135deg, #00C6A0, #2196F3, #7A1FA2)', 
                        padding: '50px', 
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <ParticleBackground />
                        
                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ marginBottom: '40px', color: '#fff', textAlign: 'left' }}>Contact Details</h2>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{ margin: '0 0 15px 0', color: '#fff', textAlign: 'left' }}>Email Us</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                        <FaEnvelope size={24} />
                                    </div>
                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>info@siliconvista.in</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{ margin: '0 0 15px 0', color: '#fff', textAlign: 'left' }}>Call Us</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                        <FaPhoneAlt size={24} />
                                    </div>
                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>+91 79045 13540</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{ margin: '0 0 15px 0', color: '#fff', textAlign: 'left' }}>Visit Us</h4>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                        <FaMapMarkerAlt size={24} />
                                    </div>
                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: '1.5', paddingTop: '10px' }}>
                                        No: 44, Venugopalapuram<br />
                                        4th street Iyyappanthangal,<br />
                                        Chennai
                                    </p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Contact;
