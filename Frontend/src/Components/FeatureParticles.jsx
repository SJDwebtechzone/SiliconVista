import React, { useEffect, useRef } from 'react';

const FeatureParticles = ({ theme = 'dark', count = 25, sizeMultiplier = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas to parent size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = count;

    // Create particles (glowing tech squares)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 4 + 2) * sizeMultiplier, // Scale the size by sizeMultiplier
        speedY: (Math.random() * 0.5) + 0.2, // Float upwards slowly
        speedX: (Math.random() - 0.5) * 0.3, // Slight horizontal drift
        opacity: Math.random() * 0.5 + 0.1, // Soft opacity
      });
    }

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Move particle
        p.y -= p.speedY;
        p.x += p.speedX;

        // Wrap around
        if (p.y + p.size < 0) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;

        // Draw tech square
        ctx.save();
        ctx.globalAlpha = p.opacity;
        // Set color based on theme
        if (theme === 'light') {
          ctx.fillStyle = '#00C6A0'; // Teal squares for light bg
          ctx.shadowColor = 'rgba(0, 198, 160, 0.5)';
        } else {
          ctx.fillStyle = '#ffffff'; // White squares for dark bg
          ctx.shadowColor = '#00C6A0';
        }
        
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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

export default FeatureParticles;
