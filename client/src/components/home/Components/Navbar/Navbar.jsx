import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Navbar.css'
import { Link, animateScroll as scroll } from "react-scroll";
import icon from '../../assets/Final.png'
const Navbar = () => {
  const navigate = useNavigate()
  const [selectedPage, setSelectedPage] = useState('');
  const handleNavigation = (e) => {
    if (selectedPage) {
      console.log(selectedPage)
      navigate(value)
    }
  };

  return (
    <nav className='nav'>
      <img src={icon} alt="its an logo" className='logo' />

      <ul>
        <li><Link to='home' smooth={true} offset={0} duration={500}>Home</Link></li>
        <li><Link to='about' smooth={true} offset={-300} duration={500}>About us</Link></li>
        <li><Link to='people' smooth={true} offset={-260} duration={500}>Team Members</Link></li>
        <li><Link to='contact' smooth={true} offset={-260} duration={500}>Contact us</Link></li>
        <li>
          <div class="dropdown btn">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Login as
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="/admin">Admin</a></li>
              <li><a class="dropdown-item" href="/guest">Verifier</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
