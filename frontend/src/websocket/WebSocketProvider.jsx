import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs';
import React, { createContext, useContext, useState } from 'react';

const WebSocketContext = createContext();
export const WebSocketProvider = ({ children }) => {
  const [webSocketConnection, setWebSocketConnection] = useState(null);

  const establishConnection = async () => {
     // Create a promise to represent the WebSocket connection
     const connectionPromise = new Promise((resolve, reject) => {
      const connection = new SockJS('http://localhost:8080/ws');
      const stompClient = Stomp.over(connection);
      stompClient.connect({}, () => {
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

  
  // const closeConnection = () => {
  //   if (webSocketConnection) {
  //     // Your logic to close the WebSocket connection
  //     webSocketConnection.close();
  //     // setWebSocketConnection(null);
  //   }
  // };

  // Provide the context value to the components within the subtree
  const contextValue = {
    webSocketConnection,
    establishConnection,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  // A custom hook to conveniently access the context value
  return useContext(WebSocketContext);
};
