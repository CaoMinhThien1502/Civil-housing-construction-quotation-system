import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Counter from './components/Counter';
import Modal from './components/SignInModal';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { createContext, useState } from 'react';
import { ComboList } from './pages/ComboList';
import { MaterialList } from './pages/MaterialList';
import { MaterialType } from './pages/MaterialType';
import { AddMaterial } from './pages/AddMaterial';

export const Session = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  return (
    <Session.Provider value = {{user, setUser}}>
      <div className="App">
        <Navigation />
        <Sidebar />
        <Counter />
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/modal' element={<Modal/>}></Route>
          <Route path='/combolist' element={<ComboList/>}></Route>
          <Route path='/materiallist' element={<MaterialList/>}></Route>
          <Route path='/materialtype' element={<MaterialType/>}></Route>
          <Route path='/addmaterial' element={<AddMaterial/>}></Route>
          {/* <Route path='/detail/:id' element={<Detail/>}></Route> */}
        </Routes>
        {JSON.stringify(user)}
      </div>
    </Session.Provider>
  );
}

export default App;
