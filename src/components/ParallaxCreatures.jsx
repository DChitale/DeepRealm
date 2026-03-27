import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Using the high-quality assets from the public/Images folder
const WHALE_IMG = "/Images/Blue_Whale.png";
const DEEP_IMG = "/Images/Sperm_Whale.png"; // Using Sperm Whale for the deep hunt parallax

/**
 * ParallaxCreatures
 * Adds massive, blurry silhouettes that drift deep in the background
 * at different speeds than the scroll, creating a sense of scale.
 */
const ParallaxCreatures = () => {
  const containerRef = useRef(null);
  const whaleRef = useRef(null);
  const deepRef  = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Giant Blue Whale (Twilight Zone)
      // It drifts horizontally from left-to-right across the screen
      gsap.fromTo(whaleRef.current, 
        { 
          x: '-60vw', 
          y: '80vh', 
          opacity: 0,
          scale: 0.8,
          filter: 'blur(30px) brightness(0.5)'
        },
        {
          x: '120vw', 
          y: '140vh', // Parallax downward
          opacity: 0.2, // Very subtle
          scale: 1.2,
          scrollTrigger: {
            trigger: 'body',
            start: '10% top',
            end: '45% top',
            scrub: 2.5, // High inertia for that massive weight feeling
          }
        }
      );

      // 2. Sperm Whale / Deep Hunter (Abyssal Zone)
      // Drifts at a different speed to simulate deep hunting behavior
      gsap.fromTo(deepRef.current,
        {
          x: '70vw',
          y: '300vh',
          opacity: 0,
          rotate: 20,
          filter: 'blur(45px) brightness(0.6)'
        },
        {
          x: '10vw',
          y: '500vh',
          opacity: 0.15,
          rotate: -15,
          scrollTrigger: {
            trigger: 'body',
            start: '45% top',
            end: '95% top',
            scrub: 3,
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Whale Instance */}
      <img 
        ref={whaleRef}
        src={WHALE_IMG} 
        alt="Whale Silhouette"
        className="absolute w-[80vw] max-w-[1200px] h-auto object-contain will-change-transform"
      />

      {/* Deep Hunter Instance */}
      <img 
        ref={deepRef}
        src={DEEP_IMG} 
        alt="Sperm Whale Silhouette"
        className="absolute w-[60vw] max-w-[900px] h-auto object-contain will-change-transform"
      />

    </div>
  );
};

export default ParallaxCreatures;
