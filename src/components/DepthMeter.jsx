import React, { useState, useEffect } from 'react';

const ZONES = [
  {
    name: "Sunlight Zone",
    subName: "(Epipelagic)",
    min: 0,
    max: 200,
    color: "text-sky-300",
    bg: "bg-sky-300",
    desc: "Bright, visible sun rays"
  },
  {
    name: "Twilight Zone",
    subName: "(Mesopelagic)",
    min: 200,
    max: 1000,
    color: "text-blue-400",
    bg: "bg-blue-400",
    desc: "Fading light, deep blues"
  },
  {
    name: "Midnight Zone",
    subName: "(Bathypelagic)",
    min: 1000,
    max: 4000,
    color: "text-indigo-400",
    bg: "bg-indigo-400",
    desc: "Total darkness, neon accents"
  },
  {
    name: "The Abyss",
    subName: "(Abyssopelagic)",
    min: 4000,
    max: 6000,
    color: "text-purple-500",
    bg: "bg-purple-500",
    desc: "High-pressure HUD"
  },
  {
    name: "The Hadal Zone",
    subName: "(Trenches)",
    min: 6000,
    max: 11000,
    color: "text-slate-300",
    bg: "bg-slate-300",
    desc: "Ghostly translucent visuals"
  }
];

const MAX_DEPTH = 11000;

const DepthMeter = () => {
  const [depth, setDepth] = useState(0);
  const [currentZone, setCurrentZone] = useState(ZONES[0]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setDepth(0);
        setScrollProgress(0);
        return;
      }

      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);
      
      const totalZones = ZONES.length;
      const zoneIndex = Math.min(Math.floor(progress * totalZones), totalZones - 1);
      const zoneProgress = (progress * totalZones) - zoneIndex;
      
      const zone = ZONES[zoneIndex];
      const calculatedDepth = Math.round(zone.min + (zone.max - zone.min) * zoneProgress);
      
      setDepth(calculatedDepth);
      setCurrentZone(zone);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Layout (Right-aligned vertical HUD) */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 items-center gap-4 pointer-events-none">
        
        {/* Zone Info HUD */}
        <div className="flex flex-col items-end text-right backdrop-blur-sm bg-black/40 p-6 rounded-xl border border-white/10 shadow-lg">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-1 font-sans">
            Current Depth
          </span>
          <div className="flex items-baseline gap-1 mb-2">
            <span className={`text-5xl font-semibold font-instrument ${currentZone.color}`}>
              {depth.toLocaleString()}
            </span>
            <span className={`text-sm ${currentZone.color} opacity-80`}>m</span>
          </div>
          
          <h4 className={`text-xl font-medium font-instrument ${currentZone.color}`}>
            {currentZone.name}
          </h4>

       
        </div>

        {/* Vertical Progress Bar */}
        <div className="h-64 w-2 bg-black/40 rounded-full overflow-hidden border border-white/10 relative">
          <div 
            className={`absolute top-0 left-0 w-full rounded-full transition-all duration-300 ease-out ${currentZone.bg}`}
            style={{ height: `${scrollProgress * 100}%` }}
          />
          {/* Markers for zones (every 20%) */}
          {ZONES.map((_, idx) => (
            <div 
              key={idx}
              className="absolute left-0 w-full h-px bg-white/20"
              style={{ top: `${(idx / ZONES.length) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Mobile Layout (Bottom-anchored horizontal pill) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm pointer-events-none">
        <div className="backdrop-blur-sm bg-black/50 p-4 rounded-2xl border border-white/10 shadow-lg flex flex-col gap-3">
          
          <div className="flex justify-between items-end">
            <span className={`text-sm font-semibold tracking-widest uppercase font-sans ${currentZone.color}`}>
              {currentZone.name}
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-instrument font-semibold ${currentZone.color}`}>
                {depth.toLocaleString()}
              </span>
              <span className={`text-xs font-sans ${currentZone.color} opacity-80`}>m</span>
            </div>
          </div>

          {/* Horizontal Progress Bar */}
          <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden relative">
            <div 
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out ${currentZone.bg}`}
              style={{ width: `${scrollProgress * 100}%` }}
            />
            {ZONES.map((_, idx) => (
              <div 
                key={idx}
                className="absolute top-0 h-full w-px bg-white/30"
                style={{ left: `${(idx / ZONES.length) * 100}%` }}
              />
            ))}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default DepthMeter;