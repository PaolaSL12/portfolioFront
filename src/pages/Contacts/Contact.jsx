import { useContext, useEffect, useState } from "react";
import "./Contact.css";
import { LanguageContext } from "../../utils/Context/LenguageContext";
import { useForm } from "react-hook-form";
import { API } from "../../utils/API/API";
import AWrapper from "../../components/aWrapper/aWrapper";

const Contact = () => {
  const { language } = useContext(LanguageContext);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchContactData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await API({ endpoint: "contacts", language });
        setContactData(data);
        console.log(contactData);
      } catch (err) {
        setError(err.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, [language]);

  const onSubmit = async (formData) => {
    try {
      const result = await API({
        endpoint: "contact/send",
        language,
        method: "POST",
        body: formData,
      });

      if (result.success) {
        alert(
          "Correo enviado correctamente. Gracias por contactarnos, te responderemos a la brevedad."
        );
        reset();
      } else {
        alert(result.message || "Hubo un problema al enviar el correo");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Error al enviar el correo");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!contactData) return <p>No se encontraron datos de contacto</p>;

  return (
    <div className="contact">
      {contactData ? (
        <div className="contact-form ">
          <h2>{contactData[0].header}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>{contactData[0].form[0]}:</label>
              <input
                className="inputForm"
                type="text"
                {...register("name", { required: "El nombre es obligatorio" })}
              />
              {errors.name && (
                <p style={{ color: "red" }}>{errors.name.message}</p>
              )}
            </div>

            <div>
              <label>{contactData[0].form[1]}:</label>
              <input
                className="inputForm"
                type="email"
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo electrónico inválido",
                  },
                })}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label>{contactData[0].form[2]}:</label>
              <textarea
                className="textarea"
                {...register("message", {
                  required: "El mensaje es obligatorio",
                })}
              ></textarea>
              {errors.message && (
                <p style={{ color: "red" }}>{errors.message.message}</p>
              )}
            </div>

            <button type="submit" className="submitButton">
              {contactData[0].form[3]}
            </button>
          </form>
        </div>
      ) : (
        <p>Cargando datos del formulario...</p>
      )}
      <div className="footer">

          <AWrapper
            href={contactData[0].socials[0].url}
            c="footerImg"
            url={"./assets/linkedin.png"}
            alt={contactData[0].socials[0].name}
          />
 
          <AWrapper
            href={contactData[0].socials[1].url}
            c="footerImg"
            url={"./assets/github.png"}
            alt={contactData[0].socials[1].name}
          />

      </div>
    </div>
  );
};

export default Contact;
