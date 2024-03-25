import React, { useEffect, useState } from 'react'
import { useWebSocket } from '../websocket/WebSocketProvider'
import Header from '../components/Header';
import SensorsData from '../components/SensorsData';
import humidity from '../assets/humidity.png';
import employees from '../assets/employees.png';
import Temperature from '../components/Temperature';
import Racs from '../components/Racs';
import RacsComd from '../components/RacsComd';
import Notif from '../components/Notif';
import Popup from '../components/Popup';
import Navbar from '../components/Navbar';
import Ventilator from "../assets/Ventilator.png"
import protect from "../assets/protection.png"

function Dashboard() {
    const { webSocketConnection, establishConnection  , DisplayPopup } = useWebSocket();
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
        const resp = JSON.parse(payload.body)
        console.log(resp.humidity)
        setSensorData(JSON.parse(payload.body))
    }

    return (
    <div className="flex h-screen relative">
        {DisplayPopup?  <Popup /> : "" }
        <Navbar />
        <div className="w-full flex flex-col">
                <Header />
            <div className='h-full w-full'>
                <div className="flex justify-between px-12 py-3 flex-wrap">
                    <SensorsData title="Humidity" prctg={sensorData ? sensorData.humidity : "0"} img={humidity} />
                    <SensorsData title="Employees" prctg={sensorData ? sensorData.employees : "0"} img={employees} />
                    <SensorsData title="Ventilator" button="yes" img={Ventilator} />
                    <SensorsData title="private" button="yes" img={protect} />
                </div>
                <div className="h-full md:h-3/4 gap-y-4 gap-x-12 px-12 grid-cols-1 grid md:grid-cols-5 md:grid-rows-2 ">
                    <Notif data={sensorData? sensorData : ""} />
                    <Temperature value={sensorData ? sensorData.temperature : "0"}/>
                    <RacsComd />
                    <Racs rac1={sensorData ? sensorData.Rac1 : 0} rac2={sensorData ? sensorData.Rac2 : 0} />
                </div>
            </div>
        </div>

    </div>
    
  )
}


export default Dashboard