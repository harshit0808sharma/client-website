import React from 'react'
import SalonHeader from '../components/salon/Header'
import SalonFooter from '../components/salon/Footer'
import SalonTeam from '../components/salon/Team'

const Team = () => {
  return (
    <>
      <div className="w-full min-h-screen pt-20">
        <SalonHeader/>
        <SalonTeam/>
        <SalonFooter/>
        </div>
    </>
  )
}

export default Team;