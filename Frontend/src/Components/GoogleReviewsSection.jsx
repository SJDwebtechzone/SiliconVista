import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FaStar, FaMapMarkerAlt, FaCheck, FaArrowUp } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import './GoogleReviewsSection.css';

const GoogleReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placeId, setPlaceId] = useState(null);
  const [stats, setStats] = useState({
    averageRating: "0.0",
    totalReviews: 0,
    positivePercentage: 0,
    lastSync: null
  });

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch visibility setting first
        try {
          const settingRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/settings/show_google_reviews`);
          if (settingRes.data && settingRes.data.value === 'false') {
            setIsVisible(false);
            setLoading(false);
            return; // Exit early if we don't need to show it
          }
        } catch (settingErr) {
          // Setting might not exist yet, default to true
        }

        const [reviewsRes, statsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/google-reviews`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/google-reviews/stats`)
        ]);

        if (reviewsRes.data.success) {
          setReviews(reviewsRes.data.data);
        }

        if (statsRes.data.success) {
          setStats({
            averageRating: statsRes.data.averageRating || "0.0",
            totalReviews: statsRes.data.totalReviews || 0,
            positivePercentage: statsRes.data.positivePercentage || 0,
            lastSync: statsRes.data.lastSync
          });
        }
      } catch (error) {
        console.error('Error fetching google reviews data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isVisible) {
    return null;
  }

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar key={i} color={i < rating ? '#FBBC05' : '#e4e5e9'} size={14} />
    ));
  };

  const getTimeAgo = (dateString) => {
    const diff = Math.floor((new Date() - new Date(dateString)) / 1000 / 60);
    if (diff < 60) return `${diff || 1} minutes ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days ago`;
    return '1 month ago';
  };

  return (
    <section className="google-reviews-section">
      <Container>
        <div className="reviews-grid-container shadow-lg">
          
          {/* LEFT PANEL */}
          <div className="reviews-left-panel">
            <div className="reviews-left-content">
              <FcGoogle className="google-logo-large" />
              
              <div className="stars-large">
                <FaStar color="#FBBC05" size={24} />
                <FaStar color="#FBBC05" size={24} />
                <FaStar color="#FBBC05" size={24} />
                <FaStar color="#FBBC05" size={24} />
                <FaStar color="#FBBC05" size={24} />
              </div>

              <h2 className="google-title">
                <span className="google-text">
                  <span style={{color: '#4285F4'}}>G</span>
                  <span style={{color: '#EA4335'}}>o</span>
                  <span style={{color: '#FBBC05'}}>o</span>
                  <span style={{color: '#4285F4'}}>g</span>
                  <span style={{color: '#34A853'}}>l</span>
                  <span style={{color: '#EA4335'}}>e</span>
                </span> Reviews
              </h2>
              
              <p className="google-subtitle">
                Trusted by our students, proven by results.
              </p>

              <div className="stats-row">
                <div className="stat-item">
                  <div className="stat-value">{stats.averageRating} <FaStar color="#FBBC05" size={18} /></div>
                  <div className="stat-label">Average Rating</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.totalReviews}</div>
                  <div className="stat-label">Total Reviews</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.positivePercentage}%</div>
                  <div className="stat-label">Positive Reviews</div>
                </div>
              </div>

              {stats.lastSync && (
                <div className="last-sync-status" style={{ fontSize: '0.85rem', color: '#5f6368', marginBottom: '20px', fontWeight: '500' }}>
                  Last Synced: {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(stats.lastSync))}
                </div>
              )}

              <a 
                href="https://www.google.com/maps/place/Silicon+Vista+VLSI+training+institute/@13.0364882,80.1302541,17z/data=!3m1!4b1!4m6!3m5!1s0x88c85c3caf34f141:0xe950bd6f7e44ae6d!8m2!3d13.0364882!4d80.132829!16s%2Fg%2F11yz_n0mgf?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-read-google"
              >
                <FcGoogle size={20} /> Read all reviews on Google
              </a>

              <div className="verified-card">
                <div className="verified-icon">
                  <FaCheck size={16} />
                </div>
                <div>
                  <h6>All reviews are from verified Google profiles</h6>
                  <p>Real students. Real experiences.</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT PANEL - INFINITE SCROLL */}
          <div className="reviews-right-panel">
            {!loading && reviews.length > 0 && (
              <div className="scroll-track">
                {/* Duplicate the array to create a seamless infinite scroll loop */}
                {[...reviews, ...reviews].map((review, index) => (
                  <div key={`${review.id}-${index}`} className="feed-review-card">
                    <div className="feed-card-header">
                      {review.profile_photo ? (
                        <img 
                          src={review.profile_photo} 
                          alt={review.author_name} 
                          className="feed-avatar"
                        />
                      ) : (
                        <div className="feed-avatar-placeholder">
                          {review.author_name.charAt(0)}
                        </div>
                      )}
                      
                      <div className="feed-author-info">
                        <h5 className="feed-author-name">{review.author_name}</h5>
                        <div className="feed-meta">
                          <div className="feed-stars">
                            {renderStars(review.rating)}
                          </div>
                          <span className="feed-time">{getTimeAgo(review.review_time)}</span>
                        </div>
                      </div>

                      <div className="feed-google-icon">
                        <FcGoogle size={20} />
                      </div>

                      {index === 0 && (
                        <div className="live-badge">
                          <div className="live-dot"></div> LIVE
                        </div>
                      )}
                    </div>
                    
                    <p className="feed-text">{review.review}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="new-reviews-badge">
              <FaArrowUp size={12} /> New reviews coming in...
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default GoogleReviewsSection;
