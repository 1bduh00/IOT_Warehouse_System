import React, { useEffect, useRef, useState } from 'react'
import { useWebSocket } from '../websocket/WebSocketProvider';

function SensorsData(props) {

  const { webSocketConnection ,DisplayPopup,  setPopup} = useWebSocket();
  const [State , setState] = useState(false);
  const checkboxRef = useRef(null);

  useEffect(()=>{
    // console.log(State)
    if(webSocketConnection){
      if(State){
        webSocketConnection.send(`/app/${props.title}`,{},"ON")
      }else{
        webSocketConnection.send(`/app/${props.title}`,{},"OFF")
      }
      
  }
  },[State])

  useEffect(()=>{
    if(!DisplayPopup){
      setState(false)
      if (checkboxRef.current) {
        checkboxRef.current.checked = false;
      }
    }
  },[DisplayPopup])


  const handleState = ()=>{
    setState(!State)
    if(props.title === "private"){
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
            props.prctg ? 
            <span className='prctg'>{props.title === "Employees" ? props.prctg : props.prctg +"%"} </span> : 
              <label class="switch">
                  <input type="checkbox" ref={checkboxRef}/>
                  <span class="slider"  onClick={handleState}></span>
              </label>
        }
        
    </div>
  )
}

export default SensorsData