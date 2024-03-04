// Import necessary React modules
import "./personIn4.css";
import AOS from "../../styles1/lib/aos/aos.js";
import "../../styles1/lib/aos/aos.css";
// import "../../styles1/lib/aos/dist/aos.css";
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import appleIcon from "../../img1/img/apple-touch-icon.png"
import { ReactComponent as countImg } from "../../img1/img/counts-img.svg";
import favicon from "../../img1/img/favicon.png";
import heroImg from "../../img1/img/hero-img.png";
import { ReactComponent as illustration } from "../../img1/img/illustration-6.svg";
import services1 from "../../img1/img/more-services-1.jpg";
import services2 from "../../img1/img/more-services-2.jpg";
import services3 from "../../img1/img/more-services-3.jpg";
import services4 from "../../img1/img/more-services-4.jpg";
import testimonials1 from "../../img1/img/testimonials/testimonials-1.jpg";
import testimonials2 from "../../img1/img/testimonials/testimonials-2.jpg";
import testimonials3 from "../../img1/img/testimonials/testimonials-3.jpg";
import testimonials4 from "../../img1/img/testimonials/testimonials-4.jpg";
import testimonials5 from "../../img1/img/testimonials/testimonials-5.jpg";
import team1 from "../../img1/img/team/team-1.jpg";
import team2 from "../../img1/img/team/team-2.jpg";
import team3 from "../../img1/img/team/team-3.jpg";
import team4 from "../../img1/img/team/team-4.jpg";

// Import CSS files (if using any)
    import '../../styles1/lib/aos/aos.css';
  //  import '../../styles1/lib/bootstrap/dist/css/bootstrap.min.css';
   import '../../styles1/lib/bootstrap/css/bootstrap.min.css';
// import '../../styles1/lib/bootstrap-icons/font/bootstrap-icons.css';
    import '../../styles1/lib/bootstrap-icons/bootstrap-icons.css';
// import '../../styles1/lib/boxicons/css/boxicons.min.css';
    import '../../styles1/lib/boxicons/css/boxicons.min.css';
// import '../../styles1/lib/glightbox/dist/css/glightbox.min.css';
    import '../../styles1/lib/glightbox/css/glightbox.min.css';
// import '../../styles1/lib/remixicon/fonts/remixicon.css';
    import '../../styles1/lib/remixicon/remixicon.css';
import './TeamSection.css';

import '../../styles1/lib/main/main.css';
import { Link } from 'react-router-dom';

// function handle

// Create a functional component for the header
const Header = () => {
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          <h1><a href="index.html">Vesperr</a></h1>
          <a href="index.html"><img src={appleIcon} alt="" className="img-fluid" /></a>
        </div>

        <nav id="navbar" className="navbar">
          <ul>
            <li><a className="nav-link scrollto active" href="#Hero">Home</a></li>
            <li><a className="nav-link scrollto" href="#About">About</a></li>
            <li><a className="nav-link scrollto" href="#Services" >Services</a></li>
            <li><a className="nav-link scrollto" href="#Team">Team</a></li>
            <li><a className="nav-link scrollto" href="#Pricing">Pricing</a></li>
            {/* Add your dropdown menu here if needed */}
            <li><a className="nav-link scrollto" href="#Contact">Contact</a></li>
            <li><a className="getstarted scrollto" href="./Login">Login</a></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};
const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <>
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">QUOTATION SYSTEM FOR CIVIL HOUSING CONSTRUCTION</h1>
              <h2 data-aos="fade-up" data-aos-delay="400">We are a team of talented designers making websites with Bootstrap</h2>
              <div data-aos="fade-up" data-aos-delay="800">
                <a href="#about" className="btn-get-started scrollto">Get Started</a>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left" data-aos-delay="200">
              <img src={heroImg} className="" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const AboutUsSection = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>About Us</h2>
        </div>
        <div className="row content">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="150">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul>
              <li><i className="ri-check-double-line"></i> .................................................</li>
              <li><i className="ri-check-double-line"></i> ..................................................</li>
              <li><i className="ri-check-double-line"></i> ..................................................</li>
            </ul>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0" data-aos="fade-up" data-aos-delay="300">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat nisi rerum pariatur voluptates perspiciatis repellendus accusantium eaque, id cumque porro, quisquam minima, vitae tempore ipsa cum unde modi natus at!
            </p>
            <a href="#" className="btn-learn-more">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
};
const PersonIn4 = () => {
  return (
    <div className="container1">
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <div className="serviceBox">
            <div><img src={team2} className="service-icon"/>
              <span><i className="fa fa-globe"></i></span>
            </div>
            <button className="title-btn">A1</button>
            <p className="description">Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Qui quaerat fugit quas veniam perferendis repudiandae sequi, dolore quisquam illum.</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="serviceBox">
            <div> <img src={team1} className="service-icon"/>
              <span><i className="fa fa-rocket"></i></span>
            </div>
            <button className="title-btn">A2</button>
            <p className="description">Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Qui quaerat fugit quas veniam perferendis repudiandae sequi, dolore quisquam illum.</p>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="serviceBox ">
            <div> <img src={team3} className="service-icon"/>
              <span><i class="fa fa-rocket"></i></span>
            </div>
            <button class="title-btn">A3</button>
            <p class="description">Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Qui quaerat fugit quas veniam perferendis repudiandae sequi, dolore quisquam illum.</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="serviceBox ">
            <div> <img src={team4} className="service-icon"/>
              <span><i className="fa fa-rocket"></i></span>
            </div>
            <button className="title-btn">A4</button>
            <p class="description">Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Qui quaerat fugit quas veniam perferendis repudiandae sequi, dolore quisquam illum.</p>
          </div>
        </div>
      </div>
    </div>)
};

// Repeat the above pattern for other sections like Team, Pricing, etc.

const TeamSection = () => {
  return (
  //   <div className="container">
  //   <img src={services1} alt="House" className="house-image" />
  //   <div className="house-info">
  //     <h1>MT 01</h1>
  //     <p>Khu Vực Miền Trung</p>
  //     <p>Phòng ngủ: 2</p>
  //     <p>Diện tích: 135 m²</p>
  //     <p>Giá: 870 triệu</p>
  //     <p>Tầng: 1</p>
  //     <div className="buttons">
  //       <button className="button">Xem chi tiết</button>
  //       <button className="button">Tùy chỉnh màu nhà</button>
  //     </div>
  //   </div>
  // </div>
    <section id="team" className="team section-bg">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Blog</h2>
          <p>Các công trình tiêu biểu từng thi công/ chưa css</p>
        </div>
        <div className="row">
          {/* Repeat this block for each team member */}
          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up" data-aos-delay="100">
              <div className="member-img">
                <img src={services1} style={{height: 240}} className="img-fluid" alt="" />
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
              <ul className="icon-list">
                  <li><i className="bi bi-house-door"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}> Diện tích : 100m²</span> </li>
                  <li><i className="bi bi-door-open"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Phòng ngủ : 3</span> </li>
                  <li><i class="bi bi-currency-dollar"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Chi phí: 1 tỷ</span></li>
                </ul>
                {/* <button className="button-51" type="button">Đọc ngay</button> */}
                <Link to="/blog" className="button-51">Đọc ngay</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up" data-aos-delay="100">
              <div className="member-img">
                <img src={services4} style= {{height : 240}}className="img-fluid" alt="" />
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
              <ul className="icon-list">
                  <li><i className="bi bi-house-door"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}> Diện tích : 100m²</span> </li>
                  <li><i className="bi bi-door-open"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Phòng ngủ : 3</span> </li>
                  <li><i class="bi bi-currency-dollar"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Chi phí: 1 tỷ</span></li>
                </ul>
                <Link to="/blog" className="button-51">Đọc ngay</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up" data-aos-delay="100">
              <div className="member-img">
                <img src={services2} style = {{height: 240 }}  className="img-fluid" alt="" />
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
              <ul className="icon-list">
                  <li><i className="bi bi-house-door"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}> Diện tích : 100m²</span> </li>
                  <li><i className="bi bi-door-open"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Phòng ngủ : 3</span> </li>
                  <li><i class="bi bi-currency-dollar"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Chi phí: 1 tỷ</span></li>
                </ul>
                <Link to="/blog" className="button-51">Đọc ngay</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="member" data-aos="fade-up" data-aos-delay="100">
              <div className="member-img">
                <img src={services3} style = {{height: 240}} className="img-fluid" alt="" />
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
              <ul className="icon-list">
                  <li><i className="bi bi-house-door"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}> Diện tích : 100m²</span> </li>
                  <li><i className="bi bi-door-open"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Phòng ngủ : 3</span> </li>
                  <li><i class="bi bi-currency-dollar"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Chi phí: 1 tỷ</span></li>
                </ul>
                <Link to="/blog" className="button-51">Đọc ngay</Link>
              </div>
            </div>
          </div>
          {/* End team member */}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="section-title">
          <h2>Pricing</h2>
          <p>Sit sint consectetur velit nemo qui impedit suscipit alias ea</p>
        </div>
        <div className="row">
          {/* Repeat this block for each pricing option */}
          <div className="col-lg-4 col-md-6">
            <div className="box" data-aos="zoom-in-right" data-aos-delay="200">
              <h3>Thi công thô</h3>
              <h4><sup>$</sup>0<span> / month</span></h4>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li className="na">Pharetra massa</li>
                <li className="na">Massa ultricies mi</li>
              </ul>
              <div className="btn-wrap">
              <Link to="/price" className="btn-buy">Tham Khảo</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="box" data-aos="zoom-in-right" data-aos-delay="200">
              <h3>Thi công hoàn thiện</h3>
              <h4><sup>$</sup>0<span> / month</span></h4>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li className="na">Pharetra massa</li>
                <li className="na">Massa ultricies mi</li>
              </ul>
              <div className="btn-wrap">
              <Link to="/price" className="btn-buy">Tham Khảo</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="box" data-aos="zoom-in-right" data-aos-delay="200">
              <h3>Thi công trọn gói</h3>
              <h4><sup>$</sup>0<span> / month</span></h4>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisl</li>
                <li>Nulla at volutpat dola</li>
                <li className="na">Pharetra massa</li>
                <li className="na">Massa ultricies mi</li>
              </ul>
              <div className="btn-wrap">
              <Link to="/price" className="btn-buy">Tham Khảo</Link>
              </div>
            </div>
          </div>

          {/* End pricing option */}
        </div>
      </div>
    </section>
  );
};
const ContactSection = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Contact Us</h2>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="contact-about">
              <h3>Vesperr</h3>
              <p>Cras fermentum odio eu feugiat. Justo eget magna fermentum iaculis eu non diam phasellus. Scelerisque felis imperdiet proin fermentum leo. Amet volutpat consequat mauris nunc congue.</p>
              <div className="social-links">
                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
            <div className="info">
              <div>
                <i className="ri-map-pin-line"></i>
                <p>A108 Adam Street<br />New York, NY 535022</p>
              </div>
              <div>
                <i className="ri-mail-send-line"></i>
                <p>info@example.com</p>
              </div>
              <div>
                <i className="ri-phone-line"></i>
                <p>+1 5589 55488 55s</p>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12" data-aos="fade-up" data-aos-delay="300">
            <form action="forms/contact.php" method="post" role="form" className="php-email-form">
              <div className="form-group">
                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-lg-6 text-lg-left text-center">
            <div className="credits"></div>
          </div>
          <div className="col-lg-6">
            <nav className="footer-links text-lg-right text-center pt-2 pt-lg-0">
              <a href="#intro" className="scrollto">Home</a>
              <a href="#about" className="scrollto">About</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

const BackToTopButton = () => {
  return (
    <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
  );
};


// Export the component for use in other parts of your React application
export { Header, HeroSection, AboutUsSection,PersonIn4, TeamSection, PricingSection, ContactSection, Footer, BackToTopButton };
