import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AbyssalZone = () => {
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
        x: -60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-[150vh] w-full bg-[#050505] relative flex py-24 border-t border-purple-500/10">
      {/* Blend Overlays */}
      <div className="absolute top-0 w-full h-96 bg-linear-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-96 bg-linear-to-t from-black to-transparent z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 w-full z-10 sticky top-1/4 h-fit">
        <div ref={contentRef} className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-purple-600 mb-2 flex items-center gap-3 font-sans">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            4,000m – 6,000m 
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold font-instrument text-purple-100 mb-6 leading-tight">
            The Abyss
          </h2>
          <p className="text-lg text-purple-200/40 leading-relaxed mb-12 max-w-xl font-sans">
            Near-freezing temperatures and crushing pressure define the abyss. This desolate landscape covers most of the ocean floor, populated by ghostly scavengers and deep-sea coral.
          </p>
          
          <div className="p-8 rounded-xl border border-red-500/20 bg-red-500/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-semibold text-red-400 font-instrument">HUD Warning: Crush Depth</h3>
            </div>
            <p className="text-base text-red-200/60 leading-relaxed font-sans">
              Temperatures hover just above freezing at 2-3°C. The abyssal plain feels like a dead world, but hydrothermal vents occasionally blast superheated toxic water, supporting massive tubeworms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AbyssalZone;
