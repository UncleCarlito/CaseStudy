import React from "react";
import "../styles/navbar.css";
import { UseUserContext } from "../UserContext.jsx";
import { useNavigate } from "react-router";

export default function Navbar() {
  const nav = useNavigate();
  const userVerification = UseUserContext();
  return (
    <div className="navbar-container">
      <div className="navbar">
        <p className="company-name">Curl Industries</p>
        <button className="option">
          <p className="home" onClick={() => nav("/")}>
            Home
          </p>
        </button>
        <button
          className="option"
          onClick={() => userVerification.userLogout()}
        >
          <p className="logout">Logout</p>
        </button>
      </div>
    </div>
  );
}
