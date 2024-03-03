import Login from './components/login/login';
import UncontrolledExample from './components/blog/blog.js';
import ProfilePage from './components/user/profile.js';
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
} from './components/login/home/home.js'; // Thay đổi đường dẫn này với đường dẫn thực tế của bạn
import  {
  ConstructionForm, 
  ConsultImg
} from './components/pricing/price.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/price" element={<PricePage/>}/>
        <Route path="/blog" element={<UncontrolledExample/>}/>
        <Route path="/profile" element={<Profile/>}/>
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
const PricePage = () => {
  return (
    <>
      <ConstructionForm/>
      {/* <ConsultImg/> */}
    </>
  );
};
const Profile= () => {
  return (
    <>
      <ProfilePage/>
      
    </>
  );
};
export default App;
