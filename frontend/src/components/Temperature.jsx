import React from 'react'
import tmp from "../assets/Temperature.png"

function Temperature(props) {
  return (
    <div className='Temperature'>
        <div className="Temperature-container">
          <img src={tmp} alt="" />
          <span>Temperature</span>
          <span>{parseFloat(props.value).toFixed(2)} C°</span>
        </div>
    </div>
  )
}

export default Temperature