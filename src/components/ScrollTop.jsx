import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: 0,
      ease: 'power4.inOut'
    });
  };

  return (
    <div 
      className={`fixed bottom-28 right-6 md:bottom-12 md:right-12 z-150 transition-all duration-700 ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-12 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 hover:scale-110 active:scale-95 transition-all duration-300 group shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer"
        aria-label="Scroll to Top"
      >
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-linear-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <ArrowUp size={24} className="md:w-7 md:h-7 group-hover:-translate-y-1 transition-transform duration-500" />
        
        {/* Subtle Ring Loader/Glow */}
        <div className="absolute inset-[-4px] rounded-2xl md:rounded-4xl border border-white/5 opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
      </button>

      {/* Side Label */}
      <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 whitespace-nowrap overflow-hidden pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase block translate-x-12 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
            Ascend
          </span>
      </div>
    </div>
  );
};

export default ScrollTop;
