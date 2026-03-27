import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/draggable';
import ParticleEffect from '../components/ParticleEffect';
import { ZONE_FACTS } from '../data/fact';

gsap.registerPlugin(ScrollTrigger, Draggable);

const STACK_CONFIG = [
  { rotate: -6, x: 0,  y: 0,  scale: 1,    opacity: 1    }, // top
  { rotate: -2, x: 15, y: 5,  scale: 0.96, opacity: 0.6  }, // 2nd
  { rotate:  2, x: 30, y: 10, scale: 0.92, opacity: 0.35 }, // 3rd
  { rotate:  6, x: 45, y: 15, scale: 0.88, opacity: 0.15 }, // 4th
];

const MidnightZone = () => {
  const containerRef  = useRef(null);
  const cardsRef      = useRef([]);
  const contentRef    = useRef(null);
  const draggablesRef = useRef([]);
  const isAnimating   = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const zoneData = ZONE_FACTS.MIDNIGHT;
  const cards    = zoneData.facts.slice(0, 4);

  const applyStack = useCallback((topIndex, animate = true) => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const pos = (i - topIndex + cards.length) % cards.length;
      const cfg = STACK_CONFIG[pos] ?? STACK_CONFIG[STACK_CONFIG.length - 1];

      gsap.set(card, { zIndex: cards.length - pos });

      if (animate) {
        gsap.to(card, {
          x:        cfg.x,
          y:        cfg.y,
          scale:    cfg.scale,
          rotate:   cfg.rotate,
          opacity:  cfg.opacity,
          duration: 0.65,
          ease:     'expo.out',
        });
      } else {
        gsap.set(card, {
          x:       cfg.x,
          y:       cfg.y,
          scale:   cfg.scale,
          rotate:  cfg.rotate,
          opacity: cfg.opacity,
        });
      }
    });
  }, [cards.length]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start:   'top 60%',
          toggleActions: 'play none none reverse',
        },
        y:        40,
        opacity:  0,
        duration: 1,
        ease:     'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    applyStack(0, false);
  }, [applyStack]);

  useLayoutEffect(() => {
    draggablesRef.current.forEach(d => d?.kill());
    draggablesRef.current = [];

    const topCardEl = cardsRef.current[currentIndex];
    if (!topCardEl) return;

    const d = Draggable.create(topCardEl, {
      type: 'x,y',
      edgeResistance: 0.75,
      onDragStart() {
        if (isAnimating.current) return;
        gsap.to(topCardEl, { scale: STACK_CONFIG[0].scale * 1.04, duration: 0.15 });
      },
      onDrag() {
        gsap.set(topCardEl, { rotate: this.x * 0.06 });
      },
      onDragEnd() {
        if (isAnimating.current) return;
        const threshold = 110;

        if (Math.abs(this.x) > threshold || Math.abs(this.y) > threshold) {
          isAnimating.current = true;
          const vx = this.x > 0 ? 1 : -1;
          const vy = this.y > 0 ? 1 : -1;

          gsap.to(topCardEl, {
            x:        this.x + vx * 500,
            y:        this.y + vy * 300,
            opacity:  0,
            rotate:   this.x * 0.15,
            duration: 0.45,
            ease:     'power2.in',
            onComplete: () => {
              const next = (currentIndex + 1) % cards.length;
              gsap.set(topCardEl, {
                x:      STACK_CONFIG[cards.length - 1].x,
                y:      STACK_CONFIG[cards.length - 1].y + 20,
                scale:  STACK_CONFIG[cards.length - 1].scale,
                rotate: STACK_CONFIG[cards.length - 1].rotate,
                opacity: 0,
                zIndex:  0,
              });
              setCurrentIndex(next);
              isAnimating.current = false;
            },
          });

          applyStack((currentIndex + 1) % cards.length, true);
        } else {
          gsap.to(topCardEl, {
            x:        0,
            y:        0,
            scale:    STACK_CONFIG[0].scale,
            rotate:   STACK_CONFIG[0].rotate,
            duration: 0.7,
            ease:     'elastic.out(1, 0.7)',
          });
        }
      },
    })[0];

    draggablesRef.current = [d];

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      if (i !== currentIndex) {
        gsap.set(card, { pointerEvents: 'none' });
      } else {
        gsap.set(card, { pointerEvents: 'auto' });
      }
    });

    return () => {
      d?.kill();
    };
  }, [currentIndex, cards.length, applyStack]);

  const isMounted = useRef(false);
  useLayoutEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    applyStack(currentIndex, true);
  }, [currentIndex, applyStack]);

  return (
    <section ref={containerRef} className="min-h-[160vh] w-full relative flex items-center py-32 overflow-hidden bg-[#050505] select-none -mt-px">
      <div className="absolute inset-0 w-full h-full bg-linear-to-b from-[#010816] via-[#030308] to-[#040404] z-0"></div>
      <ParticleEffect rgb="80, 80, 200" count={80} speed={0.3} />

      <div className="absolute top-0 w-full h-96 bg-linear-to-b from-[#010816] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-96 bg-linear-to-t from-[#040404] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div ref={contentRef} className="max-w-xl text-left">
          <span className="text-xs font-bold tracking-[0.5em] uppercase text-indigo-400 mb-4 block font-mono">
            {zoneData.depth}
          </span>
          <h2 className="text-5xl md:text-7xl font-black font-instrument text-white mb-8 leading-[0.9] uppercase italic tracking-tighter">
            {zoneData.title.split(' ')[0]} <br />
            <span className="text-indigo-400">{zoneData.title.split(' ')[1]}</span>
          </h2>
          <p className="text-xl text-white/50 leading-relaxed mb-6 font-sans font-light">
            {zoneData.description}
          </p>
          <div className="flex items-center gap-4 text-indigo-400/60 font-mono text-[10px] tracking-widest uppercase mb-12">
             <div className="w-12 h-px bg-indigo-400/20" />
             <span>DECRYPTING LOGS</span>
             <div className="w-12 h-px bg-indigo-400/20" />
          </div>
        </div>

        <div className="relative h-[650px] flex items-center justify-center lg:justify-end lg:pr-12">
          {cards.map((fact, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="absolute w-[300px] md:w-[350px] p-8 rounded-[3rem] bg-[#080808] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col group active:cursor-grabbing hover:border-indigo-400/20 cursor-grab overflow-hidden will-change-transform"
              style={{ transformOrigin: 'bottom center', display: 'flex' }}
            >
              <div className="w-full aspect-square mb-6 relative pointer-events-none flex items-center justify-center bg-black/40 rounded-[2rem] overflow-hidden">
                <img 
                  src={fact.image} 
                  alt={fact.title} 
                  className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,1)] brightness-75 contrast-125 group-hover:brightness-100 transition-all duration-700"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-radial-gradient(circle,rgba(79,70,229,0.05)_0%,transparent_70%) -z-10"></div>
              </div>

              <div className="flex flex-col gap-3 pointer-events-none">
                <h3 className="text-2xl md:text-3xl font-instrument font-black text-white uppercase leading-tight tracking-tight">
                  {fact.title}
                </h3>
                <p className="text-sm text-white/30 leading-relaxed font-sans font-light">
                  {fact.content}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center opacity-40 pointer-events-none text-indigo-500/50">
                <span className="text-[9px] font-mono tracking-widest uppercase">
                  VOID.LOG_{index + 1}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MidnightZone;
