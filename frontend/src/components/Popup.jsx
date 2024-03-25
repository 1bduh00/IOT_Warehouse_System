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
    <div class="absolute flex justify-center items-center z-10 w-full h-full bg-gray-400 bg-opacity-50 " onClick={setFalse}>
        <div className="w-80 h-32 bg-white rounded" onClick={(e)=> e.stopPropagation()}>
            <div className="flex px-2 justify-center text-xl font-medium py-2">Enter Code</div>
            <div className="w-4/5 flex justify-evenly ml-8 mt-3">
                {inputRefs.map((ref, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={ref}
                    onChange={(e) => handleInputChange(index, e)}
                    className='pl-2 border border-gray-300 rounded w-8 h-8 bg-gray-100 bg-opacity-60'
                  />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Popup