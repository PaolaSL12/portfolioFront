import React from "react";
import Home from "./pages/Home/Home";
import Proyects from "./pages/Proyects/Proyects";
import Certificates from "./pages/Certificates/Certificates";
import Contact from "./pages/Contacts/Contact";
import { Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./utils/Context/LenguageContext";
import Header from "./components/Header/Header";

function App() {
  return (
    <LanguageProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyects" element={<Proyects />} />
        <Route path="/education" element={<Certificates />} />
        <Route path="/contacts" element={<Contact />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
