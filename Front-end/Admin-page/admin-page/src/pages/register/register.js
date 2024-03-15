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
    <div className="container-register">
      <div className="content">
        <img src={Anh1} alt="register" />
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Register</p>
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              value={fullName}
              onChange={handleNameChange}
              required
            />
            <span>Your Name</span>
          </label>
          <label>
            <input
              className="input"
              type="email"
              placeholder=""
              value={email}
              onChange={handleEmailChange}
              required
            />
            <span>Email</span>
            {emailExists && <span className="error">Email already exists</span>}
          </label>
          <label>
            <input
              className="input"
              type="password"
              placeholder=""
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span>Password</span>
          </label>
          <label>
            <input
              className="input"
              type="password"
              placeholder=""
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <span>Confirm Password</span>
            {!passwordMatch && <span className="error">Passwords do not match.</span>}
          </label>
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              value={address}
              onChange={handleAddressChange}
              required
            />
            <span>Address</span>
          </label>
          <label>
            <input
              className="input"
              type="tel"
              pattern="0[0-9]{9}"
              placeholder=""
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            <span>Phone</span>
          </label>
          <div className="flex">
            <label>
              <input
                className="input"
                type="date"
                style={{ width: '170px' }}
                placeholder=""
                required
                max={new Date().toISOString().split('T')[0]}
                value={birthdate}
                onChange={handleBirthdateChange}
              />
              <span>Birthday</span>
            </label>
            <label style={{ marginTop: '10px' }}>
              <input
                type="radio"
                name="gender"
                value="male"
                style={{ marginRight: '5px' }}
                checked={gender === true} // Nếu gender là true (Male) thì checked
                onChange={handleGenderChange}
                required
              />
              Male
              &nbsp;
              <input
                type="radio"
                name="gender"
                value="female"
                style={{ marginRight: '5px' }}
                checked={gender === false} // Nếu gender là false (Female) thì checked
                onChange={handleGenderChange}
                required
              />
              Female
            </label>
          </div>
          <button className="submit">Submit</button>
          <p className="signin">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
