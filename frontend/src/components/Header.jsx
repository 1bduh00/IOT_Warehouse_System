import React, { useEffect, useState } from 'react'
import UserImg from "../assets/UserImg.png"

export function Header() {
  // *********
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => {
      clearInterval(timerID);
    };
  }, []); 
  function tick() {
    setCurrentTime(new Date());
  }
  // *********
    
  return (
    <header className='bg-gray-100 p-4 flex justify-end items-center '>
        <div className="profile px-3 flex  bg-gray-200 rounded-2xl items-center ">
          <div><img src={UserImg} alt="" /></div>
          <ul className='px-2'>
            <li>Ismail Offline</li>
            <li className=''>chef Offline</li>
          </ul>
        </div>
        <div className="time">{currentTime.toLocaleTimeString()} </div>
    </header>
  )
}

