import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboard';
import Team from "./pages/team";
import Contacts from "./pages/contacts";
import Invoices from "./pages/invoices";
import Form from "./pages/form";
import ComboBuilding from "./pages/combobuilding";
import MaterialList from "./pages/materiallist";
import MaterialType from "./pages/materialtype"
import Combobuildingdetail from './pages/combobuilding/comboBuildingDetail';
import AddComboBuilding from './pages/combobuilding/addComboBuilding';
import AddMaterial from "./pages/materiallist/addMaterial";
import AddMaterialType from './pages/materialtype/addMaterialType';
import Login from './pages/login/login';

// import Bar from "./pages/bar";
// import Line from "./pages/line";
// import Pie from "./pages/pie";
// import FAQ from "./pages/faq";
// import Geography from "./pages/geography";
// import Calendar from "./pages/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {location.pathname !== '/login' && location.pathname !== '/' && (
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/comboBuilding" element={<ComboBuilding />} />
              <Route path="/comboBuilding/:id" element={<Combobuildingdetail />} />
              <Route path="/comboBuilding/addCombo" element={<AddComboBuilding />} />
              <Route path="/materialList" element={<MaterialList />} />
              <Route path="/materialType" element={<MaterialType />} />
              <Route path="/materialList/addMaterial" element={<AddMaterial />} />
              <Route path="/materialType/addMaterialType" element={<AddMaterialType />} />
              <Route path="/form" element={<Form />} />
              {/* <Route path="/bar" element={<Bar />} />
              <Route path="/materialtype" element={<MaterialType />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}
              </Routes>
            </main>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
