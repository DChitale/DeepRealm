import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleEffect from '../components/ParticleEffect';
import { ZONE_FACTS } from '../data/fact';

gsap.registerPlugin(ScrollTrigger);

const HadalZone = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const contentRef = useRef(null);
  
  const zoneData = ZONE_FACTS.HADAL;
  const cards = zoneData.facts;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Content Entrance
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });

      // 2. Continuous Horizontal Auto-Scroll
      // To create a seamless loop, we'll duplicate the items in the DOM and then animate
      const scrollWidth = scrollRef.current?.offsetWidth;
      if (scrollWidth) {
          gsap.to(scrollRef.current, {
            x: -scrollWidth / 2, // Scroll halfway (since we'll clone elements)
            duration: 25, // Control the speed
            ease: "none",
            repeat: -1,
            paused: false
          });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cloning cards for seamless horizontal loop
  const totalCards = [...cards, ...cards];

  return (
    <section ref={containerRef} className="min-h-[160vh] w-full relative flex flex-col items-center justify-center py-48 overflow-hidden bg-black select-none -mt-px">
      <div className="absolute inset-0 w-full h-full bg-linear-to-b from-black via-[#020202] to-[#010002] z-0"></div>
      <ParticleEffect rgb="200, 200, 200" count={40} speed={0.15} />

      <div className="absolute top-0 w-full h-96 bg-linear-to-b from-black via-transparent to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full z-10 text-center mb-32">
        <div ref={contentRef} className="max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-[0.5em] uppercase text-white/30 mb-6 block font-mono flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-white/20" />
            {zoneData.depth}
            <span className="w-8 h-[1px] bg-white/20" />
          </span>
          <h2 className="text-6xl md:text-8xl font-black font-instrument text-white mb-8 leading-[0.8] uppercase italic tracking-tighter">
             Hadal <br />
             <span className="text-white/20">Trenches</span>
          </h2>
          <p className="text-xl text-white/40 leading-relaxed font-sans font-light italic">
            "{zoneData.description}"
          </p>
        </div>
      </div>

      {/* HORIZONTAL AUTO-SCROLLING CARDS */}
      <div className="w-full z-10 relative overflow-hidden h-[450px] flex items-center group">
         <div 
           ref={scrollRef} 
           className="flex gap-8 px-4 w-max group-hover:[animation-play-state:paused]"
         >
            {totalCards.map((fact, index) => (
               <div 
                 key={index}
                 className="w-[350px] md:w-[450px] h-[320px] rounded-[2.5rem] bg-[#0c0c0c] border border-white/5 p-8 flex gap-8 items-center shrink-0 hover:border-white/20 hover:bg-[#111] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,1)] relative overflow-hidden"
               >
                  {/* Decorative Scanline HUD */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-transparent via-white/5 to-transparent"></div>
                  
                  {/* Card Image - Circular/Rounded Thumbnail on left */}
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-black/40 shrink-0 overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-700">
                    <img 
                      src={fact.image} 
                      alt={fact.title} 
                      className="w-full h-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
                    />
                  </div>

                  {/* Fact Text on right */}
                  <div className="flex flex-col justify-center gap-4">
                     <h3 className="text-2xl font-instrument font-black text-white uppercase leading-none tracking-tight">
                        {fact.title}
                     </h3>
                     <p className="text-xs md:text-sm text-white/30 leading-relaxed font-sans font-light line-clamp-4">
                        {fact.content}
                     </p>
                     <div className="mt-2 flex items-center gap-2">
                        <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">DEEP.SCAN.0{index % (cards.length) + 1}</span>
                        <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         
         {/* Edge Fades for the horizontal strip */}
         <div className="absolute inset-y-0 left-0 w-48 bg-linear-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
         <div className="absolute inset-y-0 right-0 w-48 bg-linear-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />
      </div>

      <div className="mt-32 z-10 opacity-20 hover:opacity-100 transition-opacity">
        <div className="w-px h-32 bg-linear-to-b from-white/40 via-white/10 to-transparent mx-auto"></div>
        <p className="mt-8 text-[10px] font-mono tracking-[1em] text-white/30 uppercase">Vertical limit reached</p>
      </div>
    </section>
  );
};

export default HadalZone;
