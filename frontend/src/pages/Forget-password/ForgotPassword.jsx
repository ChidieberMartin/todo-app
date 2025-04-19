import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/users/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error.response?.data?.message || "Something went wrong");
      setMessage("Error sending reset link.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Forgot Password</h2>
        <div className="inputCover">
          <input
            className="forget-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {message && <p>{message}</p>}
        <div className="link-wrapper">
          <span>Go back <a href="./">Login</a></span>
          <button className="reset-btn" type="reset" onClick={handleForgotPassword}>Reset Password</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
