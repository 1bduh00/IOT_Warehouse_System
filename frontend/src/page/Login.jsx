import React from 'react'
import "../App.css"
import loginImage from "../assets/login.jpg"
import passwd from "../assets/passwd.png"
import email from "../assets/email.png"

function Login() {
  return (
    <div className='login-container'>
        <div className="login-container_form">
          <form class="form">
              <p class="form-title">WELCOME TO ORTA </p>
              <p class="form-message">Welcome to iot warehouse managment system.
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
              <button class="submit">Submit</button>
          </form>
        </div>
        <div className="login-container_image">
            <img src={loginImage} alt="" />
        </div>
    </div>
  )
}

export default Login