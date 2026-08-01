import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';

const NewsEventsSection = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, settingRes] = await Promise.all([
          axios.get('/api/news-events'),
          axios.get('/api/settings/show_news_events').catch(() => ({ data: { value: 'true' } }))
        ]);
        setNewsItems(newsRes.data.filter(item => item.is_active));
        setIsEnabled(settingRes.data.value === 'true');
      } catch (err) {
        console.error('Error fetching news & events:', err);
      } finally {
        setLoaded(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isPaused || newsItems.length === 0) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [isPaused, newsItems]);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % newsItems.length);
  };

  if (!loaded || !isEnabled || newsItems.length === 0) return null;

  const current = newsItems[activeIndex];

  return (
    <div 
      style={{ padding: '80px 5%', background: '#ffffff' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: '#112240', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <FaNewspaper color="#674f9e" /> Latest 
             <span style={{
    background: 'linear-gradient(90deg, #00C6A0, #2196F3, #7A1FA2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}>
    Highlights
  </span>
          </h1>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', alignItems: 'center' }}>
          
          {/* Left Image */}
          <div style={{ flex: '1 1 450px', position: 'relative' }}>
            <div style={{ 
              position: 'relative', 
              borderRadius: '20px', 
              overflow: 'hidden', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              aspectRatio: '3 / 2'
            }}>
              <img 
                key={activeIndex}
                src={`${import.meta.env.VITE_FILE_BASE_URL}/${current.image}`} 
                alt={current.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  animation: 'fadeInImage 0.5s ease'
                }} 
              />
            </div>

            {newsItems.length > 1 && (
              <>
                <button 
                  onClick={goToPrev}
                  aria-label="Previous"
                  style={{
                    position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                    width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', fontSize: '16px', color: '#112240'
                  }}
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={goToNext}
                  aria-label="Next"
                  style={{
                    position: 'absolute', top: '50%', right: '15px', transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                    width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', fontSize: '16px', color: '#112240'
                  }}
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          {/* Right Content */}
          <div style={{ flex: '1 1 450px', minWidth: 0 }} key={`content-${activeIndex}`}>
            {current.event_date && (
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', 
                color: '#3500c6', fontWeight: '600', marginBottom: '15px',
                animation: 'fadeInText 0.5s ease'
              }}>
                <FaCalendarAlt /> {current.event_date}
              </div>
            )}
            <h3 style={{ 
              color: '#112240', marginBottom: '20px', fontSize: '1.6rem',
              animation: 'fadeInText 0.5s ease'
            }}>
              {current.title}
            </h3>
            <div style={{ 
              color: '#555', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px',
              textAlign:'justify',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              animation: 'fadeInText 0.5s ease'
            }}
             dangerouslySetInnerHTML={{ __html: current.description }}
            />
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeInImage {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInText {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NewsEventsSection;