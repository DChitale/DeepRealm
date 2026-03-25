import React, { useState, useRef } from 'react';
import { HeadphoneOff, Headphones } from 'lucide-react';

const Navbar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <nav className='absolute top-0 w-full h-16 px-5 py-8 lg:px-10  flex items-center justify-between z-50'>
      <div className='text-4xl text-white italic tracking-wide font-instrument'>
        <h1>DeepRealm</h1>
      </div>
      
      <button 
        onClick={toggleAudio}
        className='p-3 text-white border border-white/20 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
        aria-label="Toggle ambient sound"
      >
        {isPlaying ? (
          <Headphones className='h-6 w-6' />
        ) : (
          <HeadphoneOff className='h-6 w-6' />
        )}
      </button>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/sound/sound.mp3" loop />
    </nav>

  );
};

export default Navbar;