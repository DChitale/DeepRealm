import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SubmarineHUD
 * Immersive cockpit overlay that fades in as you descend deeper.
 */
const SubmarineHUD = () => {
  const hudRef = useRef(null);
  const sonarRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. HUD Entrance
      gsap.to(hudRef.current, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top -10%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        duration: 2,
        ease: 'power2.inOut',
      });

      // 2. Mouse Tracking for Sonar Flashlight
      const xSetter = gsap.quickTo(sonarRef.current, "--x", { duration: 0.4, ease: "power3" });
      const ySetter = gsap.quickTo(sonarRef.current, "--y", { duration: 0.4, ease: "power3" });

      const handleMouseMove = (e) => {
        xSetter(`${e.clientX}px`);
        ySetter(`${e.clientY}px`);
      };
      window.addEventListener('mousemove', handleMouseMove);

      // 3. Depth-based Darkness (Flashlight Intensity)
      // Only start making the world dark after the Sunlight zone (approx 15% scroll)
      gsap.to(sonarRef.current, {
        scrollTrigger: {
          trigger: 'body',
          start: '15% top', 
          end: '70% top',
          scrub: 1,
        },
        "--darkness": 0.9,
      });

      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, hudRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={hudRef}
      className="fixed inset-0 pointer-events-none z-100 overflow-hidden select-none opacity-0"
    >
      {/* 0. Sonar Scan / Flashlight Layer */}
      <div 
        ref={sonarRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), transparent 0%, rgba(0,0,5, var(--darkness, 0)) 80%)`
        }}
      />
      
      {/* 1. Glass Vignette: Creates depth and focuses the eye on the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.5)_100%)] shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />

      {/* 2. Glass Reflections: Subtle sheen and "imperfections" on the lens */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-screen pointer-events-none">
         {/* Top overhead light reflection */}
         <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-linear-to-b from-white/30 via-white/5 to-transparent blur-3xl transform rotate-1" />
         
         {/* Corner "dirty" glass or moisture spots */}
         <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 blur-[100px] rounded-full" />
         <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />
      </div>

      {/* 3. The Structural Frame: A subtle rounded container to simulate the window shape */}
      <div className="absolute inset-4 md:inset-10 border border-white/4 rounded-[3.5rem] md:rounded-[5rem] pointer-events-none" />

      {/* 4. Peripheral HUD Elements: Decorative UI bits */}
      
      {/* Top Left: System Status */}
      <div className="absolute top-10 left-10 md:top-14 md:left-14 flex flex-col gap-2 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
         <div className="flex gap-1.5">
            <div className="w-1 h-3 bg-cyan-500/60" />
            <div className="w-1 h-3 bg-cyan-500/60" />
            <div className="w-5 h-3 bg-cyan-500/80" />
            <div className="w-1 h-3 bg-white/20" />
         </div>
         <span className="text-[10px] font-mono tracking-[0.3em] text-white uppercase font-light">
            Hull Integrity: 98%
         </span>
      </div>

      {/* Bottom Right: Scanning Status */}
      <div className="absolute bottom-10 right-10 md:bottom-14 md:right-14 flex flex-col items-end gap-2 opacity-30">
         <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono tracking-widest text-white uppercase italic">Scanning bio-signatures...</span>
            <div className="flex gap-1">
               <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
               <div className="w-1 h-1 rounded-full bg-cyan-400/40" />
               <div className="w-1 h-1 rounded-full bg-cyan-400/20" />
            </div>
         </div>
         <div className="h-px w-32 bg-linear-to-l from-cyan-500/40 to-transparent" />
      </div>

      {/* 5. Center Targeting (Optional / Very Subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 opacity-10 pointer-events-none">
         <div className="absolute top-1/2 left-0 w-full h-px bg-white" />
         <div className="absolute top-0 left-1/2 w-px h-full bg-white" />
         <div className="absolute inset-0 border border-white rounded-full scale-150 opacity-20" />
      </div>

      {/* 6. Scanline / CRT Effect: Very faint horizontal lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />

    </div>
  );
};

export default SubmarineHUD;
