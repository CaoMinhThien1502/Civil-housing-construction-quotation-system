import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboard';
import UncontrolledExample from './pages/blog/blog.js';
import Team from "./pages/team";
import Contacts from "./pages/contacts";
import Invoices from "./pages/invoices";
import Form from "./pages/form";

import ComboBuilding from "./pages/combobuilding";
import MaterialList from "./pages/materiallist";
import MaterialType from "./pages/materialtype"
import Item from './pages/itemlist/index.jsx';
import ItemType from './pages/itemtype/index.jsx';

import ComboBuildingDetail from './pages/combobuilding/comboBuildingDetail';
import MaterialTypeDetail from './pages/materialtype/materialTypeDetail';
import ItemTypeDetail from './pages/itemtype/itemTypeDetail.jsx';

import AddComboBuilding from './pages/combobuilding/addComboBuilding';
import AddMaterial from "./pages/materiallist/addMaterial";
import AddMaterialType from './pages/materialtype/addMaterialType';
import AddItem from './pages/itemlist/addItem.jsx';
import AddItemType from './pages/itemtype/addItemType.jsx';

import EditComboBuilding from './pages/combobuilding/editComboBuilding';
import EditMaterialType from './pages/materialtype/editMaterialType';
import EditMaterial from './pages/materiallist/editMaterial';
import EditItem from './pages/itemlist/editItem.jsx';
import EditItemType from './pages/itemtype/editItemType.jsx';

import Login from './pages/login/login';

import Detail from './pages/pricing/detail.js';
import ProfilePage from './pages/profile/profile.js';
// import Bar from "./pages/bar";
// import Line from "./pages/line";
// import Pie from "./pages/pie";
// import FAQ from "./pages/faq";
// import Geography from "./pages/geography";
// import Calendar from "./pages/calendar/calendar";

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
} from './pages/home/home.js'; // Thay đổi đường dẫn này với đường dẫn thực tế của bạn
import  {
  ConstructionForm, 
  ConsultImg
} from './pages/pricing/price.js';

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  return (
    <ColorModeContext.Provider value={colorMode}>
      {location.pathname !== '/login' 
      && location.pathname !== '/' 
      && location.pathname != '/home' 
      && location.pathname != '/price'
      && location.pathname != '/blog'
      && location.pathname != '/detail'
      && location.pathname != '/profile'
      && (
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/comboBuilding" element={<ComboBuilding />} />
              <Route path="/comboBuilding/addComboBuilding" element={<AddComboBuilding />} />
              <Route path="/comboBuilding/:id" element={<EditComboBuilding />} />
              <Route path="/comboBuilding/detail/:id" element={<ComboBuildingDetail />} />
              
              <Route path="/materialList" element={<MaterialList />} />
              <Route path="/materialList/addMaterial" element={<AddMaterial />} />
              <Route path="/materialList/:id" element={<EditMaterial />} />

              <Route path="/materialType" element={<MaterialType />} />
              <Route path="/materialType/addMaterialType" element={<AddMaterialType />} />
              <Route path="/materialType/:id" element={<EditMaterialType />} />
              <Route path="/materialType/detail/:id" element={<MaterialTypeDetail />} />

              <Route path="/itemList" element={<Item />} />
              <Route path="/itemList/:id" element={<EditItem />} />
              <Route path="/itemList/addItem" element={<AddItem />} />

              <Route path="/itemType" element={<ItemType />} />
              <Route path="/itemType/:id" element={<EditItemType />} />
              <Route path="/itemType/addItemType" element={<AddItemType />} />
              <Route path="/itemType/detail/:id" element={<ItemTypeDetail />} />
              
              <Route path="/form" element={<Form />} />
              {/* 
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/bar" element={<Bar />} />
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
      )}
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/detail" element={<Detail/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </ColorModeContext.Provider>
  );
}

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
}

const BlogPage = () => {
  return (
    <>
      <UncontrolledExample/>
    </>
  );
}


export default App;

// pls don't change anything related to logical code