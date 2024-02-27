import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Modal from './components/SignInModal';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { createContext, useState } from 'react';
import { ComboList } from './pages/ComboList';
import { MaterialList } from './pages/MaterialList';
import { MaterialType } from './pages/MaterialType';
import { AddMaterial } from './pages/AddMaterial';
import { AddMaterialType } from './pages/AddMaterialType';
import Footer from './components/Footer';

export const Session = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  return (
    <Session.Provider value = {{user, setUser}}>
      <div className="App">
        <Navigation />
        <Sidebar />
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/modal' element={<Modal/>}></Route>
          <Route path='/combo-list' element={<ComboList/>}></Route>
          <Route path='/combo-list/:id' element={<ComboList/>}></Route>
          <Route path='/material-list' element={<MaterialList/>}></Route>
          <Route path='/material-type-list' element={<MaterialType/>}></Route>
          <Route path='/add-material' element={<AddMaterial/>}></Route>
          <Route path='/add-material-type' element={<AddMaterialType/>}></Route>
        </Routes>
        <Footer />
        {/* {JSON.stringify(user)} */}
      </div>
    </Session.Provider>
  );
}

export default App;
