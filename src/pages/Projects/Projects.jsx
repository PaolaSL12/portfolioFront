
import { useContext, useEffect } from "react";
import { LanguageContext } from "../../utils/Context/LenguageContext";
import "./Projects.css";
import { useProjects } from "../../utils/Context/ProjectsContext";
import Card from "../../components/Card/Card";

const Projects = () => {
  const { language } = useContext(LanguageContext); 
  const { projectsData, loading, error, fetchProjects } = useProjects(); 

  useEffect(() => {
    fetchProjects(language); 
    console.log(projectsData)
  }, [language]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="projects">
      {projectsData.map((project) => (
        <Card project={project} key={project._id} />
      ))}
    </div>
  );
};

export default Projects;