import React from "react";
import Nav from "./Components/Navbar/Navbar.jsx";
import Title from "./Components/Title/Title.jsx";
import Home from "./Components/Home/Home.jsx";
import Aboutus from "./Components/Aboutus/Aboutus.jsx";
import TeamMembers from "./Components/TeamMembers/TeamMembers.jsx";
import Contact from "./Components/ContactUs/ContactUs.jsx";
import Footer from "./Components/Footer/Foooter.jsx";
import './App.css'

const HomePage = () => {
  return (
    <div className="App">
      
           <Nav />
           <Home />
           <div className="container">
           <Title subTitle="ABOUT SUPERCERT" title="Your Trusted Source for Secure and Verified Educational Certificates" />
           <Aboutus />
           <Title subTitle="Team Members" />
           <TeamMembers />
           <Title subTitle="Contact Us" />
           <Contact />
             </div>
             <Footer />
         
           
    </div>
  );
}

export default HomePage;