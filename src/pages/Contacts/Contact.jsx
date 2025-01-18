import { useContext, useEffect, useState } from "react";
import "./Contact.css";
import { LanguageContext } from "../../utils/Context/LenguageContext";
import { API } from "../../utils/API/API";

const Contact = () => {
  const { language } = useContext(LanguageContext);
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await API({ endpoint: "contacts", language });
        console.log(data)
        setContact(data);
      } catch (err) {
        setError(err.message || "Failed to fetch contacts.");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [language]);

  return (
    <div className="contact">
      {loading && <p>Loading...</p>}
      {error && (
        <div className="error">
          <p>{`Error: ${error}`}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
     {!loading && !error && contact.length > 0 ? (
        <div className="contactsContainer">
          <div>contact</div>
        </div>
      ) : (
        !loading && <p>No info available.</p>
      )}
    </div>
  );
}

export default Contact