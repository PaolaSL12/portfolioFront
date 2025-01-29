import React, { useEffect, useState, useContext } from "react";
import { API } from "../../utils/API/API";
import ImgWrapper from "../../components/ImgWrapper/ImgWrapper";
import "./Home.css";
import { LanguageContext } from "../../utils/Context/LenguageContext";
import { useProjects } from "../../utils/Context/ProjectsContext";
import Card from "../../components/Card/Card";

const Home = () => {
  const { projectsData, fetchProjects } = useProjects();
  const { language } = useContext(LanguageContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await API({ endpoint: "profiles", language });
        setProfileData(data);
      } catch (err) {
        setError(err.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects(language);
    console.log(projectsData);

    fetchData();
  }, [language]);

  return (
    <div className="home">
      <ImgWrapper c={"heroImg"} url={"./assets/icon.png"} alt={"heroImg"} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{`Error: ${error}`}</p>}
      {!loading && !error && profileData ? (
        <div className="infoHero">
          <p>{profileData[0]?.aboutMe || "No information available."}</p>
        </div>
      ) : null}

      <div className="homeCards">
        {projectsData.map((project) => (
          <Card project={project} key={project._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
