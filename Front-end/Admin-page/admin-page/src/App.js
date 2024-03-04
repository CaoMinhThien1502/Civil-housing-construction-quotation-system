import React from 'react';
import { ThemeContext } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import {
  Header,
  HeroSection,
  AboutUsSection,
  PersonIn4,
  TeamSection,
  PricingSection,
  ContactSection,
  Footer,
  BackToTopButton
} from './homepage/components1/home/home.js';

import {
  ConstructionForm, 
  ConsultImg
} from './homepage/components1/pricing/price.js';

import UncontrolledExample from './homepage/components1/blog/blog.js';
import ProfilePage from './homepage/components1/user/profile.js';

import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboard';
import Team from "./pages/team";
import Contacts from "./pages/contacts";
import Invoices from "./pages/invoices";
import Form from "./pages/form";
import ComboBuilding from "./pages/combobuilding";
import MaterialList from "./pages/materiallist";
import MaterialType from './pages/materialtype';
import Combobuildingdetail from './pages/combobuilding/comboBuildingDetail';
import AddComboBuilding from './pages/combobuilding/addComboBuilding';
import AddMaterial from "./pages/materiallist/addMaterial";
import AddMaterialType from './pages/materialtype/addMaterialType';
import EditMaterialType from './pages/materialtype/editMaterialType';
import Login from './pages/login/login';

function App() {
  const colorMode = ''/* some value */;
  const theme = ''/* some value */;

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="app">
            {window.location.pathname !== '/login' && window.location.pathname !== '/' && (
              <Sidebar />
            )}
            <main className="content">
              <Topbar />
              <Routes>
                {/* Routes from the first file */}
                <Route path="/Login" element={<Login />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/price" element={<PricePage />} />
                <Route path="/blog" element={<UncontrolledExample />} />
                <Route path="/profile" element={<Profile />} />

                {/* Routes from the second file */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/comboBuilding" element={<ComboBuilding />} />
                <Route path="/comboBuilding/:id" element={<Combobuildingdetail />} />
                <Route path="/comboBuilding/addComboBuilding" element={<AddComboBuilding />} />
                <Route path="/materialList" element={<MaterialList />} />
                <Route path="/materialType" element={<MaterialType />} />
                <Route path="/materialList/addMaterial" element={<AddMaterial />} />
                <Route path="/materialType/addMaterialType" element={<AddMaterialType />} />
                <Route path="/form" element={<Form />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
// Remaining components from the first file
const HomePage = () => {
  return (
    <>
      <Header /> 
      <HeroSection />
      <AboutUsSection />
      <PersonIn4 />
      <TeamSection />
      <PricingSection />
      <ContactSection />
      <Footer />
      <BackToTopButton />
    </>
  );
};

const PricePage = () => {
  return (
    <>
      <ConstructionForm/>
      {/* <ConsultImg/> */}
    </>
  );
};

const Profile = () => {
  return (
    <>
      <ProfilePage/>
    </>
  );
};

export default App;
