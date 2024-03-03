import React, { useEffect, useRef } from 'react'
import { useWebSocket } from '../websocket/WebSocketProvider';

function Popup() {
  const { webSocketConnection, setPopup  , setFalseCode , setTrueCode} = useWebSocket();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const Code = Array.from({ length: 4 });
  

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    // Move focus to the next input when a digit is entered
    Code[index] = value
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
    else if (index === inputRefs.length - 1){
      setPopup(false)
      if(webSocketConnection && Code.join("") === "0258"){
          webSocketConnection.send("/app/private",{},"ON")
          setTrueCode(true)
      }else{
        setFalseCode(true)
        setTrueCode(false)
      }
    }
    // You can add additional logic here, such as handling the entered code
  };

  const setFalse = ()=>{
    setPopup(false)
    setTrueCode(false)
  }
  return (
    <div class="private-room_popup" onClick={setFalse}>
        <div className="code" onClick={(e)=> e.stopPropagation()}>
            <div className="EnterCode">Enter Code</div>
            <div className="Inputs">
                {inputRefs.map((ref, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={ref}
                    onChange={(e) => handleInputChange(index, e)}
                    
                  />
                ))}
              
            </div>
        </div>
    </div>
  )
}

export default Popup