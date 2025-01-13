import { useContext, useEffect, useState } from "react";
import AWrapper from "../../components/aWrapper/aWrapper";
import { API } from "../../utils/API/API";
import "./Certificates.css";
import { LanguageContext } from "../../utils/Context/LenguageContext";

const Certificates = () => {
  const { language } = useContext(LanguageContext);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await API({ endpoint: "certificates", language });
        setCertificates(data);
      } catch (err) {
        setError(err.message || "Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [language]);

  return (
    <div className="certificates">
      {loading && <p>Loading...</p>}
      {error && (
        <div className="error">
          <p>{`Error: ${error}`}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
     {!loading && !error && certificates.length > 0 ? (
        <div className="certificatesContainer">
          {certificates.map((certificate, index) => (
            <div className="certificate">
            <AWrapper
              key={index} 
              href={certificate.url}
              c={certificate.name}
              url={certificate.imageUrl}
              alt={certificate.name}
            />
            <div className="content">
            <h3>{certificate.name}</h3>
            <p>{certificate.academy}</p>
            </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No certificates available.</p>
      )}
    </div>
  );
};

export default Certificates;
