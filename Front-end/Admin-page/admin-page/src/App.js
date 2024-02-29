import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboard';
import Team from "./pages/team";
import ComboBuilding from "./pages/combobuilding";
import Contacts from "./pages/contacts";
import Invoices from "./pages/invoices";
import MaterialList from "./pages/materiallist";
import AddMaterial from "./pages/addmaterial";
import Form from "./pages/form";
import MaterialType from "./pages/materialtype"
import Combobuildingdetail from './pages/combobuilding/combobuildingdetail';
import AddMaterialType from './pages/addmaterialtype';

// import Bar from "./pages/bar";
// import Line from "./pages/line";
// import Pie from "./pages/pie";
// import FAQ from "./pages/faq";
// import Geography from "./pages/geography";
// import Calendar from "./pages/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className='content'>
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/combobuilding" element={<ComboBuilding />} />
              <Route path='/combobuilding/:id' element={<Combobuildingdetail />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/materiallist" element={<MaterialList />} />
              <Route path='/materialtype' element={<MaterialType />} />
              <Route path='/addmaterial' element={<AddMaterial />} />
              <Route path='/addmaterialtype' element={<AddMaterialType />} />
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
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
