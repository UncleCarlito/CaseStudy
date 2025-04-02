import React, { useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/addproject.css";
import { UseProjectContext } from "../ProjectContext";
import { useNavigate } from "react-router";

export default function AddProject() {
  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      !userVerification.isAuthenticated &&
      !userVerification.userData
    ) {
      nav("/login");
    }
  }, []);
  const nav = useNavigate();
  const projectContext = UseProjectContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    async function handleAdd() {
      const success = await projectContext.addProject(
        e.target.title.value,
        e.target.description.value
      );
      if (success) {
        alert(`Project ${e.target.title.value} is added successfully`);
        nav("/");
      }
    }
    handleAdd();
  };
  return (
    <>
      <Navbar />
      <div className="addproject-container">
        <div className="addproject">
          <p style={{ fontFamily: "Poppins", fontSize: "1.5rem" }}>
            Add Project
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Project Title"
            />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Project Description"
            />
            <button type="submit">Add Project</button>
          </form>
        </div>
      </div>
    </>
  );
}
