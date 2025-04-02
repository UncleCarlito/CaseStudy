import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/projectdetail.css";
import { useNavigate, useParams } from "react-router";
import { UseProjectContext } from "../ProjectContext";
import TaskItem from "./TaskItem";

export default function ProjectDetail() {
  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      !userVerification.isAuthenticated &&
      !userVerification.userData
    ) {
      nav("/login");
    }
  }, []);

  const projectContext = UseProjectContext();
  const nav = useNavigate();
  const params = useParams();
  const id = params.id;
  const [project, setProject] = useState();
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  async function getProject() {
    const project = await projectContext.getAProject(id);
    if (project) {
      setProject(project);
      setTitle(project.title);
      setDescription(project.description);
      console.log(project);
    }
  }
  useEffect(() => {
    async function getTasks() {
      const tasks = await projectContext.getTasksOfProject(id);
      if (tasks) {
        setTasks(tasks);
        console.log(tasks);
      }
    }
    getProject();
    getTasks();
  }, []);

  const handleEdit = () => {
    console.log("edit man");

    let edited = false;
    let editedFields = "Are you sure to edit the following?\n";
    if (title !== project.title) {
      edited = true;
      editedFields += `Title: "${project.title}" to "${title}"\n`;
    }

    if (description !== project.description) {
      edited = true;
      editedFields += `Description: "${project.description}" to "${description}"`;
    }

    if (edited) {
      const confirm = window.confirm(editedFields);
      if (confirm) {
        async function editProject() {
          const edit = await projectContext.editProject(id, title, description);
          if (edit) {
            nav(`/projects/${id}`);
          }
        }
        editProject();
        setIsEditing(false);
        nav("/projects");
      }
    } else {
      alert("No changes made");
    }
  };

  const markAsDone = () => {
    const status = project.status;
    let payload = "";
    if (status === "In Process") {
      payload = "Accomplished";
    } else {
      payload = "In Process";
    }
    const confirm = window.confirm(
      `Are you sure to mark this project as ${payload}?`
    );
    if (confirm) {
      async function editProject() {
        console.log(`Payload ${payload}`);

        const edit = await projectContext.updateStatus(id, payload);
        if (edit) {
          nav(`/projects/${id}`);
        }
      }
      editProject();
      nav("/projects");
    }
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      `Are you sure to delete Project "${project.title}" ?`
    );
    if (confirm) {
      async function deleteProject() {
        const remove = await projectContext.deleteProject(id);
        if (remove) {
          nav(`/projects`);
        }
      }
      deleteProject();
    }
  };

  if (projectContext.loading) {
    return (
      <>
        <Navbar />
        <p>Loading</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {project && (
        <div className="projectdetail-container">
          <div className="projectdetail">
            <div className="project">
              <div className="text">
                <p style={{ fontSize: ".75rem" }}>Project {project.id}</p>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={title}
                      style={{ fontWeight: "bold", fontSize: "2rem" }}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <p style={{ fontWeight: "bold", fontSize: "2rem" }}>
                      {project.title}
                    </p>
                    <p>Description : {project.description}</p>
                  </>
                )}
              </div>
              <div className="buttons">
                <button
                  className="options edit"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <i
                    className="fa-solid fa-pen"
                    style={{ fontSize: "1.5rem" }}
                  />
                  <p style={{ fontSize: ".75rem", fontFamily: "Poppins" }}>
                    {isEditing ? "Cancel Edit" : "Edit"}
                  </p>
                </button>
                {!isEditing && (
                  <>
                    <button className="options delete" onClick={handleDelete}>
                      <i
                        className="fa-solid fa-trash"
                        style={{ fontSize: "1.5rem" }}
                      />
                      <p style={{ fontSize: ".75rem", fontFamily: "Poppins" }}>
                        Delete
                      </p>
                    </button>
                    <button className="options done" onClick={markAsDone}>
                      {project.status !== "In Process" ? (
                        <>
                          <i
                            className="fa-solid fa-rotate-right"
                            style={{ fontSize: "1.5rem" }}
                          />
                          <p
                            style={{
                              fontSize: ".75rem",
                              fontFamily: "Poppins",
                            }}
                          >
                            Mark as In Process
                          </p>
                        </>
                      ) : (
                        <>
                          <i
                            className="fa-solid fa-check"
                            style={{ fontSize: "1.5rem" }}
                          />
                          <p
                            style={{
                              fontSize: ".75rem",
                              fontFamily: "Poppins",
                            }}
                          >
                            Mark as done
                          </p>
                        </>
                      )}
                    </button>
                  </>
                )}
                {isEditing && (
                  <button className="options done" onClick={handleEdit}>
                    <i
                      className="fa-solid fa-check"
                      style={{ fontSize: "1.5rem" }}
                    />
                    <p style={{ fontSize: ".75rem", fontFamily: "Poppins" }}>
                      Save Edit
                    </p>
                  </button>
                )}
              </div>
            </div>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                textAlign: "start",
              }}
            >
              Tasks
            </p>
            <TaskItem tasks={tasks} />
          </div>
        </div>
      )}
    </>
  );
}
