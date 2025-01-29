import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ImgWrapper from "../ImgWrapper/ImgWrapper.jsx";
import { LanguageContext } from "../../utils/Context/LenguageContext.jsx";
import './Header.css'

const Header = () => {
  const { language, toggleLanguage } = useContext(LanguageContext); 

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav>
      <Link to="/" className="logo">
      <ImgWrapper
          c={"logoImg"}
          url={"./assets/logo.png"}
          alt={"logo"}
        />
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
            {language === "es" ? "HOME" : "HOME"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" onClick={closeMenu}>
            {language === "es" ? "PROYECTOS" : "PROJECTS"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/education" onClick={closeMenu}>
            {language === "es" ? "CERTIFICADOS" : "CERTIFICATES"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacts" onClick={closeMenu}>
            {language === "es" ? "CONTACTO" : "CONTACT"}
          </NavLink>
        </li>
        <li>
          <button
            className="language-toggle"
            onClick={toggleLanguage} 
            aria-label={
              language === "es" ? "Cambiar idioma a Inglés" : "Switch to Spanish"
            }
          >
            <ImgWrapper
              c={"flag-icon"}
              url={language === "es" ? "./assets/es.png" : "./assets/en.png"}
              alt={language === "es" ? "Bandera de España" : "U.S. Flag"}
            />
            <span className="language-label">
              {language === "es" ? "ES" : "EN"}
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;