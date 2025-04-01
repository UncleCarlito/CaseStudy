import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProjectContext = createContext();

const ProjectContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const addProject = async (title, description) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/projects/",
        {
          title,
          description,
          status: "In Process",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data.data;
    } catch (e) {
      console.log(e.message);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getAllProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/projects/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data.data;
    } catch (e) {
      console.log(e.message);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getAProject = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data.data;
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getTasksOfProject = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/projects/${id}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data.data;
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/projects/${id}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data.data;
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const editProject = async (id, title, description) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/projects/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return true;
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setLoading(true);
    console.log(`Received ${status}`);

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/projects/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.status);
      console.log(res.data.data);

      return true;
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return true;
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        loading,
        addProject,
        getAllProjects,
        getAProject,
        getTasksOfProject,
        editProject,
        deleteProject,
        updateStatus,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;

export const UseProjectContext = () => {
  return useContext(ProjectContext);
};
