import React, { useContext, useEffect, useState } from "react";
import "./ProjectDetails.css";
import { useParams } from "react-router-dom";
import { API } from "../../utils/API/API";
import { LanguageContext } from "../../utils/Context/LenguageContext";
import AWrapper from "../../components/aWrapper/aWrapper";
import ImgWrapper from "../../components/ImgWrapper/ImgWrapper";
import Footer from "../../components/Footer/Footer";

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
    <>
    <div className="projectDetails">
      <h1>{projectDetails?.title}</h1>
      <AWrapper
        href={projectDetails?.url}
        url={projectDetails?.imageUrl}
        alt={projectDetails?.title}
        c={"detailImg"}
      />
      {projectDetails?.description?.map((descItem, index) => (
        <div className="description" key={index}>
          <h3>{descItem.titleDesc}</h3>
          {descItem.desc.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      ))}

      {projectDetails?.imgs?.map((img, index) => (
        <div key={index} className={`projectImg projectImg-${index + 1}`}>
          <ImgWrapper url={img.url[0]} alt={img.name} />
        </div>
      ))}

      {projectDetails?.technologies?.map((tech, index) => (
        <div key={index} className="tech">
          <h3>{tech.name}</h3>
          <p>{tech.desc[0]}</p>
        </div>
      ))}

    </div>
          <Footer /> 
          </>
  );
};

export default ProjectDetails;
