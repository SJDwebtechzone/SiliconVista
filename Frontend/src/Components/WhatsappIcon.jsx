import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

import './whatsapp.css';

const WhatsappIcon = () => {

    const phone = "916369498025";
    const message = "Hi, I want to know about VLSI courses";

    const whatsappDesktop = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
    const whatsappWeb = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    const handleClick = () => {

      window.location.href = whatsappDesktop;

      setTimeout(() => {
        window.open(whatsappWeb, "_blank");
      }, 1200);
    };
    
  return (
    <a
      onClick={handleClick}
      className='whatsApp_float'
    >
      <FaWhatsapp className='whatsapp_icon' />
    </a>
  );
};

export default WhatsappIcon;
