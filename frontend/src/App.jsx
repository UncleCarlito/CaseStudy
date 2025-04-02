import { createContext, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/Login";
import axios from "axios";
import ProjectList from "./components/ProjectList";
import Dashboard from "./components/Dashboard";
import UserVerificationProvider from "./UserContext";
import ProjectContextProvider from "./ProjectContext";
import ProjectDetail from "./components/ProjectDetail";
import AddProject from "./components/AddProject";

function App() {
  return (
    <div
      style={{
        backgroundColor: " #ede8dc",
        fontFamily: "Inter",
        minHeight: "100vh",
      }}
    >
      <UserVerificationProvider>
        <ProjectContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/projects/add" element={<AddProject />} />
            </Routes>
          </BrowserRouter>
        </ProjectContextProvider>
      </UserVerificationProvider>
    </div>
  );
}

export default App;
