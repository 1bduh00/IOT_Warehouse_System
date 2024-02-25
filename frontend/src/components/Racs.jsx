import React, { useEffect, useState } from 'react'
import racs from "../assets/RACs.png"

function Racs(props) {
  
  const [Hrac1 , setHrac1] = useState(0)
  const [Hrac2 , setHrac2] = useState(0)
  useEffect(()=>{
      switch(props.rac1){
        case 0 : setHrac1(0)
        break;
        case "1" : setHrac1("4rem")
        break;
        case "2" : setHrac1("8rem")
        break;
        default : setHrac1(0)
      }
  },[props.rac1])

  useEffect(()=>{
      switch(props.rac2){
        case 0 : setHrac2(0)
        break;
        case "1" : setHrac2("4rem")
        break;
        case 2 : setHrac2("8rem")
        break;
        default : setHrac2(0)
      }
  },[props.rac2])
  return (
    <div className='Racs'>
        <div className="Racs-container">
            <img src={racs} alt="" />
            <span className='Rac1' style={{height : Hrac1}}></span>
            <span className='Rac2' style={{height : Hrac2}}></span>
        </div>
    </div>
  )
}

export default Racs