import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { UseProjectContext } from "../ProjectContext";
import "../styles/projectlist.css";
import { useNavigate } from "react-router";

export default function ProjectList() {
  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      !userVerification.isAuthenticated &&
      !userVerification.userData
    ) {
      nav("/login");
    }
  }, []);

  const [projects, setProject] = useState([]);

  const projectContext = UseProjectContext();
  const nav = useNavigate();

  useEffect(() => {
    const listProject = async () => {
      const data = await projectContext.getAllProjects();
      if (data) {
        setProject(data);
        console.log(data);
      }
    };

    listProject();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="projectlist-container">
        <p style={{ fontSize: "2rem" }}>
          Projects
          <br />
          <span style={{ fontSize: "1rem" }}>
            Green : Finished
            <br />
            Red: In process
          </span>
        </p>
        <div className="projectlist">
          {projects.map((element) => {
            return (
              <button
                className="project-container"
                key={element.id}
                style={{
                  backgroundColor:
                    element.status === "In Process" ? "#bd4f40" : "#A5B68D",
                }}
                onClick={() => nav(`/projects/${element.id}`)}
              >
                <div className="text">
                  <p>{element.title}</p>
                  <p>Description : {element.description}</p>
                </div>
                <i className="fa-solid fa-eye"></i>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
