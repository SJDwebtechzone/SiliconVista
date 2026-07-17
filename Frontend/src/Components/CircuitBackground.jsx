import React, { useMemo } from 'react';

const routeTrace = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  
  if (absDx > absDy) {
    const midX = x1 + Math.sign(dx) * (absDx - absDy);
    return `M ${x1} ${y1} L ${midX} ${y1} L ${x2} ${y2}`;
  } else {
    const midY = y1 + Math.sign(dy) * (absDy - absDx);
    return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${y2}`;
  }
};

// A simple deterministic pseudo-random number generator
const mulberry32 = (a) => {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

const CircuitBackground = () => {
  const traces = useMemo(() => {
    const rand = mulberry32(12345); // Fixed seed for stable hydration
    const paths = [];
    const centerX = 500;
    const centerY = 500;
    
    // Generate 48 traces around the perimeter pointing towards the center
    for (let i = 0; i < 48; i++) {
      // Sometimes skip to make gaps
      if (rand() < 0.2) continue;

      // Evenly distribute angles, with some jitter
      const angle = (i * (360 / 48) + (rand() * 10 - 5)) * (Math.PI / 180);
      
      const startRadius = 450 + rand() * 150; // Outside the view
      const endRadius = 150 + rand() * 100; // Near the honeycomb

      // Start coords
      const x1 = Math.round(centerX + Math.cos(angle) * startRadius);
      const y1 = Math.round(centerY + Math.sin(angle) * startRadius);

      // End coords
      const x2 = Math.round(centerX + Math.cos(angle) * endRadius);
      const y2 = Math.round(centerY + Math.sin(angle) * endRadius);
      
      // Delay for CSS animation staggered effect
      const delay = Math.floor(rand() * 5); 
      // Color class
      const colorClass = rand() < 0.3 ? 'delay-1' : rand() < 0.6 ? 'delay-2' : rand() < 0.8 ? 'delay-3' : 'delay-4';

      paths.push({
        id: i,
        d: routeTrace(x1, y1, x2, y2),
        nodeX: x2,
        nodeY: y2,
        delayClass: colorClass
      });
    }

    // Add some cross-connections to make it look even more dense
    for(let i=0; i<15; i++) {
      const angle = (rand() * 360) * (Math.PI / 180);
      const r1 = 250 + rand() * 100;
      const r2 = r1 + 50;
      
      const px1 = Math.round(centerX + Math.cos(angle) * r1);
      const py1 = Math.round(centerY + Math.sin(angle) * r1);
      
      // route to nearby angle
      const angle2 = angle + (rand() * 0.5 - 0.25);
      const px2 = Math.round(centerX + Math.cos(angle2) * r2);
      const py2 = Math.round(centerY + Math.sin(angle2) * r2);
      
      paths.push({
        id: `cross-${i}`,
        d: routeTrace(px1, py1, px2, py2),
        nodeX: px2,
        nodeY: py2,
        delayClass: rand() < 0.5 ? 'delay-1' : 'delay-2'
      });
    }

    return paths;
  }, []);

  return (
    <svg className="circuit-svg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      {traces.map(trace => (
        <g key={trace.id}>
          {/* Base faint trace line */}
          <path d={trace.d} className="circuit-line" />
          {/* Animated glowing electricity pulse */}
          <path d={trace.d} className={`circuit-glow ${trace.delayClass}`} />
          {/* Node endpoint (chip connector pad) */}
          <circle cx={trace.nodeX} cy={trace.nodeY} r="4" className="circuit-node" />
        </g>
      ))}
    </svg>
  );
};

export default CircuitBackground;
