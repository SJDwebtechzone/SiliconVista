import React from 'react';
import { Container } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './CareerOpportunitiesSection.css';

const CareerOpportunitiesSection = ({ partners = [] }) => {
  return (
    <section className="career-opportunity-section">
      <Container>
        {/* Header */}
        <div className="text-center">
          <h2 className="career-title">
            Launch Your Career in the <span className="theme-text">VLSI Industry</span>
          </h2>
        </div>

        {/* Carousel Tracks */}
        {partners && partners.length > 0 && (
          <div className="carousel-wrapper">
            {/* Top Row: Left Animation */}
            <div className="carousel-track track-left">
              {/* Quadruple the array for smooth infinite scrolling on ultra-wide screens */}
              {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                <div key={`top-${partner.id}-${index}`} className="partner-card">
                  {partner.logo_url ? (
                    <img 
                      src={`http://localhost:8080/${partner.logo_url}`} 
                      alt={partner.name} 
                      title={partner.name}
                    />
                  ) : (
                    <span>{partner.name}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Row: Right Animation - offset the start array to visually stagger the cards */}
            <div className="carousel-track track-right" style={{ marginTop: '10px' }}>
              {[
                ...partners.slice(Math.floor(partners.length / 2)),
                ...partners.slice(0, Math.floor(partners.length / 2)),
                ...partners.slice(Math.floor(partners.length / 2)),
                ...partners.slice(0, Math.floor(partners.length / 2)),
                ...partners.slice(Math.floor(partners.length / 2)),
                ...partners.slice(0, Math.floor(partners.length / 2)),
                ...partners.slice(Math.floor(partners.length / 2)),
                ...partners.slice(0, Math.floor(partners.length / 2)),
              ].map((partner, index) => (
                <div key={`bottom-${partner.id}-${index}`} className="partner-card">
                  {partner.logo_url ? (
                    <img 
                      src={`http://localhost:8080/${partner.logo_url}`} 
                      alt={partner.name} 
                      title={partner.name}
                    />
                  ) : (
                    <span>{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}



      </Container>
    </section>
  );
};

export default CareerOpportunitiesSection;
