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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pressure = Math.round(1 + depth / 10);
  
  const getTemperature = (d) => {
    if (d < 200) return (25 - (d / 200) * 5).toFixed(1);
    if (d < 1000) return (20 - ((d - 200) / 800) * 15).toFixed(1);
    return (5 - ((d - 1000) / 10000) * 3).toFixed(1);
  };
  const temperature = getTemperature(depth);

  return (
    <>
      {/* Desktop Layout (Bottom-center wide HUD) */}
      <div className="hidden md:flex fixed left-1/2 bottom-8 -translate-x-1/2 z-100 items-center pointer-events-none w-full max-w-4xl px-8">
        
        <div className="w-full bg-white/10 bg-linear-to-b from-transparent to-black/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-4 md:p-6 flex flex-col gap-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          
          <div className="flex justify-between items-end">
             <div className="flex flex-col gap-0.5">
                <span className={`text-[9px] font-mono uppercase tracking-[0.3em] opacity-40 mb-1 ${currentZone.color}`}>ZONE_TELEM</span>
                <h4 className={`text-xl font-instrument font-bold uppercase tracking-widest leading-none ${currentZone.color}`}>
                  {currentZone.name}
                </h4>
             </div>

             <div className="flex gap-10 items-end">
                {/* Temperature Stats */}
                <div className="flex flex-col items-end leading-none">
                   <span className="text-[9px] font-mono uppercase opacity-30 mb-1.5">Temp</span>
                   <div className="flex items-baseline gap-0.5">
                      <span className={`text-xl md:text-2xl font-semibold font-instrument ${currentZone.color}`}>{temperature}</span>
                      <span className={`text-[10px] font-sans font-medium uppercase ${currentZone.color}`}>°C</span>
                   </div>
                </div>

                {/* Pressure Stats */}
                <div className="flex flex-col items-end leading-none">
                   <span className="text-[9px] font-mono uppercase opacity-30 mb-1.5">Pressure</span>
                   <div className="flex items-baseline gap-0.5">
                      <span className={`text-xl md:text-2xl font-semibold font-instrument ${currentZone.color}`}>{pressure.toLocaleString()}</span>
                      <span className={`text-[10px] font-sans font-medium uppercase ${currentZone.color}`}>atm</span>
                   </div>
                </div>

                {/* Depth Stats */}
                <div className="flex flex-col items-end leading-none">
                   <span className="text-[9px] font-mono uppercase opacity-30 mb-1.5">Depth</span>
                   <div className="flex items-baseline gap-1">
                      <span className={`text-4xl md:text-5xl font-semibold font-instrument tracking-tight ${currentZone.color}`}>
                        {depth.toLocaleString()}
                      </span>
                      <span className={`text-xs font-sans font-medium uppercase tracking-widest ${currentZone.color}`}>m</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Horizontal Progress Bar with Segment Markers */}
          <div className="h-1 w-full bg-black/60 rounded-full overflow-hidden relative border border-white/5">
            <div 
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out ${currentZone.bg}`}
              style={{ width: `${scrollProgress * 100}%` }}
            />
            {ZONES.map((_, idx) => (
              <div 
                key={idx}
                className="absolute top-0 h-full w-[1.5px] bg-white/10"
                style={{ left: `${(idx / (ZONES.length - 1)) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout (Bottom-anchored horizontal pill) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-sm pointer-events-none">
        <div className="backdrop-blur-xl bg-black/60 p-4 rounded-2xl border border-white/10 shadow-lg flex flex-col gap-3">
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className={`text-[8px] font-mono tracking-widest uppercase opacity-40 ${currentZone.color}`}>
                {currentZone.name}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className={`text-3xl font-instrument font-medium ${currentZone.color}`}>
                  {depth.toLocaleString()}
                </span>
                <span className={`text-xs font-sans ${currentZone.color} opacity-60 uppercase`}>m</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
               <div className="flex items-baseline gap-1 leading-none">
                  <span className={`text-xs font-mono ${currentZone.color} opacity-40 uppercase`}>T:</span>
                  <span className={`text-sm font-instrument ${currentZone.color}`}>{temperature}°C</span>
               </div>
               <div className="flex items-baseline gap-1 leading-none">
                  <span className={`text-xs font-mono ${currentZone.color} opacity-40 uppercase`}>P:</span>
                  <span className={`text-sm font-instrument ${currentZone.color}`}>{pressure} atm</span>
               </div>
            </div>
          </div>

          {/* Horizontal Progress Bar */}
          <div className="h-1 w-full bg-black/60 rounded-full overflow-hidden relative">
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