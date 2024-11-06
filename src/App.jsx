import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Certificates from './pages/Certificates/Certificates'
import Contact from './pages/Contacts/Contact'
import Home from './pages/Home/Home'
import Proyects from './pages/Proyects/Proyects'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyects" element={<Proyects />} />
        <Route path="/education" element={<Certificates />} />
        <Route path="/contacts" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
