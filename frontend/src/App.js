import './App.css';
import Dashboard from './page/Dashboard';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Login from './page/Login'
import { WebSocketProvider } from './websocket/WebSocketProvider';


function App() {

  return (
    <div className="App">
      <WebSocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </WebSocketProvider>
    </div>
  );
}

export default App;
