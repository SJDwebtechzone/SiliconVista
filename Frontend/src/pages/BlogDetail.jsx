import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Components/Footer';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaImage } from 'react-icons/fa';
import { Helmet } from "react-helmet-async";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`);
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
      
      {blog && (
        <Helmet>
          <title>{blog.title} | Silicon Vista Blog</title>
          <meta name="description" content={blog.excerpt || `Read ${blog.title} on Silicon Vista.`} />
          <meta name="keywords" content="VLSI Blogs, Semiconductor News, Chip Design Articles, Silicon Vista" />
          <link rel="canonical" href={`https://siliconvista.com/blogs/${id}`} />

          {/* OpenGraph */}
          <meta property="og:title" content={`${blog.title} | Silicon Vista`} />
          <meta property="og:description" content={blog.excerpt || `Read ${blog.title} on Silicon Vista.`} />
          {blog.cover_image_url && <meta property="og:image" content={`${import.meta.env.VITE_FILE_BASE_URL}/${blog.cover_image_url}`} />}
          <meta property="og:url" content={`https://siliconvista.com/blogs/${id}`} />
          <meta property="og:type" content="article" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${blog.title} | Silicon Vista`} />
          <meta name="twitter:description" content={blog.excerpt || `Read ${blog.title} on Silicon Vista.`} />
          {blog.cover_image_url && <meta name="twitter:image" content={`${import.meta.env.VITE_FILE_BASE_URL}/${blog.cover_image_url}`} />}

          {/* Structured Data: Article */}
          <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "${blog.title.replace(/"/g, '\\"')}",
              "image": [
                "${blog.cover_image_url ? `${import.meta.env.VITE_FILE_BASE_URL}/${blog.cover_image_url}` : 'https://siliconvista.com/default-blog.png'}"
              ],
              "datePublished": "${blog.created_at}",
              "author": {
                "@type": "Person",
                "name": "${blog.author_name || 'Silicon Vista Expert'}"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Silicon Vista",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://siliconvista.com/logo.png"
                }
              }
            }
            `}
          </script>
        </Helmet>
      )}

      {/* Dynamic Hero Section */}
      <div style={{ 
        background: blog.cover_image_url 
          ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${import.meta.env.VITE_FILE_BASE_URL}/${blog.cover_image_url}) center/cover no-repeat`
          : 'linear-gradient(135deg, #00C6A0, #2196F3, #7A1FA2)',
        padding: '120px 5% 150px',
        textAlign: 'center',
        position: 'relative',
        marginTop: '60px' // Adjust for navbar
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <button 
            onClick={() => navigate('/blogs')} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              color: '#fff', 
              border: '1px solid rgba(255, 255, 255, 0.4)', 
              fontWeight: '600', 
              fontSize: '0.95rem', 
              padding: '8px 16px', 
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '30px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; }}
          >
            <FaArrowLeft /> Back to all insights
          </button>
          
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', lineHeight: '1.3', marginBottom: '30px', textShadow: '0 4px 15px rgba(0,0,0,0.5)', fontFamily: '"Poppins", sans-serif' }}>
            {blog.title}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', color: '#eee', fontSize: '1.05rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00C6A0', backdropFilter: 'blur(5px)' }}>
                <FaUser size={18} />
              </div>
              <span style={{ fontWeight: '600', color: '#fff' }}>{blog.author || 'Silicon Vista Expert'}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2196F3', backdropFilter: 'blur(5px)' }}>
                <FaCalendarAlt size={18} />
              </div>
              {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Article Content Card */}
      <div style={{ 
        flex: 1, 
        padding: '0 5% 80px', 
        maxWidth: '1000px', 
        margin: '0 auto', 
        width: '100%',
        position: 'relative',
        zIndex: 2,
        marginTop: '-80px' // Overlap the hero section
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.1)',
          padding: '60px',
          minHeight: '400px'
        }}>
          {blog.description && !blog.content && (
            <p style={{ fontSize: '1.3rem', lineHeight: '1.9', color: '#222', marginBottom: '40px', fontWeight: '500', fontStyle: 'italic', borderLeft: '4px solid #00C6A0', paddingLeft: '20px', textAlign: 'justify' }}>
              {blog.description}
            </p>
          )}

          <div style={{ 
            fontSize: '1.15rem', 
            lineHeight: '2', 
            color: '#444',
            whiteSpace: 'pre-wrap', 
            fontFamily: '"Poppins", sans-serif',
            textAlign: 'justify'
          }} className="blog-content">
            {blog.content || "This blog post doesn't have detailed content yet."}
          </div>
        </div>
        
      </div>

      <div style={{ height: '50px', background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 100%)', width: '100%', marginTop: 'auto' }}></div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
