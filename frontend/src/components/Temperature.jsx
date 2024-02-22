import React from 'react'
import tmp from "../assets/Temperature.png"

function Temperature(props) {
  return (
    <div className='Temperature'>
        <div className="Temperature-container">
          <img src={tmp} alt="" />
          <span>Temperature</span>
          <span>{props.value} C°</span>
        </div>
    </div>
  )
}

export default Temperature