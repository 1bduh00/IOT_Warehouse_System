import React, { useEffect, useState } from 'react'
import alert from "../assets/alert.png"
import ntf from "../assets/Notif.png"
import Great from "../assets/Great.png"
import { useWebSocket } from '../websocket/WebSocketProvider';

function Notif(props) {
    const { webSocketConnection } = useWebSocket();
    const [EventsList, setMyList] = useState([]);

    useEffect(()=>{
        if(props.data.temperature > 30){
            console.log("temperature")
            setMyList(prevList => [
                ...prevList,
                {
                  mssg: "The temperature exceeded 30 °C",
                  img: alert
                }
              ]); 
        }
        if(props.data.humidity > 50){
            console.log("humidity")
            setMyList(prevList => [
                ...prevList,
                {
                  mssg: "The humidity exceeded 50%",
                  img: alert
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
        if( mssg === "opened" ){
            setMyList(prevList => [
                ...prevList,
                {
                  mssg: "The private room was opened succefully",
                  img: Great
                }
              ]);
        }

        
    }
  return (
    <div className='Notif'>
        <div className="Notif-container">
            <span className="Event">Events</span>
            <div className="column-container">

                {EventsList.map((item, index)=>( 
                    <div key={index} className="Notif-container-colum">
                    <img src={item.img} alt="" />
                    <p>{item.mssg}</p>
                </div>
                ))
                
            }
            
            </div>
        </div>
    </div>
  )
}

export default Notif