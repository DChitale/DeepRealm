import React from 'react'
import Navbar from '../components/Navbar'
import OceanScene from '../components/OceanScene'
import Hero from '../components/Hero'

const SunlightZone = () => {
  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* Three.js Ocean Background */}
      <OceanScene />

      {/* UI Overlay */}
      <div className='relative z-10 h-full w-full'>
        <Navbar />
        <Hero/>
      </div>

      {/* Seamless blend gradient to Section 2 */}
      <div className="absolute bottom-0 w-full h-96 bg-linear-to-t from-[#0E1317] to-transparent z-20 pointer-events-none" />
    </div>
  )
}

export default SunlightZone