import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Components/Footer';
import { FaCalendarAlt, FaUser, FaClock, FaBookOpen } from 'react-icons/fa';
import bannerImg from '../assets/blog-banner.png';
import { Helmet } from "react-helmet-async";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/blogs');
        // Only show published blogs
        const publishedBlogs = response.data.filter(b => b.is_published);
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Helmet>
        <title>VLSI Blogs & Semiconductor News | Silicon Vista</title>
        <meta name="description" content="Read the latest VLSI blogs, semiconductor news, and chip design articles. Get expert career guidance and verification tutorials from Silicon Vista." />
        <meta name="keywords" content="VLSI Blogs, Semiconductor News, Chip Design Articles, Verification Tutorials, Career Guidance, Latest Semiconductor Technology" />
        <link rel="canonical" href="https://siliconvista.com/blogs" />

        {/* OpenGraph */}
        <meta property="og:title" content="VLSI Blogs & Semiconductor News | Silicon Vista" />
        <meta property="og:description" content="Read the latest VLSI blogs, semiconductor news, and chip design articles. Get expert career guidance and verification tutorials." />
        <meta property="og:url" content="https://siliconvista.com/blogs" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VLSI Blogs & Semiconductor News | Silicon Vista" />
        <meta name="twitter:description" content="Read the latest VLSI blogs, semiconductor news, and chip design articles. Get expert career guidance and verification tutorials." />
      </Helmet>
      
      {/* Hero Section */}
      <div style={{ 
        background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${bannerImg}) center/cover no-repeat`,
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 5%',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '60px' // Adjust for navbar
      }}>
        
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
          Silicon Vista <span style={{ color: '#ffffff' }}>Insights</span>
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
          Discover the latest trends in VLSI, semiconductor engineering, career advice, and industry news written by our expert mentors.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '60px 5%', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#666' }}>
            <div style={{ display: 'inline-block', width: '50px', height: '50px', border: '5px solid #f3f3f3', borderTop: '5px solid #2196F3', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <h3 style={{ marginTop: '20px', color: '#2196F3' }}>Loading Insights...</h3>
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '100px 20px', 
            background: '#fff', 
            borderRadius: '24px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid rgba(33, 150, 243, 0.1)'
          }}>
            <FaBookOpen style={{ fontSize: '80px', color: '#e0e0e0', marginBottom: '30px' }} />
            <h2 style={{ color: '#112240', fontSize: '2.5rem', fontWeight: '800', marginBottom: '15px' }}>Blogs Coming Soon!</h2>
            <p style={{ color: '#666', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Our industry experts are currently writing top-tier semiconductor and VLSI articles. 
              Check back very soon for deep technical insights, career roadmaps, and more!
            </p>
            <div style={{ marginTop: '40px', width: '80px', height: '4px', background: 'linear-gradient(90deg, #00C6A0, #2196F3)', margin: '40px auto 0', borderRadius: '2px' }}></div>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '40px' 
          }}>
            {blogs.map(blog => (
              <div key={blog.id} style={{ 
                background: '#fff', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(33, 150, 243, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)';
              }}
              >
                <div style={{ height: '220px', background: '#f5f5f5', overflow: 'hidden' }}>
                  {blog.cover_image_url ? (
                    <img src={`http://localhost:8080/${blog.cover_image_url}`} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                         onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                         onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0e0e0, #f5f5f5)' }}>
                      <FaBookOpen style={{ fontSize: '50px', color: '#ccc' }} />
                    </div>
                  )}
                </div>

                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#888', fontSize: '0.9rem', marginBottom: '15px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaCalendarAlt color="#2196F3" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                    {blog.author && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaUser color="#00C6A0" /> {blog.author}</span>}
                  </div>
                  
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#112240', marginBottom: '15px', lineHeight: '1.4' }}>
                    {blog.title}
                  </h3>
                  
                  <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '25px', flex: 1, textAlign: 'justify' }}>
                    {blog.description ? blog.description : (blog.content && blog.content.substring(0, 100) + '...')}
                  </p>
                  
                  <button onClick={() => navigate(`/blogs/${blog.id}`)} style={{ 
                    alignSelf: 'flex-start',
                    background: 'transparent', 
                    color: '#2196F3', 
                    border: 'none', 
                    fontWeight: '700', 
                    fontSize: '1rem', 
                    padding: 0, 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#00C6A0'}
                  onMouseLeave={e => e.currentTarget.style.color = '#2196F3'}
                  >
                    Read More <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;
