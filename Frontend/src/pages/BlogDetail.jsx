import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Components/Footer';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaImage } from 'react-icons/fa';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#666' }}>
            <div style={{ display: 'inline-block', width: '50px', height: '50px', border: '5px solid #f3f3f3', borderTop: '5px solid #2196F3', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <h3 style={{ marginTop: '20px', color: '#2196F3' }}>Loading Blog...</h3>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, padding: '100px 5%', textAlign: 'center' }}>
          <h1 style={{ color: '#112240', fontSize: '3rem', fontWeight: '800' }}>Blog Not Found</h1>
          <p style={{ color: '#666', fontSize: '1.2rem', marginTop: '20px' }}>The blog you are looking for does not exist or has been removed.</p>
          <button 
            onClick={() => navigate('/blogs')} 
            style={{ marginTop: '30px', background: '#2196F3', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Back to Blogs
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Article Header & Image */}
      <div style={{ 
        background: '#fff',
        borderBottom: '1px solid #eaeaea'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 5% 40px' }}>
          <button 
            onClick={() => navigate('/blogs')} 
            style={{ 
              background: 'transparent', 
              color: '#2196F3', 
              border: 'none', 
              fontWeight: '700', 
              fontSize: '1rem', 
              padding: 0, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '30px'
            }}
          >
            <FaArrowLeft /> Back to all insights
          </button>
          
          <h1 style={{ color: '#112240', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '25px' }}>
            {blog.title}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#666', fontSize: '1rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00C6A0' }}>
                <FaUser />
              </div>
              <span style={{ fontWeight: '600', color: '#333' }}>{blog.author || 'Silicon Vista Expert'}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
              <FaCalendarAlt />
              {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {blog.cover_image_url && (
          <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 5% 40px' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img 
                src={`http://localhost:8080/${blog.cover_image_url}`} 
                alt={blog.title} 
                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', display: 'block' }} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Article Content */}
      <div style={{ flex: 1, padding: '60px 5%', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        
        {blog.description && !blog.content && (
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#333', marginBottom: '30px', fontWeight: '500' }}>
            {blog.description}
          </p>
        )}

        <div style={{ 
          fontSize: '1.15rem', 
          lineHeight: '1.9', 
          color: '#444',
          whiteSpace: 'pre-wrap', // Preserves line breaks from the textarea
        }}>
          {blog.content || "This blog post doesn't have detailed content yet."}
        </div>
        
        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
          <h3 style={{ color: '#112240', marginBottom: '20px' }}>Share this insight</h3>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            {['Twitter', 'LinkedIn', 'Facebook'].map(social => (
              <button key={social} style={{ 
                background: '#fff', 
                border: '1px solid #ddd', 
                padding: '10px 20px', 
                borderRadius: '50px', 
                color: '#555',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2196F3'; e.currentTarget.style.color = '#2196F3'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; }}
              >
                {social}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
