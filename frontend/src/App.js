import './App.css';
import Dashboard from './page/Dashboard';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Login from './page/Login'

function App() {
  return (
    <div className="App">
        <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/Dashboard' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>

    </>
    </div>
  );
}

export default App;
