 import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

import './whatsapp.css';

const CallButton = () => {

  const phone = "+91 63694 98025";

  const handleCallClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if(isMobile){
      window.location.href = `tel:${phone.replace(/\s+/g, "")}`;
    }else{
      navigator.clipboard.writeText(phone)
      alert("Phone number copied to clipboard");
    }

  }


  return (
    <div className='call-btn' onClick={handleCallClick}>
      <FaPhoneAlt size={22} />
    </div>
  )
}

export default CallButton

