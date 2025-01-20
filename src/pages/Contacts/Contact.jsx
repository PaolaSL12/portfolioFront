import { useContext } from "react";
import "./Contact.css";
import { LanguageContext } from "../../utils/Context/LenguageContext";
import { useForm } from "react-hook-form";
import { API } from "../../utils/API/API";

const Contact = () => {
  const { language } = useContext(LanguageContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const result = await API({
        endpoint: "contact/send",
        language,
        method: "POST",
        body: formData,
      });

      if (result.success) {
        alert("Correo enviado correctamente");
        reset();
      } else {
        alert(result.message || "Hubo un problema al enviar el correo");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Error al enviar el correo");
    }
  };

  return (
    <div className="contact">
      <div className="contact-form">
        <h2>Contáctame</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label>Correo Electrónico:</label>
            <input
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
            <label>Mensaje:</label>
            <textarea className="textarea"
              {...register("message", {
                required: "El mensaje es obligatorio",
              })}
            ></textarea>
            {errors.message && (
              <p style={{ color: "red" }}>{errors.message.message}</p>
            )}
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
