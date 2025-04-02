import React, { useContext, useEffect } from "react";
import "../styles/dashboard.css";
import { UseUserContext } from "../UserContext";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const nav = useNavigate();
  const userVerification = UseUserContext();
  console.log(`Is authenticated : ${userVerification.isAuthenticated}`);
  console.log(`User data`, userVerification.userData);

  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      !userVerification.isAuthenticated &&
      !userVerification.userData
    ) {
      nav("/login");
    }
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className="dashboard-container">
        <div className="dashboard">
          <p className="dashboard-title">Curl Industries</p>
          <div className="buttons">
            <button
              onClick={() => {
                nav("/projects");
              }}
            >
              <p>See Projects</p>
              <i className="fa-solid fa-people-group"></i>
            </button>
            <button
              onClick={() => {
                nav("/projects/add");
              }}
            >
              <p>Add Task</p>
              <i className="fa-solid fa-add"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
