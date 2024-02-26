import React from 'react'
import Orta from "../assets/Orta.png"
import dash from "../assets/dash.png"
import logout from "../assets/logout.png"

function Navbar() {

  const Logout = ()=>{
    localStorage.removeItem('accessToken');
    window.location.href = "/"
  }
  return (
    <div className="SideBar">
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
    <div className="SideBar-logout" onClick={Logout}>
        <img src={logout} alt="" />
    </div>
    </div>
  )
}

export default Navbar