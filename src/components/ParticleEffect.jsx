import React, { useEffect, useRef } from 'react';

const ParticleEffect = ({ 
  rgb = '255, 255, 255', 
  count = 100,
  speed = 0.5
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const initParticles = () => {
      particles = [];
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      for (let i = 0; i < count; i++) {
        const vx = (Math.random() - 0.5) * speed * 0.4;
        const vy = - (Math.random() * speed + speed * 0.5);
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          vx: vx,
          vy: vy,
          baseVx: vx,
          baseVy: vy,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      particles.forEach((p) => {
        // Mouse Interaction
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 120; // Influence radius

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const pushX = (dx / dist) * force * 8;
          const pushY = (dy / dist) * force * 8;
          p.vx += pushX;
          p.vy += pushY;
        }

        // Return to base speed (friction)
        p.vx += (p.baseVx - p.vx) * 0.08;
        p.vy += (p.baseVy - p.vy) * 0.08;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) {
          p.y = window.innerHeight;
          p.x = Math.random() * window.innerWidth;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        ctx.fillStyle = `rgba(${rgb}, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rgb, count, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none w-full h-full object-cover z-0 mix-blend-screen opacity-70"
    />
  );
};

export default ParticleEffect;
