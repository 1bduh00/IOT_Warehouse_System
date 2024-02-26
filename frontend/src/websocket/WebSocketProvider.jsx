import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs';
import React, { createContext, useContext, useState } from 'react';

const WebSocketContext = createContext();
export const WebSocketProvider = ({ children }) => {
  const [webSocketConnection, setWebSocketConnection] = useState(null);
  const [DisplayPopup , setPopup] = useState(false)

  const establishConnection = async () => {
     // Create a promise to represent the WebSocket connection
     const connectionPromise = new Promise((resolve, reject) => {
      const connection = new SockJS('http://172.171.247.161:8080/ws');
      const stompClient = Stomp.over(connection);

      const token = localStorage.getItem("accessToken")
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      stompClient.connect(headers, () => {
        console.log('WebSocket connection established');
        
        resolve(stompClient);
      }, (error) => {
        console.error('WebSocket connection failed', error);
        reject(error);
      });
    });

    const stomp = await connectionPromise;
    // Set the connection in the state
    setWebSocketConnection(stomp)
  };
  
  const closeConnection = () => {
    if (webSocketConnection) {
      // Your logic to close the WebSocket connection
      webSocketConnection.close();
      // setWebSocketConnection(null);
    }
  };

  // Provide the context value to the components within the subtree
  const contextValue = {
    webSocketConnection,
    establishConnection,
    closeConnection,
    DisplayPopup,
    setPopup
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
