import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 2-second total duration (approx 2000ms)
    // 2000ms / 100 steps = 20ms per step
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 800); 
          }, 300);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black transition-opacity duration-800 ${isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Background Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* GIF / Technical Area */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* The Fish / Background GIF */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/videos/loading.gif" 
                    alt="Loading Background" 
                    className="w-full h-full object-cover opacity-80 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* PROGRESS BAR (PINNED BELOW CENTER) */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-xs mt-[20vh]">
                
                {/* Minimalist Bar */}
                <div className="w-full flex flex-col gap-2">
                    <div className="flex justify-between items-end px-0.5">
                        <span className="text-[8px] font-mono text-white/30 tracking-[0.4em] uppercase">INIT</span>
                        <span className="text-sm font-mono font-bold text-white leading-none">{Math.round(progress)}%</span>
                    </div>

                    <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
                        <div 
                            className="absolute inset-y-0 left-0 bg-white transition-all duration-75 ease-linear" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    
                    <div className="flex justify-center">
                         <p className="text-[7px] font-mono text-white/20 tracking-[0.5em] uppercase">Something is waiting for you</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Brackets */}
      <div className="absolute top-12 left-12 w-4 h-4 border-t border-l border-white/20"></div>
      <div className="absolute top-12 right-12 w-4 h-4 border-t border-r border-white/20"></div>
      <div className="absolute bottom-12 left-12 w-4 h-4 border-b border-l border-white/20"></div>
      <div className="absolute bottom-12 right-12 w-4 h-4 border-b border-r border-white/20"></div>

    </div>
  );
};

export default LoadingScreen;
