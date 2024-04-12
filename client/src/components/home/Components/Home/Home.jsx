import React from 'react'
import './Home.css'
import Pic from '../../assets/home.png'
import Arrow from '../../assets/right-arrow.png'
import './Home.css'
import { Link, animateScroll as scroll } from "react-scroll";
export default function Home() {
  return (
    <div className='home container'>
        <div className="home-text">
            <h1>We ensure verification and privacy of transcripts</h1>
            <p>Supercert is a blockchain-based credential storing transcripts securely. It ensures authenticity and immutability, revolutionizing academic record-keeping.</p>
            <button className='btn'><Link to ='about' smooth={true} offset={-300} duration={500}>Explore More</Link><img src={Arrow} /></button>
        </div>
        <div className='home-image'><img src={Pic} alt='Picture of Protected Certificate' /></div>
         </div>
  )
}
