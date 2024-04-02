import React, {useState} from "react";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
const LoginAction = ({ email, password }) => {
  const [error, setError] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email: email,
        password: password,
      }, { withCredentials: true });

      if (response.status === 200) {
        const token = jwtDecode(response.data.access_Token);
        localStorage.setItem('token', response.data.access_Token);
        localStorage.setItem('tokenTime', token.exp);
        localStorage.setItem('mail', token.sub);
        localStorage.setItem('role', response.data.role);
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
}
  export default LoginAction;  