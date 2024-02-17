import React, { useEffect } from 'react'
import {Header} from '../components/Header'
import {SensorData} from '../components/SensorData'
import {ProductsData} from '../components/ProductsData'
import {TempSensor} from '../components/TempSensor'
import {EventData} from '../components/EventData'
import {RackData} from '../components/RackData'
import { Sidebar, SidebarItem } from '../components/Sidebar'
import { LayoutDashboard } from 'lucide-react'
import { useWebSocket } from '../websocket/WebSocketProvider'


function Dashboard() {
    const { webSocketConnection, establishConnection , closeConnection} = useWebSocket();

    useEffect(() => {
        const StartConnection = async () => {
            await establishConnection();
          };
          StartConnection()
      }, []);

    useEffect(() => {
        console.log('WebSocket connection is established and ready:', webSocketConnection);
  }, [webSocketConnection]);
  return (
    <div className="Dashboard_container">
        <Sidebar>
            <SidebarItem 
            icon={<LayoutDashboard size={20}/>}
            text="Dashboard"
            alert
            />
        </Sidebar>
        <div className="Main_container">
            <Header />
            <div className="Sensor_data_actions_container">
                <SensorData />
            </div>
            <div className="Second_Container">
                <ProductsData/>
                <TempSensor/>
            </div>
            <div className="Theird_Container">
                <EventData/>
                <RackData/>
            </div> 
        </div>
    </div>
    
  )
}

export default Dashboard