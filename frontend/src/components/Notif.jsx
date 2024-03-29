import React, { useEffect, useState } from 'react'
import alert from "../assets/alert.png"
import ntf from "../assets/Notif.png"
import Great from "../assets/Great.png"
import { useWebSocket } from '../websocket/WebSocketProvider';
import { IoIosNotificationsOutline } from "react-icons/io";

function Notif(props) {
    const { webSocketConnection , falseCode , setFalseCode} = useWebSocket();
    const [EventsList, setMyList] = useState([]);


    useEffect(()=>{
        if(props.data.temperature > 30){
            console.log("temperature")
            setMyList(prevList => [
                ...prevList,
                {
                  mssg: "The temperature exceeded 30 °C",
                  img: alert,
                  date : new Date()
                }
              ]); 
        }
        if(props.data.humidity > 60){
            setMyList(prevList => [
                ...prevList,
                {
                  mssg: "The humidity exceeded 60%",
                  img: alert,
                  date : new Date()
                }
              ]);
        }
    },[props.data])

    useEffect(()=>{
        if(webSocketConnection){
            webSocketConnection.subscribe("/topic/room_open",onReceivemessage)
        }
    },[webSocketConnection])

    const onReceivemessage = (payload)=>{
        const mssg = payload.body
        if(mssg){
            setMyList(prevList => [
                ...prevList,
                {
                  mssg: "The private room was opened succefully",
                  img: Great,
                  date : new Date()
                }
              ]);
        }
    }

    useEffect(()=>{
      if(falseCode){
        setMyList(prevList => [
          ...prevList,
          {
            mssg: "Incorrect code to open the private room ",
            img: ntf,
            date : new Date()
          }
        ]);
        setFalseCode(false)
      }
    },[falseCode])
    
  return (
    <div className='min-h-20 border rounded shadow-sm md:col-span-3 overflow-auto'>
        <div className='px-3 py-1 text-xl font-medium flex items-center '>
          
          <IoIosNotificationsOutline size={25} />
          <span className='pl-2 '>Notifications</span>
          </div>
        <div className="Notif-container border-top flex flex-col">
                <span className={`text-sm font-meduim py-2 ml-12 ${EventsList.length > 0 ? 'hidden' : 'block'}`} >Nothing for the moment...</span>
                {EventsList.map((item, index)=>( 
                    <div key={index} className="flex justify-between">
                        <div className='flex lg:px-8 px-2.5 py-1.5'>
                          <img src={item.img} alt="" className='md:w-6 w-4 object-contain' />
                          <p className='ml-2 text-gray-600 text-sm lg:text-base'>{item.mssg}</p>
                        </div>
                        <div className='flex items-center text-sm lg:mr-6 px-2'>
                          {item.date.toISOString().slice(0, 19).replace('T', ' ')}
                        </div>
                    </div>
                ))
            }
            
            
        </div>
    </div>
  )
}

export default Notif