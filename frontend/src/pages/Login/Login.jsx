import React, { useState } from "react";
import { FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'
import Cookies from 'js-cookie';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/users/login", formData);
      localStorage.setItem("token", response.data.token);
      // alert("Login successful!");

      if (formData.remember === true) {
        // Set token with expiry (30 days)
        Cookies.set('token', response.data.token, { expires: 30 });
      } else {
        // Set token for session (expires when browser is closed)
        Cookies.set('token', response.data.token, { expires: 0.0001 }); // Small expiration for session-like behavior
      }

      // localStorage.setItem("token", response.data.token); 

      // if (formData.remember === true) {
      //   localStorage.setItem("token", response.data.token);
      // } else {
      //   sessionStorage.setItem("token", response.data.token);
      // }

      navigate("/Home");
    } catch (error) {
      if (error.response) {
        console.error("Login error:", error.response.data);
        alert(error.response.data.message || "Invalid credentials");
      } else {
        console.error("Error:", error);
        alert("An unexpected error occurred.");
      }
    }

  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-group">
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-group">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <FaLock className="icon" />
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })} />
              Remember me
            </label>
            <a href="./forgot-password">ForgotPassword?</a>
          </div>
          <button type="submit">Login</button>

          <div className="register-link">
            Don't have an account? <a href="/Signup">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
