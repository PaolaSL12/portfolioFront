import { useEffect, useState } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import ImgWrapper from "../ImgWrapper/ImgWrapper.jsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ES"
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "ES" ? "EN" : "ES";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  useEffect(() => {
    console.log(`Idioma seleccionado: ${language}`);
  }, [language]);

  return (
    <nav>
    <Link to="/" className="logo">
      <p>Paola Sanchez</p>
    </Link>

    <div
      className="toggle"
      onClick={toggleMenu}
      role="button"
      aria-expanded={isMenuOpen}
      aria-label="Toggle menu"
    >
      <ImgWrapper
        c={"toggleImg"}
        url={"./assets/menu.png"}
        alt={"toggle-button"}
      />
    </div>

    <ul className={`menu ${isMenuOpen ? "open" : ""}`} onClick={closeMenu}>
      <li>
        <NavLink to="/" onClick={closeMenu}>
          {language === "ES" ? "HOME" : "HOME"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/proyects" onClick={closeMenu}>
          {language === "ES" ? "PROYECTOS" : "PROJECTS"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/education" onClick={closeMenu}>
          {language === "ES" ? "CERTIFICADOS" : "CERTIFICATES"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/contacts" onClick={closeMenu}>
          {language === "ES" ? "CONTACTO" : "CONTACT"}
        </NavLink>
      </li>
      <li>
        <div
          className="language-toggle"
          onClick={toggleLanguage}
          role="button"
          aria-label="Toggle language"
        >
          <ImgWrapper
            c={"flag-icon"}
            url={language === "ES" ? "./assets/es.png" : "./assets/en.png"}
            alt={language === "ES" ? "Cambiar a Inglés" : "Switch to Spanish"}
          />
        </div>
      </li>
    </ul>
  </nav>
);
};

export default Header;
