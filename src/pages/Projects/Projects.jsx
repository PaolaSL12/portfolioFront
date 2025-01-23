import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../utils/Context/LenguageContext";
import "./Projects.css";
import Card from "../../components/Card/Card";
import { API } from "../../utils/API/API";

const Projects = () => {
  const { language } = useContext(LanguageContext);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 

      try {
        const data = await API({ endpoint: "projects", language });
        setProjectsData(data);
        console.log(projectsData)
      } catch (err) {
        setError(err.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="projects">
    {projectsData.map((project) => {
      console.log(project);
      return <Card project={project} key={project._id} />;
    })}
  </div>
  )
}

export default Projects