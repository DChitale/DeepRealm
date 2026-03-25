import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HadalZone = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-[150vh] w-full bg-black relative flex py-32 border-t border-white/5 pb-64">
      {/* Blend Overlays */}
      <div className="absolute top-0 w-full h-96 bg-linear-to-b from-black to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 flex flex-col items-center justify-center text-center">
        <div ref={contentRef} className="max-w-3xl flex flex-col items-center mt-32">
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4 block mix-blend-screen opacity-50 font-sans">
            6,000m – 11,000m
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold font-instrument text-white mb-8 leading-tight tracking-tight scale-105">
            The Hadal Zone
          </h2>
          <p className="text-xl text-white/40 leading-relaxed mb-12 max-w-2xl font-sans font-light italic">
            "The deeper you go, the more the world vanishes. Here, in the deepest trenches of the planet, only the ghosts remain."
          </p>
          
          <div className="w-px h-24 bg-linear-to-b from-white/20 to-transparent mt-8 animate-bounce opacity-40"></div>
          
          <div className="mt-20">
            <p className="text-sm font-instrument uppercase tracking-[0.3em] text-white/20">Bottom of the Realm</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HadalZone;
