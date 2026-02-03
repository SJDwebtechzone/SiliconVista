import './App.css'
import {Routes , Route} from 'react-router-dom';
import { HashLink } from "react-router-hash-link";

import Navbar from './Components/Navbar.jsx';
import WhatsappIcon from './Components/WhatsappIcon.jsx';
import CallButton from './Components/CallButton.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';

import Home from './pages/Home.jsx';
import About from  './pages/About.jsx';
import Courses from './pages/Courses.jsx';
import Contact from './pages/Contact.jsx';



function App() {

  return (
    <div>
      <Navbar />

      <ScrollToTop />
      
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/about" element = {<About />} />
        <Route path = "/courses" element = {<Courses />} />
        <Route path = "/Contact" element = {<Contact />} />
      </Routes>

      <CallButton />
      <WhatsappIcon />
    </div>
  )
}

export default App
