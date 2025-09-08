import React from 'react'
import SalonHeader from '../components/salon/Header'
import SalonFooter from '../components/salon/Footer'
import SalonServices from '../components/salon/Services'

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