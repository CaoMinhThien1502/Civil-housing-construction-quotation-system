import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = ( e) => {
        e.preventDefault();
        try {
            // Gọi API đăng nhập
            const response = axios.post("http://localhost:8080/api/v1/auth/login", {
                email: email,
                password: password,
              }, { withCredentials: true });
            // Xử lý kết quả từ server
            console.log(response);
            navigate("/")
            // Thực hiện các bước cần thiết sau khi đăng nhập thành công
            // Ví dụ: Lưu thông tin người dùng vào localStorage, chuyển hướng trang, cập nhật state của ứng dụng, vv.
          } catch (error) {
            // Xử lý lỗi
            console.error("Error during login:", error);
          }
        };
    
    return (

            <form onSubmit={login}>
                <h1>login</h1>
                <div className="flex flex-col gap-2 w-[400px]">
                    {" "}
                    <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login in</button>
                </div>
            </form>
        
    );
}

export default Login;
