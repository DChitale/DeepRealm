import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TwilightZone = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video auto-play was prevented.", error);
      });
    }

    const ctx = gsap.context(() => {
      // Fade in section content as it comes into view
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-[150vh] w-full bg-[#0E1317] relative flex sticky-container py-24 overflow-hidden">
      {/* Background Video */}
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
      >
        <source src="https://ik.imagekit.io/dchitale/DeepRealm/twilight.mp4" type="video/mp4" />
      </video>
      
      {/* Blend Overlays */}
      <div className="absolute top-0 w-full h-96 bg-linear-to-b from-[#0E1317] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-96 bg-linear-to-t from-[#010816] to-transparent z-10 pointer-events-none" />
      
      {/* Darkening Overlay for readability */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0E1317] via-transparent to-[#010816] opacity-80 z-0" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 w-full z-10 sticky top-1/4 h-fit">
        <div ref={contentRef} className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-2 block font-sans">
            200m – 1,000m
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold font-instrument text-blue-100 mb-6 leading-tight">
            The Twilight Zone
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-12 max-w-xl font-sans">
            Light fades rapidly here. Deep rich blues dominate the water, and we begin to see the first sparks of bioluminescence as creatures adapt to the eternal dusk.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 shadow-sm backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-blue-200 mb-4 font-instrument">Bioluminescence</h3>
              <p className="text-base text-blue-100/60 leading-relaxed font-sans">
                Over 90% of creatures in this zone generate their own light using chemical reactions to hunt and communicate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TwilightZone;