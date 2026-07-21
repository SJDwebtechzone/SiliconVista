import React, { useState, useEffect, useRef } from 'react';
import { Card, Spinner, Container } from 'react-bootstrap';
import axios from 'axios';
import { FaStar, FaUserCircle, FaQuoteLeft } from 'react-icons/fa';
import mapBg from '../assets/global-map.png';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // Toggle pause on click
  const [isEnabled, setIsEnabled] = useState(true); // Global toggle setting
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchReviewsAndSettings = async () => {
      try {
        const [reviewsRes, settingsRes] = await Promise.all([
          axios.get('/api/reviews'),
          axios.get('/api/settings/show_review_section').catch(() => ({ data: { value: 'true' } }))
        ]);
        setReviews(reviewsRes.data);
        setIsEnabled(settingsRes.data.value === 'true');
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviewsAndSettings();
  }, []);

  // Auto-scrolling logic
  useEffect(() => {
    let animationFrameId;
    
    const scroll = () => {
      if (!isHovered && !isPaused && scrollRef.current && reviews.length > 0) {
        const { current } = scrollRef;
        current.scrollLeft += 1; // Speed of continuous scroll
        
        // If we reached the end, snap back to 0 seamlessly
        if (current.scrollLeft >= current.scrollWidth - current.clientWidth - 1) {
          current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isPaused, reviews.length]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} size={16} className={i < rating ? "text-warning" : "text-muted opacity-25"} />
    ));
  };

  if (loading) {
    return (
      <div className="py-5 text-center">
        <Spinner animation="grow" variant="info" />
      </div>
    );
  }

  // Hide the section if it is globally disabled or if there are no reviews
  if (!isEnabled || reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-5" style={{ 
      background: `url(${mapBg}) center/cover no-repeat, #f8f9fa`,
      position: 'relative'
    }}>
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-center mb-5">
          <h1 className="mb-3" style={{ color: '#7A1FA2' }}>What Our Students Says</h1>
          <p className="fs-5 fw-medium" style={{ textAlign: 'center', color: '#000' }}>Real experiences from our successful candidates</p>
          <div style={{ height: '4px', width: '60px', background: 'linear-gradient(90deg, #00C6A0, #2196F3)', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="d-flex pb-4 px-2" 
          style={{ 
            overflowX: 'auto', 
            gap: '1.5rem',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none'  /* IE/Edge */
          }}
        >
          {reviews.map(review => (
            <Card 
              key={review.id} 
              onClick={() => setIsPaused(!isPaused)}
              className="border-0 shadow-sm flex-shrink-0" 
              style={{ 
                width: '350px', 
                maxWidth: '85vw',
                borderRadius: '16px',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  right: '20px', 
                  opacity: '0.05' 
                }}
              >
                <FaQuoteLeft size={60} />
              </div>
              
              <Card.Body className="p-4 d-flex flex-column h-100">
                <div className="d-flex gap-1 mb-3">
                  {renderStars(review.rating)}
                </div>
                
                <p className="flex-grow-1 text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.6', fontStyle: 'italic', zIndex: 1, textAlign: 'justify' }}>
                  "{review.review}"
                </p>
                
                <div className="d-flex align-items-center mt-4 border-top pt-3">
                  {review.photo ? (
                    <img 
                      src={`${import.meta.env.VITE_FILE_BASE_URL}/${review.photo}`} 
                      alt={review.name}
                      style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00C6A0' }} 
                      className="me-3"
                    />
                  ) : (
                    <FaUserCircle size={55} className="text-secondary opacity-25 me-3" />
                  )}
                  
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: '#073738' }}>{review.name}</h6>
                    <small className="text-muted d-block">
                      {review.designation}{review.designation && review.company ? ' @ ' : ''}{review.company}
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        
        {/* Style to hide scrollbar for webkit browsers while keeping functionality */}
        <style dangerouslySetInnerHTML={{__html: `
          .d-flex::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </Container>
    </section>
  );
};

export default ReviewSection;
