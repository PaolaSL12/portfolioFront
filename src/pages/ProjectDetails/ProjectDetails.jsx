import React, { useContext, useEffect, useState } from 'react'
import "./ProjectDetails.css";
import { LanguageContext } from '../../utils/Context/LenguageContext';
import { useParams } from 'react-router-dom';
import { API } from '../../utils/API/API';

const ProjectDetails = () => {
  const { language } = useContext(LanguageContext);
  const [projectsDetail, setProjectsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      setError(null); 

      try {
        const data = await API({ endpoint: `projects/${id}`, language });
        setProjectsDetail(data);
        console.log(projectsDetail)
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
      <h2>{projectsDetail.title}</h2>
    </div>
  )
}

export default ProjectDetails