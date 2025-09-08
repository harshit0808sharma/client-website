import React from 'react'
import SalonHeader from '../components/salon/Header'
import SalonAbout from '../components/salon/About'
import SalonFooter from '../components/salon/Footer'
import salonData from '../data/salon.json'

export const metadata = {
  title: salonData?.about?.title,
  description: salonData?.about?.paragraph,
}

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