import React, { useRef } from 'react'
import './TeamMembers.css'
import Next from '../../assets/angle-right.png'
import Back from '../../assets/angle-left.png'
import User1 from '../../assets/Myself.jpeg'
import Linkedln from '../../assets/social.png'
import Github from '../../assets/github.png'

export default function TeamMembers() {
 const slider = useRef();
 let tx =0;
 const slideforward =() =>{
  if(tx >-50){
    tx-=25;
  }
  slider.current.style.transform =`translateX(${tx}%)`
 }
const slidebackward = () =>{ 
   if(tx < 0){
  tx+=25;
}
slider.current.style.transform =`translateX(${tx}%)`
}
  return (
   
    <div className='people'>
      <div className="gallery">
     
        <img src={Back} className='back-btn'  onClick={slidebackward}/>
        <img src={Next} className='next-btn' onClick={slideforward}/>
        <div className="slider">
          <ul ref={slider}>
            {/* Member 1 */}
             <li>
              <div className="slide">
                <div className='user-info'>
                  <img src={User1} />
                  <div>
                    <h3>Name</h3>
                    <p>Group Leader</p>
                    <p>Roll No.: 41</p>
                    <p>Gmail:</p>
                  </div>
                </div>
                <div className='Footer'>
                 <a href="/"><img src={Linkedln} /></a><span />
                 <a href="/"><img src={Github} /></a>
               </div> </div>
            </li>
          </ul> 
        </div>
      </div>
    </div>
  )
}
