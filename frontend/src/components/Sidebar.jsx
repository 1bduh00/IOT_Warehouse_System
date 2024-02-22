import React from 'react'
import Orta from "../assets/Orta.png"
import dash from "../assets/dash.png"
import logout from "../assets/logout.png"

function SideBar() {
  return (
    <>
     <div className="SideBar-logo">
        <img src={Orta} alt="" />
        <span>ORTA</span>
    </div>
    <div className="SideBar-Dash">
        <div className="dash">
            <img src={dash} alt="" />
            <span>Dashboard</span>
        </div>
    </div>
    <div className="SideBar-logout">
        <img src={logout} alt="" />
    </div>
    </>
  )
}

export default SideBar