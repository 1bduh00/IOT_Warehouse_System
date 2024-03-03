import React, { useEffect, useRef, useState } from 'react'
import { useWebSocket } from '../websocket/WebSocketProvider';

function SensorsData(props) {

  const {webSocketConnection,DisplayPopup,  setPopup , setTrueCode,trueCode} = useWebSocket();
  const [State , setState] = useState(false);
  const checkboxRef = useRef(null);
  
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

  return (
    <div className='Sensors-section_item'>
        <div>
        <img src={props.img} alt="" />
        <span>{props.title}</span>
        </div>
        {
            props.button ?
            <label class="switch"> 
            <input type="checkbox" ref={checkboxRef}/> 
            <span class="slider"  onClick={handleState}></span> 
            </label>
              :
            <span className='prctg'>{props.title === "Employees" ? props.prctg : props.prctg +"%"} </span> 
        }
        
    </div>
  )
}

export default SensorsData