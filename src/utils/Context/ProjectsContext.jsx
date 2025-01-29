import { createContext, useContext, useState } from "react";
import { API } from "../API/API";



export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchProjects = async (language) => {
    setLoading(true);
    setError(null);
    try {
      const data = await API({ endpoint: "projects", language });
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProjectsData(sortedData);
    } catch (err) {
      setError(err.message || "Error al cargar los proyectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectsContext.Provider value={{ projectsData, loading, error, fetchProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);