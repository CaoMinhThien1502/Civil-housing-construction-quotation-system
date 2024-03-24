// Import necessary React modules
import "./personIn4.css";
import "./blogs.css";
import AOS from "aos";
import "aos/dist/aos.css";
import React, {useEffect, useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import UncontrolledExample from "../blog/blog";
import appleIcon from "../../img/apple-touch-icon.png";
import { ReactComponent as countImg } from "../../img/counts-img.svg";
import favicon from "../../img/favicon.png";
import heroImg from "../../img/hero-img.png";
import { ReactComponent as illustration } from "../../img/illustration-6.svg";
import services1 from "../../img/more-services-1.jpg";
import services2 from "../../img/more-services-2.jpg";
import services3 from "../../img/more-services-3.jpg";
import services4 from "../../img/more-services-4.jpg";
import testimonials1 from "../../img/testimonials/testimonials-1.jpg";
import testimonials2 from "../../img/testimonials/testimonials-2.jpg";
import testimonials3 from "../../img/testimonials/testimonials-3.jpg";
import testimonials4 from "../../img/testimonials/testimonials-4.jpg";
import testimonials5 from "../../img/testimonials/testimonials-5.jpg";
import team1 from "../../img/team/team-1.jpg";
import team2 from "../../img/team/team-2.jpg";
import team3 from "../../img/team/team-3.jpg";
import team4 from "../../img/team/team-4.jpg";
import logo from "../../img/homepage/logoSystem.jpg";
import Login from "../login/login";
// Import CSS files (if using any)
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'remixicon/fonts/remixicon.css';
import './TeamSection.css';
import '../../styles/main/main.css';
// Import Emaijs library
import emailjs from 'emailjs-com';
//blog real ne
import axios from 'axios';

// Create a functional component for the header
const Header = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const userName = localStorage.getItem('mail');
  const handleLogout = () => {
    localStorage.removeItem('mail');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('tokenTime'); 
    window.location.href = 'http://localhost:8080/api/v1/auth/logout';
  };
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          {/* <h1><a href="/home">CHCQS</a></h1> */}
          <a href="/home"><img  src={logo} alt="" width="50px" height="200px"/></a>
        </div>

        <nav id="navbar" className="navbar">
          <ul>
            <li><a className="nav-link scrollto active" href="/home#">Home</a></li>
            <li><a className="nav-link scrollto" href="/home#about">About</a></li>
            <li><a className="nav-link scrollto" href="/home#blog" >Sample Building</a></li>
            <li><a className="nav-link scrollto" href="/home#pricing">Pricing</a></li>
            <li><a className="nav-link scrollto" href="/home#contact">Contact us</a></li>
            <li><a className="nav-link scrollto" href="/home#blogreal">Blogs</a></li>
            <li><a className="nav-link scrollto" href="/home#combo">Combo</a></li>
            {isLoggedIn ? (
              <>
                <li><a className="nav-link scrollto" href="/profile">Profile</a></li>

                <li><a className="getstarted scrollto" onClick={handleLogout} href="#">Logout</a></li>
              </>
            ) : (
              <li><a className="getstarted scrollto" href="/login">Login</a></li>
            )}
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
      <section id="hero" className="d-flex align-items-center" >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">QUOTATION SYSTEM FOR CIVIL HOUSING CONSTRUCTION</h1>
              <h2 data-aos="fade-up" data-aos-delay="400">We can give you our services, so feel free to get more informations from us</h2>
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
              Buildings what are appearing everywhere, so don't be shy in finding one for you.
            </p>
            <ul>
              <li><i className="ri-check-double-line"></i> .................................................</li>
              <li><i className="ri-check-double-line"></i> ..................................................</li>
              <li><i className="ri-check-double-line"></i> ..................................................</li>
            </ul>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0" data-aos="fade-up" data-aos-delay="300">
            <p>
              We are the team who spent all day for you to get your own building with full supports. Our informations will be stay here, feel free to know more. If you want to find more detail of buildings, click "Learn More" now!!!
            </p>
            <a href="#blog" className="btn-learn-more">Learn More</a>
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
            <button className="title-btn">Ms. Louren</button>
            <p className="description">Our CEO with many great ideas. She knows how to build a new building with the cheapest cost.</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="serviceBox">
            <div> <img src={team1} className="service-icon"/>
              <span><i className="fa fa-rocket"></i></span>
            </div>
            <button className="title-btn">Mr. Donk</button>
            <p className="description">The man uses leading skills to lead us in getting our target. The fastest way to be success is together.</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="serviceBox ">
            <div> <img src={team3} className="service-icon"/>
              <span><i className="fa fa-rocket"></i></span>
            </div>
            <button className="title-btn">Mr. Peter</button>
            <p className="description">The master in building area, who knows what is better for your building. Helping you in choosing the best suited.</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="serviceBox ">
            <div> <img src={team4} className="service-icon"/>
              <span><i className="fa fa-rocket"></i></span>
            </div>
            <button className="title-btn">Ms. Anna</button>
            <p className="description">The evaluator and analyst of construction projects, she can make the best building in the budget.</p>
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
    <section id="blog" className="team section-bg">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Sample Building</h2>
          <p>Finished Buildings</p>
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
                  <li><i className="bi bi-house-door"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}> Area : 100m²</span> </li>
                  <li><i className="bi bi-door-open"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Room : 3</span> </li>
                  <li><i className="bi bi-currency-dollar"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Price: 1.4B</span></li>
                </ul>
                {/* <button className="button-51" type="button">Đọc ngay</button> */}
                <Link to="/blog" className="button-51">Read now</Link>
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
                  <li><i className="bi bi-house-door"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}> Area : 100m²</span> </li>
                  <li><i className="bi bi-door-open"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Room : 3</span> </li>
                  <li><i className="bi bi-currency-dollar"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Price: 1B</span></li>
                </ul>
                <Link to="/blog" className="button-51">Read now</Link>
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
                  <li><i className="bi bi-house-door"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}> Area : 100m²</span> </li>
                  <li><i className="bi bi-door-open"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Room : 3</span> </li>
                  <li><i className="bi bi-currency-dollar"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Price: 1B</span></li>
                </ul>
                <Link to="/blog" className="button-51">Read now</Link>
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
                  <li><i className="bi bi-house-door"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}> Area : 100m²</span> </li>
                  <li><i className="bi bi-door-open"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Room : 3</span> </li>
                  <li><i className="bi bi-currency-dollar"></i> <span className="highlight" style={{marginLeft: 10, paddingTop: 4, color: "black"}}>Price: 1B</span></li>
                </ul>
                <Link to="/blog" className="button-51">Read now</Link>
              </div>
            </div>
          </div>
          {/* End team member */}
        </div>
      </div>
    </section>
  );
};
// blog real ----------------------------------------------------------------------------
const BlogReal = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/blog/list');
        setBlogs(response.data); // Giả sử API trả về một mảng các bài blog
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Xử lý lỗi tại đây nếu cần thiết
      }
    };

    fetchBlogs();
  }, []); // Tham số thứ hai là mảng rỗng để useEffect chỉ chạy một lần sau khi component được mount
  return (
    <section id="blogreal" className="team section-bg">
      <div className="container">
        <div className="section-title aos-init aos-animate" data-aos="fade-up">
          <h2>Blogs</h2>
        </div>
        <div className="row blog-row">
          {blogs.map(blog => (
            <div key={blog.blogId} className="col-lg-3 col-md-6">
            <Link to={`/blogDetail/${blog.blogId}`} className="blog-link">
              <div className="member aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                <div className="member-inner d-flex flex-column">
                  <div className="member-info flex-grow-1">
                    <p className="blog-name">{blog.blogName}</p>
                  </div>
                  <div className="member-img">
                    <img src={blog.imgPath} alt="Blog Image" className="img-fluid blog-img" />
                  </div>

                  <div className="member-info flex-grow-1">
                  <p style={{ color: blog.blogType === 1 ? 'red' : 'inherit' }}>
  {blog.blogType === 1 ? 'Cẩm nang xây dựng' : 'Thiết kế kiến trúc'}
</p>
                    <p className="blog-name">{blog.createDay}</p>
                  </div>

                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
// combo building ----------------------------------------------------------------------------
const Combo = () => {
  const [combo, setCombo] = useState([]);
  const navigate = useNavigate();
  
    const redirectToCombo = (id,userName) => {
      // Navigate to /price with the id parameter
      navigate(`/comboDetail/${id}`);
    };
  return (
    <section id="combo" className="pricing">
      <div className="container">
        <div className="section-title aos-init aos-animate" data-aos="fade-up">
          <h2>Combo</h2>
          <p>Choose your combo building</p>
        </div>
        <div className="row">
          {/* Repeat this block for each pricing option */}
          <div className="col-lg-4 col-md-6">
            <div className="box" data-aos="zoom-in-right" data-aos-delay="200">
              <h3>Rough Construction</h3>
              {/* <h4><sup>+</sup>3<span> Combos</span></h4> */}
              <ul>
                <li>Count price</li>
                <li>With rough combo building</li>
                <li>Feel free to choose</li>
                <li className="na">Finishing combo</li>
                <li className="na">Package combo</li>
              </ul>
              <div className="btn-wrap">
              <button
                id="button0"
                data-id="0"
                onClick={() => redirectToCombo(0)}
                className="btn-buy"
              >
              Detail
              </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="box" data-aos="zoom-in-right" data-aos-delay="200">
              <h3>Construction and finishing</h3>
              {/* <h4><sup>+</sup>3<span> Combos</span></h4> */}
              <ul>
                <li>Count price</li>
                <li>With finishing combo building</li>
                <li>Feel free to choose</li>
                <li className="na">Rough combo</li>
                <li className="na">Package combo</li>
              </ul>
              <div className="btn-wrap">
              <button
                id="button1"
                data-id="1"
                onClick={() => redirectToCombo(1)}
                className="btn-buy"
              >
              Detail
              </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="box" data-aos="zoom-in-right" data-aos-delay="200">
              <h3>Package construction</h3>
              {/* <h4><sup>+</sup>4<span> Combos</span></h4> */}
              <ul>
                <li>Count price</li>
                <li>With finishing combo building</li>
                <li>Feel free to choose</li>
                <li className="na">Rough combo</li>
                <li className="na">Finishing combo</li>
              </ul>
              <div className="btn-wrap">
              <button
                id="button2"
                data-id="2"
                onClick={() => redirectToCombo(2)}
                className="btn-buy"
              >
              Detail
              </button>
              </div>
            </div>
          </div>
        </div>
         {/* End pricing option */}
      </div>
    </section>
  );
};

const PricingSection = () => {
    const navigate = useNavigate();
  
    const redirectToPrice = (id,userName) => {
      // Navigate to /price with the id parameter
      navigate(`/price?id=${id}`);
    };
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="section-title">
          <h2>Pricing</h2>
          <p>Let make your optional builds by your choice</p>
        </div>
        <div className="row">
          {/* Repeat this block for each pricing option */}
          <div className="col-lg-4 col-md-6">
            <div className="box" data-aos="zoom-in-right" data-aos-delay="200">
              <h3>Rough Construction</h3>
              <h4><sup>+</sup>3<span> Combos</span></h4>
              <ul>
                <li>Count price</li>
                <li>With rough combo building</li>
                <li>Feel free to choose</li>
                <li className="na">Finishing combo</li>
                <li className="na">Package combo</li>
              </ul>
              <div className="btn-wrap">
              <button
                id="button0"
                data-id="0"
                onClick={() => redirectToPrice(0)}
                className="btn-buy"
              >
              Count
              </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="box" data-aos="zoom-in-right" data-aos-delay="200">
              <h3>Construction and finishing</h3>
              <h4><sup>+</sup>3<span> Combos</span></h4>
              <ul>
                <li>Count price</li>
                <li>With finishing combo building</li>
                <li>Feel free to choose</li>
                <li className="na">Rough combo</li>
                <li className="na">Package combo</li>
              </ul>
              <div className="btn-wrap">
              <button
                id="button1"
                data-id="1"
                onClick={() => redirectToPrice(1)}
                className="btn-buy"
              >
              Count
              </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="box" data-aos="zoom-in-right" data-aos-delay="200">
              <h3>Package construction</h3>
              <h4><sup>+</sup>4<span> Combos</span></h4>
              <ul>
                <li>Count price</li>
                <li>With finishing combo building</li>
                <li>Feel free to choose</li>
                <li className="na">Rough combo</li>
                <li className="na">Finishing combo</li>
              </ul>
              <div className="btn-wrap">
              <button
                id="button2"
                data-id="2"
                onClick={() => redirectToPrice(2)}
                className="btn-buy"
              >
              Count
              </button>
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
  const [userName,setUserName] = useState('');
  const [userEmail,setUserEmail] = useState('');
  const [userSubject,setUserSubject] = useState('');
  const [userMessage,setUserMessage] = useState('');
  const SendEmail = (e) => {
    e.preventDefault();
    const templateParams = {
      to_name: 'Admin',
      from_name: userName,
      subject: userSubject,
      message: userMessage
    };
    const serviceId = 'service_10tro6i';
    const templateId = 'template_3ekxqnm';
    const publicKey = 'ynz7Ls9XImf893bMG';
    emailjs.send(serviceId,templateId,templateParams,publicKey) 
    .then(function(response) {
      alert("Success");
      console.log('Email sent:', response);
        setUserName('');
        setUserEmail('');
        setUserSubject('');
        setUserMessage('');
    }, function(error) {
      console.error('Email could not be sent:', error);
    });
  }
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Contact Us</h2>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="contact-about">
              <h3>CHCQ System</h3>
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
                <p>FPT University<br />Thu Duc City, Ho Chi Minh City</p>
              </div>
              <div>
                <i className="ri-mail-send-line"></i>
                <p>civilhousingsystem@gmail.com</p>
              </div>
              <div>
                <i className="ri-phone-line"></i>
                <p>+84 355 004 120</p>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12" data-aos="fade-up" data-aos-delay="300">
            <form action="forms/contact.php" method="post" role="form" className="php-email-form">
              <div className="form-group">
                <input type="text"
                      name="name"
                      className="form-control" 
                      value={userName} 
                      placeholder="Your Name" 
                      onChange={(e) => setUserName(e.target.value)}
                      required />
              </div>
              <div className="form-group">
                <input type="email" 
                       className="form-control" 
                       name="email" 
                       value={userEmail} 
                       placeholder="Your Email" 
                       onChange={(e) => setUserEmail(e.target.value)}
                       required />
              </div>
              <div className="form-group">
                <input type="text" 
                        className="form-control" 
                        name="subject" 
                        value={userSubject} 
                        placeholder="Subject"
                        onChange={(e) => setUserSubject(e.target.value)} 
                        required />
              </div>
              <div className="form-group">
                <textarea className="form-control" 
                          name="message" 
                          rows="5" 
                          value={userMessage}
                          placeholder="Message" 
                          onChange={(e) => setUserMessage(e.target.value)}
                          required></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit" onClick={SendEmail}>Send Message</button></div>
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
              <a href="#" className="scrollto">Home</a>
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
export { Header, HeroSection, AboutUsSection,PersonIn4, TeamSection, PricingSection, ContactSection, Footer, BackToTopButton, BlogReal, Combo };
