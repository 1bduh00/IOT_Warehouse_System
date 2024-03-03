import React from 'react'
import profile from "../assets/profile.png"
import Arrow from "../assets/Arrow.png"

function Header() {
  return (
    <>
      <div className="header-section_profile">
          <img src={profile} alt="" />
          <span>Susan</span>
          <img src={Arrow} alt="" />
      </div>
    </>
  )
}

export default Header