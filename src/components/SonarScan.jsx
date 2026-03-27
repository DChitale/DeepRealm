import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SonarScan
 * Provides a dynamic "flashlight" effect that follows the cursor
 * and dims the background in deeper zones, forcing exploration.
 */
const SonarScan = () => {
  const containerRef = useRef(null);
  const sonarRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Mouse Tracking for Flashlight
      const xSetter = gsap.quickTo(sonarRef.current, "--x", { duration: 0.4, ease: "power3" });
      const ySetter = gsap.quickTo(sonarRef.current, "--y", { duration: 0.4, ease: "power3" });

      const handleMouseMove = (e) => {
        xSetter(`${e.clientX}px`);
        ySetter(`${e.clientY}px`);
      };
      window.addEventListener('mousemove', handleMouseMove);

      // 2. Depth-based Darkness
      // Only dims the world as you descend deeper into the Twilight/Midnight zones.
      gsap.to(sonarRef.current, {
        scrollTrigger: {
          trigger: 'body',
          start: '20% top', 
          end: '75% top',
          scrub: 1,
        },
        "--darkness": 0.92,
      });

      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-80 overflow-hidden select-none translate-z-0"
    >
      <div 
        ref={sonarRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), transparent 0%, rgba(0,0,5, var(--darkness, 0)) 85%)`
        }}
      />
    </div>
  );
};

export default SonarScan;
