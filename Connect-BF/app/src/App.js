import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './screens/login/Login';
import Home from './screens/home/Home';

function App() {
  return (
    <>  
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        
      </Routes>
    </>
  );
}

export default App;
