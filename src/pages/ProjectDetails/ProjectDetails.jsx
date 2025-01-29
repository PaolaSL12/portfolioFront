import React, { useContext, useEffect, useState } from "react";
import "./ProjectDetails.css";
import { useParams } from "react-router-dom";
import { API } from "../../utils/API/API";
import { LanguageContext } from "../../utils/Context/LenguageContext";

const ProjectDetails = () => {
  const { language } = useContext(LanguageContext);
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [detailsId, setDetailsId] = useState(id);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const data = await API({ endpoint: `projects/${detailsId}`, language });
        setProjectDetails(data);
        if (data?.relatedProject) {
          setDetailsId(data.relatedProject);
        }
      } catch (err) {
        setError(err.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjectDetails();

  }, [language]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="project-details">
      <h2>{projectDetails?.title}</h2>
      {projectDetails?.description?.map((descItem, index) => (
        <div key={index}>
          <h3>{descItem.titleDesc}</h3>
          {descItem.desc.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectDetails;
