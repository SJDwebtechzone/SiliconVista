import React, { useState } from "react";
import "./contact.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

import Footer from "../Components/Footer.jsx";
import { useContact } from "../context/ContactContext.jsx";

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
                <title>Contact Us | SiliconVista – VLSI Training & Internship Queries</title>
                <meta 
                    name="description" 
                    content="Contact SiliconVista for VLSI course details, internship programs, fees, and enrollment queries. Available via email, phone, and WhatsApp."
                />
                <meta name="keywords" content="
                        siliconvista contact,
                        vlsi training in chennai,
                        vlsi coaching institute india,
                        contact vlsi institute,
                        best vlsi institute near me,
                        online vlsi course support,
                        vlsi classes enquiry,
                        vlsi admission helpline,
                        semiconductor training institute contact,
                        vlsi internship contact,
                        systemverilog course enquiry,
                        online technical training support,
                        chip design course india contact,
                        vlsi career guidance,
                        uvm training india
                " />
                <link rel="canonical" href="https://siliconvista.in/contact" />
                <meta property="og:title" content="Contact SiliconVista – Get VLSI Course Info" />
                <meta property="og:image" content="https://siliconvista.in/og-contact.png" />
                <meta property="og:url" content="https://siliconvista.in/contact" />
            </Helmet>

            {/* Hero Section */}
            <div style={{ 
              background: 'linear-gradient(135deg, #00C6A0, #2196F3, #7A1FA2)', 
              padding: '100px 5% 60px', 
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              marginTop: '60px' // Adjust for navbar
            }}>
              <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
              <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '300px', height: '300px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', filter: 'blur(50px)' }}></div>
              
              <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px', position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                Get In <span style={{ color: '#fff', opacity: 0.9 }}>Touch</span>
              </h1>
              <p style={{ color: '#fff', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1, textShadow: '0 1px 3px rgba(0,0,0,0.3)', fontWeight: '500' }}>
                We're here to answer any questions about our VLSI courses, internships, and career guidance. Let's build your semiconductor career together.
              </p>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: '60px 5%', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
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
                        <h2 style={{ color: '#112240', fontSize: '2rem', fontWeight: '800', marginBottom: '10px' }}>Register Here</h2>
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
                        justifyContent: 'center'
                    }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '40px', color: '#fff' }}>Contact Details</h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                    <FaEnvelope size={24} />
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '1.1rem', fontWeight: '700' }}>Email Us</h4>
                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>info@siliconvista.in</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                    <FaPhoneAlt size={24} />
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '1.1rem', fontWeight: '700' }}>Call Us</h4>
                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>+91 79045 13540</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                    <FaMapMarkerAlt size={24} />
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '1.1rem', fontWeight: '700' }}>Visit Us</h4>
                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: '1.5' }}>
                                        No: 44, Venugopalapuram 4th street<br />
                                        Iyyappanthangal, Chennai
                                    </p>
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
