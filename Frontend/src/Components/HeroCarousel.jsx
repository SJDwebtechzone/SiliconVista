import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      slidesPerView={1}
      loop={true}
      effect="fade"
      autoplay={{ delay: 3500 }}
      pagination={{ clickable: false}}
      navigation={false}
      className="hero-swiper"
      >

       <SwiperSlide>
        <div className="sloganDiv">

            <div className="sloganGreen">
                <h1 id="head">Silicon Vista</h1>
                <p id="slogan">Online VLSI Training Institute</p>
                
                <img 
                  src='./assets/Hero2.png'
                  alt="Semiconductor and VLSI training banner by SiliconVista"
                  className="hidden-seo-img"
                />


            </div>

            <div className="sloganImage"></div>

        </div>
       </SwiperSlide>

        <SwiperSlide>
          <div className="swiper-slide1">

            <div className="slide1-text-box">
              <h1 className="slide1-title">
                Silicon<span>Vista</span>
              </h1>

              <h2 className="slide1-subtitle">
                Your Online VLSI Training Institute
              </h2>

              <ul className="slide1-points">
                <li>✔ Hands-on real-time VLSI training</li>
                <li>✔ Expert personal guidance with 1-on-1 sessions</li>
                <li>✔ Step-by-step learning from basics to advanced verification</li>
              </ul>
            </div>

              <img 
                src="./assets/Carousal1.webp"
                alt="Advanced VLSI career development training banner"
                className="hidden-seo-img"
              />

          </div>
        </SwiperSlide>


      <SwiperSlide>
        <div className="swiper-slide2">
          <p>Advance Your <b>VLSI Career</b> with <br /> 
            <b>Industry Leading Online Training</b></p>

            <img 
              src="./assets/Carousal2.webp"
              alt="VLSI online course promotion by SiliconVista"
              className="hidden-seo-img"
            />

        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default HeroCarousel
