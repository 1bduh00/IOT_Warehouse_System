import React, { useEffect, useState } from 'react'
import Orta from "../assets/Orta.png"
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";

function Navbar() {

  const [active,setActive] = useState(null)

  useEffect(()=>{
    setActive("Dashboard")
  },[])
  
  const Logout = ()=>{
    localStorage.removeItem('accessToken');
    window.location.href = "/"
  }
  return (
    <div className=" hidden lg:flex flex-col relative bg-gray-50 w-36 h-full shadow-sm ">
         <div className="py-8  flex justify-center">
          <img src={Orta} alt="" className='w-12'/>
        </div>
        <div className={`flex flex-col items-center py-2 cursor-pointer ${active === 'Dashboard' ? 'text-indigo-600' : ''}`}
              onClick={()=> setActive("Dashboard")}
        >
            <RxDashboard className='' size="20" />
            <span className='mt-1 font-medium'>Dashboard</span>
        </div>
        <div className={`flex flex-col items-center py-2 cursor-pointer ${active === 'Settings' ? 'text-indigo-600' : ''}`}
              onClick={()=> setActive("Settings")}>
            <CiSettings size="25"/>
            <span className='mt-1 font-medium'>Settings</span>
        </div>
        <div className="absolute bottom-4 left-1/4 cursor-pointer" onClick={Logout}>
            <LuLogOut className='ml-4' size="20" />
            <span className='font-medium'>Logout</span>
        </div>
    </div>
  )
}

export default Navbar