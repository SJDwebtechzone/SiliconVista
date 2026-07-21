import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const SitePopup = () => {
  const [show, setShow] = useState(false);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/popup`);
        // Find the first active popup
        const activePopup = data.find(p => p.is_active);
        
        if (activePopup) {
          setPopupData(activePopup);
          setShow(true); // Show immediately without delay
        }
      } catch (error) {
        console.error("Error fetching popup data:", error);
      }
    };

    fetchPopup();
  }, []);

  if (!popupData || !show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: 'calc(100vw - 40px)',
      maxWidth: '356px',
      zIndex: 9999,
      animation: 'slideInRight 0.5s ease-out'
    }}>
      <style>
        {`
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .moving-border-container {
            position: relative;
            padding: 4px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
          }
          .moving-border-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(transparent, transparent, transparent, #00C6A0);
            animation: spin 3s linear infinite;
            z-index: -1;
          }
          .popup-inner-content {
            background: white;
            border-radius: 17px;
            overflow: hidden;
            position: relative;
          }
        `}
      </style>
      
      <div className="moving-border-container">
        <div className="popup-inner-content">
          {/* Close Button */}
          <button 
            onClick={() => setShow(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#00C6A0',
              color: 'white',
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 99,
              fontSize: '16px'
            }}
          >
            <FaTimes />
          </button>

          {popupData.image && (
            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', display: 'flex', justifyContent: 'center' }}>
              <img 
                src={`${import.meta.env.VITE_FILE_BASE_URL}/${popupData.image}`} 
                alt={popupData.title} 
                style={{ width: 'auto', maxWidth: '100%', height: 'auto', maxHeight: '200px', objectFit: 'contain' }} 
              />
            </div>
          )}
          
          <div className="p-3">
            <h4 style={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem', marginBottom: '8px' }}>
              {popupData.title}
            </h4>
            {popupData.description && (
              <p className="text-muted" style={{ fontSize: '0.95rem', whiteSpace: 'pre-line', margin: 0 }}>
                {popupData.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitePopup;
