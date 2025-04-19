import React from "react";
import { useNavigate } from "react-router-dom";
import '../../index.css'

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>;
};

export default Logout;
