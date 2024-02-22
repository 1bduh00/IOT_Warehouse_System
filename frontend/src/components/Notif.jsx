import React from 'react'
import alert from "../assets/alert.png"

function Notif() {
  return (
    <div className='Notif'>
        
        <div className="Notif-container">
            <span className="Event">Event</span>
            <div className="column-container">
            <div className="Notif-container-colum">
                <img src={alert} alt="" />
                <p>the private room's door was open succefully</p>
            </div>
            <div className="Notif-container-colum">
                <img src={alert} alt="" />
                <p>the private room's door was open succefully</p>
            </div>
            <div className="Notif-container-colum">
                <img src={alert} alt="" />
                <p>the private room's door was open succefully</p>
            </div>
            <div className="Notif-container-colum">
                <img src={alert} alt="" />
                <p>the private room's door was open succefully</p>
            </div>
           
            </div>
        </div>
    </div>
  )
}

export default Notif