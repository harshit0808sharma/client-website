import React from 'react'
import SalonHeader from '../components/salon/Header'
import SalonFooter from '../components/salon/Footer'
import SalonGetInTouch from '../components/salon/GetInTouch'

const Contact = () => {
  return (
    <>
      <div className="w-full min-h-screen pt-20">
        <SalonHeader />
        <SalonGetInTouch />
        <SalonFooter />
      </div>
    </>
  )
}

export default Contact;