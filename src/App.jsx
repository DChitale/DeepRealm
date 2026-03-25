import React from 'react'
import Navbar from './components/Navbar'
import DepthMeter from './components/DepthMeter'
  
import MainSec from './Sections/MainSec'
import SunLightZone from './Sections/SunLightZone'
import TwilightZone from './Sections/TwilightZone'
import MidnightZone from './Sections/MidnightZone'
import AbyssalZone from './Sections/AbyssalZone'
import HadalZone from './Sections/HadalZone'

const App = () => {
  return (
    <div className='w-full bg-black text-white'>
      <DepthMeter />
      <MainSec />
      <SunLightZone />
      <TwilightZone />
      <MidnightZone />
      <AbyssalZone />
      <HadalZone />
    </div>
  )
}

export default App