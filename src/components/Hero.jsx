import React, { useLayoutEffect, useRef } from 'react'
import {ChevronsDown} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0,
        y: -50,
        ease: 'none'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className='absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 py-20 pointer-events-none'>
        
        <div ref={contentRef} className="flex flex-col items-center justify-center max-w-4xl">
            <h1 className='text-4xl md:text-6xl lg:text-7xl leading-tight font-instrument bg-linear-to-r from-[#121A24] to-[#2b5c8f] bg-clip-text text-transparent mb-5'>
              The Ocean holds more secrets than the stars.
            </h1>
            <p className='text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-8 font-sans font-light'>
              11,000 meters below. 95% unexplored. 100% breathtaking.
            </p>

            <div className="pointer-events-auto mt-4">
                <button className='group flex items-center gap-3 px-8 py-3.5 text-white border border-white/20 bg-white/10 backdrop-blur-md rounded-xl text-base font-medium hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'>
                  Dive In <ChevronsDown className='w-5 h-5 opacity-80 group-hover:translate-y-1 transition-transform' />
                </button>
            </div>
        </div>
        
    </div>
  )
}

export default Hero