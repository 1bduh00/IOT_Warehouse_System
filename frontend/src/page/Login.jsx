import React, { useEffect, useState } from 'react'
import "../App.css"
import loginImage from "../assets/login.jpg"
import passwd from "../assets/passwd.png"
import email from "../assets/email.png"
import { useWebSocket } from '../websocket/WebSocketProvider'
import { Navigate } from 'react-router-dom'

function Login() {

  // const { webSocketConnection, establishConnection } = useWebSocket();
  const StartConnection = () => {
    window.location.href ="/dashboard"
    // The state update might not be immediate, so use a useEffect to log the updated state
  };

  // useEffect(() => {
  //   console.log('WebSocket connection is established and ready:', webSocketConnection);
  //   if(webSocketConnection){
  //     window.location.href ="/dashboard"
  //   }
  // }, [webSocketConnection]);
  return (
    <div className='login-container'>
        <div className="login-container_form">
          <form className="form">
              <p className="form-title">WELCOME TO ORTA </p>
              <p className="form-message">Welcome to iot warehouse managment system.
                      Register as a member to experience. </p>
              <label className='form-input'>
                  <img src={email} alt="" />
                  <input required="" placeholder="email" type="email"   />
              </label> 
                  
              <label className="form-input">
                  <img src={passwd} alt="" />
                  <input required="" placeholder="password" type="password"  />
              </label>
            
              <div className="from-keepSession">
                  <input type="checkbox" />
                  <span>Keep my session alive</span>
              </div>
              <input type='button' value="Submit" className="submit" onClick={StartConnection} />
          </form>
        </div>
        <div className="login-container_image">
            <img src={loginImage} alt="" />
        </div>
    </div>
  )
}

export default Login