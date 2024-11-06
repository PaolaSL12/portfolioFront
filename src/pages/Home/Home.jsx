import React, { useEffect, useState, useContext } from "react";

import { API } from "../../utils/API/API";
import ImgWrapper from "../../components/ImgWrapper/ImgWrapper";
import "./Home.css";
import { LanguageContext } from "../../utils/Context/LenguageContext";

const Home = () => {
  const { language } = useContext(LanguageContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API({ endpoint: "profiles", language })
      .then((data) => {
        setProfileData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [language]);  

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{`Error: ${error}`}</p>;

  return (
    <div className="home">
      <ImgWrapper c={"heroImg"} url={"./assets/icon.png"} alt={"heroImg"} />
      <div className="infoHero">
        {profileData ? (
          <div>
            <p>{profileData[0].aboutMe}</p>
          </div>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;