import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/banner");
        // Optional: Filter only active banners, or show all. We'll show all or active if they want.
        // Assuming they want to show all banners they've added to the DB, or just the active one.
        // We will show all active banners. Since their DB might force only 1 active, 
        // we'll show all banners that are active, or if none, fallback to hardcoded.
        const activeBanners = data.filter(b => b.is_active);
        setBanners(activeBanners.length > 0 ? activeBanners : data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // If loading, you can return a placeholder or null
  if (loading) {
    return <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  // If no banners from DB, don't show anything
  if (banners.length === 0) {
    return null;
  }

  return (
    <>
      <style>
        {`
          .hero-banner-content {
            background-color: transparent;
            padding: 20px 40px;
            border-radius: 10px;
            text-align: left;
            max-width: 50%;
          }
          .hero-banner-title {
            margin: 0;
            font-size: 4rem;
            font-weight: 700;
            font-family: 'Poppins', sans-serif;
          }
          .hero-banner-subtitle {
            font-size: 1.5rem;
            font-weight: 500;
            line-height: 1.6;
            font-family: 'Poppins', sans-serif;
          }
          .hero-banner-bg {
            padding-left: 50px;
            padding-top: 80px;
          }
          @media (max-width: 768px) {
            .hero-banner-content {
              max-width: 100%;
              padding: 10px 20px;
            }
            .hero-banner-title {
              font-size: 2.2rem;
            }
            .hero-banner-subtitle {
              font-size: 1.2rem;
            }
            .hero-banner-bg {
              padding-left: 15px;
              padding-top: 40px;
              justify-content: center;
            }
          }
        `}
      </style>
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      slidesPerView={1}
      loop={banners.length > 1}
      effect="fade"
      autoplay={{ delay: 3500 }}
      pagination={{ clickable: false }}
      navigation={false}
      className="hero-swiper"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="hero-banner-bg" style={{
            width: '100%',
            height: '650px',
            backgroundImage: banner.image ? `url(http://localhost:8080/${banner.image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
            {(banner.title || banner.subtitle) && (
              <div className="hero-banner-content">
                {banner.title && (
                  <h1 className="hero-banner-title" style={{ color: banner.title_color || 'white' }}>
                    {banner.title}
                  </h1>
                )}
                {banner.subtitle && (
                  <div style={{ margin: banner.title ? '15px 0 0 0' : 0 }}>
                    {banner.subtitle.split('\n').map((line, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <FaCheckCircle 
                          size={24}
                          style={{ 
                            color: banner.subtitle_color || 'white', 
                            marginTop: '6px', 
                            marginRight: '12px',
                            minWidth: '24px'
                          }} 
                        />
                        <span className="hero-banner-subtitle" style={{ color: banner.subtitle_color || 'white' }}>
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
};

export default HeroCarousel;
