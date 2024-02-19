import React, { useEffect } from 'react'
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
        if(webSocketConnection){
            webSocketConnection.subscribe("/topic/data",onReceivemessage)
            webSocketConnection.send("/app/private-room",{},"hi ana")
        }
    }, [webSocketConnection]);

    const onReceivemessage = (payload)=>{
        let payloadData = JSON.parse(payload.body)
        console.log(payloadData)
    }

    return (
    <div className="Dashboard_container">
        <div className="SideBar">

        </div>
        <div className="Data-container">
            
        </div>
    </div>
    
  )
}


export default Dashboard