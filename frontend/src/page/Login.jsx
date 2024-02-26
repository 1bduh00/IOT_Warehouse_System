import React, { useEffect, useState } from 'react'
import "../App.css"
import loginImage from "../assets/login.jpg"
import passwd from "../assets/passwd.png"
import Email from "../assets/email.png"
import axios from 'axios'

function Login() {

  const [email, setEmail] = useState();
  const [mdp, setPassword] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [ValidPassword, setValidPassword] = useState(true);
  const [ShowAlert, setVisible] = useState(false);

 
  const HandleEmail = (event)=>{
    setEmail(event.target.value)
}
const HandlePassword = (event)=>{
    setPassword(event.target.value)
}
  const Login = async() => {
    const obj = {
      username : email,
      password : mdp
    }
    if(email && mdp){
      axios.post("http://172.171.247.161:8080/api/login",obj)
      .then(response => {
        const token = response.data.token
        if(token){
          localStorage.setItem('accessToken', token);
          window.location.href = '/Dashboard';
        }else{
          setVisible(true)
          setTimeout(()=>{
            setVisible(false)
          },2500)
        }
        
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
    }else{
      setVisible(true)
          setTimeout(()=>{
            setVisible(false)
          },2500)
    }
    
  };
  return (
    <div className='login-container'>
        <div className="login-container_form">
          <form className="form">
              <p className="form-title">WELCOME TO ORTA </p>
              <p className="form-message">Welcome to iot warehouse managment system.
                      Register as a member to experience. </p>

              <span className='alert' Style={ShowAlert ? "display:block;" : "display:none;"}>Invalid credentiels !</span>
              <label className='form-input'>
              
                  <img src={Email} alt="" />
                  <input required="" placeholder="email" type="email" onChange={HandleEmail}  />
              </label> 
                  
              <label className="form-input">
                  <img src={passwd} alt="" />
                  <input required="" placeholder="password" type="password" onChange={HandlePassword} />
              </label>
            
              <div className="from-keepSession">
                  <input type="checkbox" />
                  <span>Keep my session alive</span>
              </div>
              <input type='button' value="Submit" className="submit" onClick={Login} />
          </form>
        </div>
        <div className="login-container_image">
            <img src={loginImage} alt="" />
        </div>
    </div>
  )
}

export default Login