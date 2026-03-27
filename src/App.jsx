import React, { useState } from 'react'

import DepthMeter from './components/DepthMeter'
import LoadingScreen from './components/LoadingScreen'
import ScrollTop from './components/ScrollTop'
  
import MainSec from './Sections/MainSec'
import SunLightZone from './Sections/SunLightZone'
import TwilightZone from './Sections/TwilightZone'
import MidnightZone from './Sections/MidnightZone'
import AbyssalZone from './Sections/AbyssalZone'
import HadalZone from './Sections/HadalZone'

import SonarScan from './components/SonarScan'

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className='w-full bg-black text-white selection:bg-sky-500/30 overflow-x-hidden relative'>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <SonarScan />
      <DepthMeter />
      
      <main className={`transition-all duration-1000 ease-in-out ${loading ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <MainSec />
        <SunLightZone />
        <TwilightZone />
        <MidnightZone />
        <AbyssalZone />
        <HadalZone />
      </main>
      <ScrollTop />
    </div>
  )
}

export default App