import React from 'react'
import SalonHeader from '../components/salon/Header'
import SalonAbout from '../components/salon/About'
import SalonFooter from '../components/salon/Footer'

const About = () => {
  return (
    <>
      <div className="w-full min-h-screen pt-20">
        <SalonHeader />
        <SalonAbout />
        <SalonFooter />
      </div>
    </>
  )
}

export default About