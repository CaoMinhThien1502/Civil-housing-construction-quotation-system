import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import BGL from '../../img/loginpage/2.jpg';
import './login.css';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import Header from '../../components/Header';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email: email,
        password: password,
      }, { withCredentials: true });
      
      if (response.status === 200) {  
        const token = jwtDecode(response.data.access_Token); // Make sure the key "access_Token" matches exactly with your server response
        localStorage.setItem('token', response.data.access_Token); // Store the token as a string without JSON.stringify
        localStorage.setItem('tokenTime',token.exp)
        localStorage.setItem('mail', token.sub); // Assuming token.sub contains the email
        localStorage.setItem('role', response.data.role); // Store role as received
        if (response.data.role === "CUSTOMER") { 
          console.log("Hello Customer");
          navigate("/home");
        } else { 
          console.log("Hello Admin");
          navigate("/dashboard");
        }
      } else {
        setError(`Đăng nhập thất bại với mã trạng thái: ${response.status}`);
      }
    } catch (error) {
      console.error("Lỗi trong quá trình đăng nhập:", error);

      if (error.response) {
        setError(error.response.data || "Unknown error");
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    }
  };
  
  return (
    <section className="form-02-main">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="_lk_de">
            <div className="form-03-main">
              <div className="logo">
                <img src={BGL} alt="Logo"/>
              </div>
              <form onSubmit={login}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control _ge_de_ol"
                    placeholder="Enter Email"
                    required
                    aria-required="true"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control _ge_de_ol"
                    placeholder="Enter Password"
                    required
                    aria-required="true"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* <div className="checkbox form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a href="#" readonly>Forgot Password?</a>
                </div> */}
                <div className="form-group nm_lk">
                    <button type="submit" className="_btn_04">Login</button>
                </div>           
              </form>
                <div className="form-group nm_lk">
                   <a href='/register'><button type="submit" className="_btn_04" >Sign Up</button></a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Login;
