import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (formData.username.length <= 7) {
      newErrors.username = "Username must be more than 7 characters";
      isValid = false;
    }

    if (!formData.email.includes("@gmail.com")) {
      newErrors.email = "Email must be @gmail.com";
      isValid = false;
    }

    if (formData.password.length <= 8) {
      newErrors.password = "Password must be more than 8 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Prevent submission if validation fails

    try {
     const response =  await axios.post("http://localhost:4000/api/users/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      // alert("Signup successful!");
      navigate("/Home");

    } catch (error) {
      console.error("Signup error", error);
      alert("Email already exist ");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="form-box signup">
        <form onSubmit={handleSubmit}>
          <h2>Signup</h2>

          <div className="input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleChange}
              required
              style={{ borderColor: errors.username ? "red" : "green" }}
            />
            <FaUser className="icon" />
            <p className="error">{errors.username}</p>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              required
              style={{ borderColor: errors.email ? "red" : "green" }}
            />
            <FaEnvelope className="icon" />
            <p className="error">{errors.email}</p>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              required
              style={{ borderColor: errors.password ? "red" : "green" }}
            />
            <FaLock className="icon" />
            <p className="error">{errors.password}</p>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              style={{ borderColor: errors.confirmPassword ? "red" : "green" }}
            />
            <FaLock className="icon" />
            <p className="error">{errors.confirmPassword}</p>
          </div>

          <div className="remember-condition">
            <label>
              <input type="checkbox" required />
              I agree to the terms & conditions
            </label>
          </div>

          <button type="submit">Register</button>

          <div className="register-link">
            <p>Already have an account? <a href="/">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
