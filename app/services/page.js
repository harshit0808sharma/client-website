import React from 'react'
import SalonHeader from '../components/salon/Header'
import SalonFooter from '../components/salon/Footer'
import SalonServices from '../components/salon/Services'
import salonData from '../data/salon.json'

export const metadata = {
  title: salonData?.services?.title,
  description: salonData?.services?.description,
}

const Services = () => {
  return (
    <>
      <div className="w-full min-h-screen pt-20">
        <SalonHeader/>
        <SalonServices/>
        <SalonFooter/>
      </div>
    </>
  )
}

export default Services;