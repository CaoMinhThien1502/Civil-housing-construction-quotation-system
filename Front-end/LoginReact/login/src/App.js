import Login from './componet/login/login';

import React from 'react';
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
} from './componet/login/home/home.js'; // Thay đổi đường dẫn này với đường dẫn thực tế của bạn
import  {
  ConstructionForm, 
  ConsultImg
} from './componet/pricing/price1.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/price1" element={<Price1/>}/>
        {/* Thêm các Route khác nếu cần */}
      </Routes>
    </Router>
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
const Price1 = () => {
  return (
    <>
      <ConstructionForm/>
      {/* <ConsultImg/> */}
    </>
  );
}

export default App;
