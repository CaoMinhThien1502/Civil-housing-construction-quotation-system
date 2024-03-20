import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import Register from './pages/register/register.js';
import ComboBuilding from "./pages/combobuilding";
import MaterialList from "./pages/materiallist";
import MaterialType from "./pages/materialtype"
import Item from './pages/itemlist';
import ItemType from './pages/itemtype/index.jsx';
import RequestContract from './pages/requestcontract';
import UserList from './pages/userlist';
import Blog from './pages/blogmanager';
import BlogDetail from './pages/blogmanager/blogDetail.jsx'



import ComboBuildingDetail from './pages/combobuilding/comboBuildingDetail';
import MaterialTypeDetail from './pages/materialtype/materialTypeDetail';
import ItemTypeDetail from './pages/itemtype/itemTypeDetail.jsx';
import RequestContractDetail from './pages/requestcontract/requestcontractdetail.jsx';

import AddComboBuilding from './pages/combobuilding/addComboBuilding';
import AddMaterial from "./pages/materiallist/addMaterial";
import AddMaterialType from './pages/materialtype/addMaterialType';
import AddItem from './pages/itemlist/addItem.jsx';
import AddItemType from './pages/itemtype/addItemType.jsx';
import AddBlog from './pages/blogmanager/addBlog.jsx';

import EditComboBuilding from './pages/combobuilding/editComboBuilding';
import EditMaterialType from './pages/materialtype/editMaterialType';
import EditMaterial from './pages/materiallist/editMaterial';
import EditItem from './pages/itemlist/editItem.jsx';
import EditItemType from './pages/itemtype/editItemType.jsx';
import EditUser from './pages/userlist/editUser.jsx';

import Login from './pages/login/login';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import axios from 'axios';
import Detail from './pages/pricing/detail.js';
import ProfilePage from './pages/profile/profile.js';

import Success from './pages/payment/success.js'

// import Bar from "./pages/bar";
// import Line from "./pages/line";
// import Pie from "./pages/pie";
// import FAQ from "./pages/faq";
// import Geography from "./pages/geography";
// import Calendar from "./pages/calendar/calendar";
import {jwtDecode} from 'jwt-decode'; // Sửa chữa ở đây
import {
  Header,
  HeroSection,
  AboutUsSection,
  PersonIn4,
  TeamSection,
  PricingSection,
  ContactSection,
  Footer,
  BackToTopButton,
  BlogReal
} from './pages/home/home.js'; // Thay đổi đường dẫn này với đường dẫn thực tế của bạn
import {
  ConstructionForm,
  ConsultImg
} from './pages/pricing/price.js';
import { HistoryToggleOffRounded, NorthEastOutlined, OneK, Sailing, ViewHeadline } from '@mui/icons-material';
import { keyboard } from '@testing-library/user-event/dist/keyboard/index.js';
// import { dc } from '@fullcalendar/core/internal-common.js';


function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  let tokenTime = localStorage.getItem('tokenTime')
  const navigate = useNavigate()

  useEffect(() => {
    const checkTokenTime = () => {
      if (tokenTime) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime > tokenTime) {
          localStorage.removeItem('mail');
          localStorage.removeItem('role');
          localStorage.removeItem('tokenTime');
          localStorage.removeItem('token');
          window.location.href = 'http://localhost:8080/api/v1/auth/logout';
        }
      }
    };

    
    checkTokenTime(); // Kiểm tra ngay khi component được mount

    const interval = setInterval(checkTokenTime, 600000); // Kiểm tra mỗi 1 phút (hoặc tần suất mong muốn)

    return () => clearInterval(interval); // Clear interval khi component bị unmount
  }, [tokenTime]); // Dependency array chỉ chứa tokenTime

  return (
    <>
    <ColorModeContext.Provider value={colorMode}>
      {location.pathname !== '/login'
      && location.pathname !== '/'
      && location.pathname !== '/home'
      && location.pathname !== '/price'
      && location.pathname !== '/success'
      && location.pathname !== '/blog'
      && location.pathname !== '/detail'
      && location.pathname !== '/profile'
      && location.pathname !== '/register'
      && !location.pathname.includes('/blogDetail') 
      //&& location.pathname !== '/blogreal'
      && (
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">
          <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
           
              <Route element={<PrivateRoutes />} >

                    <Route path="/dashboard" element={<Dashboard />} exact />

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

                  <Route path="/requestContractList" element={<RequestContract />} />
                  <Route path="/requestContractList/detail/:id" element={<RequestContractDetail />} />

                  <Route path="/blogList" element={<Blog />} />
                  <Route path="/blogList/addBlog" element={<AddBlog />} />
                  
                  <Route path="/userList" element={<UserList />} />
                  <Route path="/userList/:id" element={<EditUser />} />

                  <Route path="/form" element={<Form />} />
                  
                  {/* 
                    <Route path="/requestContractList" element={<RequestContract />} />
                    <Route path="/requestContractList/:id" element={<RequestContractDetail />} />

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
           
                  </Route>
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        )}
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path='/blogDetail/:id' element={<BlogDetail/>}/> 
      </Routes>
    </ColorModeContext.Provider>
  
      </>
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
      <BlogReal/>
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
      <ConstructionForm />
      {/* <ConsultImg/> */}
    </>
  );
}

const BlogPage = () => {
  return (
    <>
      <UncontrolledExample />
    </>
  );
}


    
export default App;

// pls don't change anything related to logical code