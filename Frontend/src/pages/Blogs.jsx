import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Components/Footer';
import { FaCalendarAlt, FaUser, FaClock, FaBookOpen } from 'react-icons/fa';

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
      
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #00C6A0, #2196F3, #7A1FA2)', 
        padding: '100px 5% 60px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative background elements */}
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '300px', height: '300px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', filter: 'blur(50px)' }}></div>
        
        <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '20px', position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          Silicon Vista <span style={{ color: '#fff', opacity: 0.9 }}>Insights</span>
        </h1>
        <p style={{ color: '#fff', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1, textShadow: '0 1px 3px rgba(0,0,0,0.3)', fontWeight: '500' }}>
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
                  
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#112240', marginBottom: '15px', lineHeight: '1.4' }}>
                    {blog.title}
                  </h3>
                  
                  <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '25px', flex: 1 }}>
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
