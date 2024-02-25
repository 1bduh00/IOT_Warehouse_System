import React, { useEffect, useRef, useState } from 'react'
import { useWebSocket } from '../websocket/WebSocketProvider'
import SideBar from '../components/SideBar.jsx';
import Header from '../components/Header';
import SensorsData from '../components/SensorsData';
import humidity from '../assets/humidity.png';
import lights from '../assets/lights.png';
import employees from '../assets/employees.png';
import room from '../assets/private.png';
import Temperature from '../components/Temperature';
import Racs from '../components/Racs';
import RacsComd from '../components/RacsComd';
import Notif from '../components/Notif';
import Popup from '../components/Popup';



function Dashboard() {
    const { webSocketConnection, establishConnection , closeConnection , DisplayPopup } = useWebSocket();
    const [sensorData , setSensorData] = useState();
    

    useEffect(() => {
        const StartConnection = async () => {
            await establishConnection();
          };
          StartConnection()
      }, []);

    useEffect(() => {
        // console.log('WebSocket connection is established and ready:', webSocketConnection);
        if(webSocketConnection){
            webSocketConnection.subscribe("/topic/data",onReceivemessage)
           
        }
    }, [webSocketConnection]);


    const onReceivemessage = (payload)=>{
        console.log(JSON.parse(payload.body))
        setSensorData(JSON.parse(payload.body))
    }

    return (
    <div className="Dashboard_container">
        {DisplayPopup?  <Popup /> : "" }
        
        <div className="SideBar">
           <SideBar />
        </div>
        <div className="Data-container">
            <div className="Header-section">
                <Header />
            </div>
            <div className="Sensors-section">
                <SensorsData title="Humidity" prctg={sensorData ? sensorData.humidity : "0"} img={humidity} />
                <SensorsData title="Employees" prctg={sensorData ? sensorData.employees : "0"} img={employees} />
                <SensorsData title="Lighting" button="yes" img={lights} />
                <SensorsData title="private" button="yes" img={room} />
            </div>
            <div className="Events-section">
                <Temperature value={sensorData ? sensorData.temperature : "0"}/>
                <Racs rac1={sensorData ? sensorData.Rac1 : "1"} rac2={sensorData ? sensorData.Rac2 : "2"} />
            </div>
            <div className="Notif-section">
                <RacsComd />
                <Notif data={sensorData? sensorData : ""} />
            </div>
        </div>
    </div>
    
  )
}


export default Dashboard