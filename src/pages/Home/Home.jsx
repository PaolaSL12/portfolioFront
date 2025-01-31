import React, { useEffect, useState, useContext } from "react";
import { API } from "../../utils/API/API";
import ImgWrapper from "../../components/ImgWrapper/ImgWrapper";
import "./Home.css";
import { LanguageContext } from "../../utils/Context/LenguageContext";
import { useProjects } from "../../utils/Context/ProjectsContext";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";

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
        console.log(data[1]);
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
      <ImgWrapper c={"me"} url={"https://res.cloudinary.com/daowiromv/image/upload/v1738256634/portfolio/me2_go9tzm.jpg"} alt={"picture"} imgc="picture" />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{`Error: ${error}`}</p>}
      {!loading && !error && profileData ? (
        <div className="infoHero">
          <p className="text">{profileData[0]?.aboutMe1 || "No information available."}</p>
          <ImgWrapper c={"heroImg"} url={"./assets/icon.png"} alt={"heroImg"} />
          <p className="text2">{profileData[0]?.aboutMe2 || "No information available."}</p>
        </div>
      ) : null}

      

      <div className="homeCards">
        {projectsData.map((project) => (
          <Card project={project} key={project._id} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
