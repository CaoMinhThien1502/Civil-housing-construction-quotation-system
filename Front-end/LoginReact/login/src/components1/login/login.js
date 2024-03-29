import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';

const Login = () => {
  const navigate = useNavigate(); // Đảm bảo sử dụng useNavigate trong functional component
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

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status ) {
        if (response.data.role !== "ADMIN" || "MANAGER") {
          console.log("Đăng nhập thành công!");
          navigate("/home");
        } else {
          console.log("Đăng nhập thành công (không có dữ liệu)!");
          navigate("/Dashboard");
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

    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg1' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg2' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={login}>Sign in</MDBBtn>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
            <MDBIcon fab icon="facebook-f" className="mx-2" />
            Continue with Facebook
          </MDBBtn>

          <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#55acee' }}>
            <MDBIcon fab icon="twitter" className="mx-2" />
            Continue with Twitter
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

  );
}

export default Login;