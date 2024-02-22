import React, { useEffect, useState } from 'react'
import { useWebSocket } from '../websocket/WebSocketProvider';

function SensorsData(props) {

  const { webSocketConnection} = useWebSocket();
  const [State , setState] = useState(false);

  useEffect(()=>{
    console.log(State)
    if(webSocketConnection){
      if(State){
        webSocketConnection.send(`/app/${props.title}`,{},"ON")
      }else{
        webSocketConnection.send(`/app/${props.title}`,{},"OFF")
      }
      
  }
  },[State])

  const handleState = ()=>{
    setState(!State)
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
                  <input type="checkbox" />
                  <span class="slider" onClick={handleState}></span>
              </label>
        }
        
    </div>
  )
}

export default SensorsData