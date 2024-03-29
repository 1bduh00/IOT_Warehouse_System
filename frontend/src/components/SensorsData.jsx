import React, { useEffect, useRef, useState } from 'react'
import { useWebSocket } from '../websocket/WebSocketProvider';

function SensorsData(props) {

  const {webSocketConnection,DisplayPopup,  setPopup , setTrueCode,trueCode} = useWebSocket();
  const [State , setState] = useState(false);
  const [VentSTate , setVenState] = useState(false);
  const checkboxRef = useRef(null);
  const Vent = useRef(null);
  
  useEffect(()=>{
    if(!DisplayPopup && !trueCode){
      setState(false)
      if (checkboxRef.current) {
        checkboxRef.current.checked = false;
      }
    }

  },[DisplayPopup])


  const handleState = ()=>{
    if(State){
      if(webSocketConnection){
        webSocketConnection.send("/app/private",{},"OFF")
        setState(false)
        setTrueCode(false)
      }
    }
    setState(!State)
    if(props.title === "private" && !State){
      setPopup(true)
    }
  }

  const HandVent = ()=>{
    if(VentSTate){
      if(webSocketConnection){
        webSocketConnection.send("/app/Ventilateur",{},"OFF")
      }
      console.log(false)
      setVenState(!VentSTate)
    }
    else{
      if(webSocketConnection){
        webSocketConnection.send("/app/Ventilateur",{},"ON")
      }
      console.log(true)
      setVenState(!VentSTate)
    }
    
  }

  return (
    <div className='w-40 sm:w-2/5 my-2 px-3 border py-2  md:w-1/5 flex justify-between rounded shadow-sm '>
        <div >
          <img src={props.img} alt="" className='w-8 pb-2' />
          <span className='font-medium'>{props.title}</span>
        </div>
        {
            props.button ?
            <label class="switch ">
            <input type="checkbox" className='opacity-0 h-0 w-0' ref={props.title === "private" ? checkboxRef : Vent}/> 
            <span class="slider"  onClick={props.title === "private" ? handleState : HandVent}></span> 
            </label>
              :
            <span className='text-sm font-medium md:text-xl'>{props.title === "Employees" ? props.prctg : props.prctg +"%"} </span> 
        }
        
    </div>
  )
}

export default SensorsData