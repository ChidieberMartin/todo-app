import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './ResetPassword.css'

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/users/reset-password/${token}`, { newPassword });
      setMessage(response.data.message);
      setTimeout(() => navigate("/"), 2000); // Redirect to login after reset
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="reset-container">
      <div className="container">
        <h2>Reset Password</h2>
        <div className="input-container">
          <input
            className="rest-input"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button className="control-btn" onClick={handleResetPassword}>Submit</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
