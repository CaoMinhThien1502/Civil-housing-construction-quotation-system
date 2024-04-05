import React, { useState } from 'react';
import 'bootstrap';
import { Check, CheckBox } from '@mui/icons-material';
import './register.css';
import Anh1 from '../../img/register1.jpg';
import { margin } from '@mui/system';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'; // Import navigate để chuyển hướng

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState(true); // Mặc định là true cho Male
    const [birthdate, setBirthdate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [emailExists, setEmailExists] = useState(false);

    const handleNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleGenderChange = (e) => {
        const isMale = e.target.value === 'male'; // Chuyển giới tính thành true nếu là Male
        setGender(isMale);
    };

    const handleBirthdateChange = (e) => {
        setBirthdate(format(new Date(e.target.value), 'yyyy-MM-dd'));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        try {
            const postData = {
                fullname: fullName,
                email: email,
                password: password,
                phone: phone,
                address: address,
                gender: gender,
                birthday: birthdate
            };

            const response = await axios.post(`http://localhost:8080/api/v1/auth/register`, postData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (response.status === 200) {
                alert("You need to confirm your email");
                <span class="loader"></span>
                setTimeout(() => {
                    navigate('/home'); // Sau 5 giây chuyển hướng đến trang /home
                }, 10000);
            }
        } catch (error) {
            if (error.response.status === 400 && error.response.data.message === "Email already exists") {
                setEmailExists(true);
            } else {
                console.error("Error submitting: ", error.response.data); // In ra lỗi cụ thể từ API
            }
        }
    };

    return (
        <div className="container_1">
            <div className="title_1">Registration</div>
            <div className="content_1">
                <form onSubmit={handleSubmit}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Full Name</span>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                name="fullName"
                                value={fullName}
                                onChange={handleNameChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Email</span>{emailExists && <span className="error">Email already exists</span>}
                            <input
                                type="email"// Use type="email" for email validation
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Password</span>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">ConfirmPassword</span>{!passwordMatch && <span className="error">Passwords do not match.</span>}
                            <input
                                type="password"
                                placeholder="Confirm your passsword"
                                name="confirmpassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Address</span>
                            <input
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                                value={address}
                                onChange={handleAddressChange}
                                required
                            />
                        </div>

                        <div className="input-box">
                            <span className="details">Phone Number</span>
                            <input
                                type="tel"
                                pattern="0[0-9]{9}"// Use type="tel" for phone number formatting
                                placeholder="Enter your number"
                                name="phoneNumber"
                                value={phone}
                                onChange={handlePhoneChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Birthday</span>
                            <input
                                type="date"
                                placeholder="Enter your birthday"
                                name="birthday"
                                required
                                max={new Date().toISOString().split('T')[0]}
                                value={birthdate}
                                onChange={handleBirthdateChange}
                            />
                        </div>
                    </div>
                    <div className="gender-details">
                        <span className="gender-title">Gender</span>
                        <div className="category">
                            <label htmlFor="male">
                                <span className="gender">Male</span>
                                <input
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                    checked={gender === true}
                                    onClick={handleGenderChange}
                                />
                            </label>
                            <label htmlFor="female">
                                {/* <span className="dot two"></span> */}
                                <span className="gender">Female</span>
                                <input
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                    checked={gender === false}
                                    onClick={handleGenderChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" value="Register" />
                        Already have an account?<a href="/login">Sign in</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
