import React, { useContext, useEffect, useState } from "react";
import "./Footer.css";
import AWrapper from "../aWrapper/aWrapper";
import { LanguageContext } from "../../utils/Context/LenguageContext";
import { API } from "../../utils/API/API";

const Footer = () => {
  const { language } = useContext(LanguageContext);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      setLoading(true);
      setError(null); 

      try {
        const data = await API({ endpoint: "contacts", language });
        setContactData(data);
        console.log(data); 
      } catch (err) {
        setError(err.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, [language]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!contactData || !contactData[0]?.socials) {
    return <div>No contact information available.</div>;
  }

  return (
    <div className="footer">
      <div>
        <AWrapper
          href={contactData[0].socials[0].url}
          c="footerImg"
          url={"./assets/linkedin.png"}
          alt={contactData[0].socials[0].name}
        />
        <span>LINKEDIN</span>
      </div>

      <div>
        <AWrapper
          href={contactData[0].socials[1].url}
          c="footerImg"
          url={"./assets/github.png"}
          alt={contactData[0].socials[1].name}
        />
        <span>GITHUB</span>
      </div>
    </div>
  );
};

export default Footer;
