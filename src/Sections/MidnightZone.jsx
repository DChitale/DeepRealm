import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MidnightZone = () => {
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
        x: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-[150vh] w-full bg-linear-to-b from-[#010816] to-[#050505] relative flex py-24">
      {/* Blend Overlays */}
      <div className="absolute top-0 w-full h-96 bg-linear-to-b from-[#010816] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-96 bg-linear-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 w-full z-10 sticky top-1/3 h-fit flex justify-end">
        <div ref={contentRef} className="max-w-2xl text-right">
          <span className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-2 block font-sans">
            1,000m – 4,000m
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold font-instrument text-indigo-100 mb-6 leading-tight">
            The Midnight Zone
          </h2>
          <p className="text-lg text-indigo-200/50 leading-relaxed mb-12 ml-auto max-w-xl font-sans">
            Total darkness. The only light here comes from the glowing lures of strange predators. Colors mean nothing, and contrast is everything.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-xl border border-indigo-500/30 bg-indigo-500/5 shadow-sm backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-indigo-300 mb-4 font-instrument">Extreme Pressure</h3>
              <p className="text-base text-indigo-100/60 leading-relaxed font-sans">
                The water pressure reaches nearly 400 atmospheres, yet alien-like creatures thrive by replacing air with liquid matrices in their bodies.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-indigo-500/30 bg-indigo-500/5 shadow-sm backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-indigo-300 mb-4 font-instrument">Vampire Squid</h3>
              <p className="text-base text-indigo-100/60 leading-relaxed font-sans">
                Lurking in the shadows, these deep-sea relatives of octopuses turn themselves inside out to reveal webbed, thorn-like arms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MidnightZone;
