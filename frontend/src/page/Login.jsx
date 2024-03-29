import React, { useState } from 'react'
import Orta from "../assets/Orta.png"
import img from "../assets/Performance overview-bro.png"

import axios from 'axios'
import Alerts from '../components/Alerts';


function Login() {

  const [email, setEmail] = useState();
  const [mdp, setPassword] = useState();
  // const [validEmail, setValidEmail] = useState(false);
  // const [ValidPassword, setValidPassword] = useState(true);
  const [ShowAlert, setVisible] = useState(false);
  
 
  const HandleEmail = (event)=>{
    setEmail(event.target.value)
}
const HandlePassword = (event)=>{
    setPassword(event.target.value)
}
  const Login = async() => {
    console.log(email,mdp)
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
    <div className="flex h-screen">
      
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 px-8  ">
        {ShowAlert? <Alerts/> : ""}
        <div className="flex mx-auto w-full max-w-sm  ">
          <img
            className="mr-2 h-10 w-auto "
            src={Orta}
            alt="Your Company"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
          WELCOME TO ORTA
          </h2>
        </div>

        <p className="mt-10 mx-auto w-full max-w-sm text-gray-400">
          Welcome to iot warehouse managment system.Register as a member to experience.
            
          </p>

        <div className="mt-10 mx-auto w-full max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={HandleEmail}
                  className="px-2 block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={HandlePassword}
                  className="px-2 block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex">
              <input type="checkbox" />
              <label className="pl-2 text-sm font-medium">keep my session alive</label>
            </div>
            <div>
              <input
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={Login}
                value="Sign in"
              />
            </div>
          </form>

        </div>
      </div>
        

        <div className="hidden lg:w-7/12 lg:flex lg:justify-center lg:content-center ">
            <img src={img} alt="" className="max-w-xl object-cover" />
        </div>
    </div>
  )
}

export default Login