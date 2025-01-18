import React from "react";
import Home from "./pages/Home/Home";
import Certificates from "./pages/Certificates/Certificates";
import Contact from "./pages/Contacts/Contact";
import { Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./utils/Context/LenguageContext";
import Header from "./components/Header/Header";
import Proyects from "./pages/Projects/Projects";
import ProyectDetails from "./pages/ProjectDetails/ProjectDetails";


function App() {
  return (
    <LanguageProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Proyects />} />
        <Route path="/project/:id" element={<ProyectDetails />} />
        <Route path="/education" element={<Certificates />} />
        <Route path="/contacts" element={<Contact />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
