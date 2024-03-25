import Dashboard from './page/Dashboard';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Login from './page/Login'
import { WebSocketProvider } from './websocket/WebSocketProvider';
import { jwtDecode } from 'jwt-decode';
import Notfound from './page/Notfound';
import NotAllowed from './page/NotAllowed';


function App() {
  
  const isAuthenticated = () => {
    // Check if the authentication token is present and not expired
    const token = localStorage.getItem('accessToken'); // Assuming you store the token in localStorage
    if (token !== null ) {
      const decodedToken = jwtDecode(token);
      // Check if the token is expired
      const isTokenExpired = decodedToken.exp < Date.now() / 1000;
      return !isTokenExpired;
    }
    return false;
  };

  return (
    <div className="App">
      <WebSocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Dashboard" element={isAuthenticated() ? <Dashboard /> : <NotAllowed/>} />
              <Route path="*" element={<Notfound/>} /> {/* This route will match any path */}
            </Routes>
          </BrowserRouter>
        </WebSocketProvider>
    </div>
  );
}

export default App;
