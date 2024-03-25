import React from 'react'
import profile from "../assets/profile.png"
import Arrow from "../assets/Arrow.png"
import { BiHelpCircle } from "react-icons/bi";
import { CiMenuFries } from "react-icons/ci";

function Header() {
  return (
    <>
      <div className="w-full py-1 flex justify-between items-center  px-12">
          <CiMenuFries className='block lg:hidden cursor-pointer' size="30"/>
          <span className='hidden lg:block text-2xl font-medium'>Dashbord</span>
         <div className='flex items-center '>
          <div className='flex items-center'>
                <BiHelpCircle size={20}/>
                <span className='font-medium px-1'>Help</span>
            </div>
            <span className='h-6 w-0.5 bg-gray-400 mx-2'></span>
            <div className='flex items-center'>
              <img src={profile} alt="" />
              <span className='font-medium'>Susan</span>
              <img src={Arrow} alt="" className='object-contain ml-2'/>
            </div>
         </div>
          
      </div>
    </>
  )
}

export default Header