import React, { useEffect, useRef } from 'react';

const FooterParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setSize = () => {
      if(canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    
    setSize();
    window.addEventListener('resize', setSize);

    const particles = [];
    const numParticles = window.innerWidth < 768 ? 30 : 60;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 1000),
        y: Math.random() * (canvas.height || 500),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.2, // Drift upwards slightly
        size: Math.random() * 2 + 1,
        life: Math.random(),
        lifeRate: Math.random() * 0.01 + 0.005,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        
        // Pulse life (opacity)
        p.life += p.lifeRate;
        if (p.life > Math.PI * 2) {
          p.life = 0;
        }

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const opacity = (Math.sin(p.life) + 1) / 2 * 0.8 + 0.1; // Range 0.1 to 0.9

        // Draw glowing orb
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        
        // Reset shadow for performance
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: 0 
      }}
    />
  );
};

export default FooterParticles;
