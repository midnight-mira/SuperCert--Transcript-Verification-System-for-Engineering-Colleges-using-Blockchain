import React from 'react'
import A1 from '../../assets/a1.png'
import A2 from '../../assets/a2.png'
import A3 from '../../assets/a3.png'
import './Aboutus'
const Aboutus = () => {
  return (
    <div className='about container'>
        <div className="about-left">
            <div className='Block1'>
                <img src={A1} className='Image1'/>
                <h3>Identity Misrepresentation</h3>
            </div>

            <div className='Block2'>
                <img src={A2} className='Image2'/>
                <h3>Identity Misrepresentation</h3>
            </div>

            <div className='Block3'> 
                <img src={A3} className='Image3'/>
                <h3>Document Tampering</h3>
            </div>
        
      
        </div>
            <div className="about-right">
                <div className='content'>
                <h2>What is Supercet?</h2>
                <p>At SuperCert, we understand the challenges and risks associated with traditional paper-based certifications. That's why we've pioneered a revolutionary blockchain-based solution to ensure the authenticity and integrity of educational credentials.</p>
                <p>With our platform, you can say goodbye to the risks of certificate manipulation and fraud. Our decentralized trust system guarantees tamper-proof certification, providing automatic, real-time verification that's both reliable and fraud-proof.</p>
                <h2>Why Supercert?</h2>
                <ul>
                <li>Data Privacy: Your information stays secure with you.</li>
                    <li>Real-time, Automated Verification: Verify credentials from anywhere in the world instantly.</li>
                    <li>Tamper and Fraud Resistant: Blockchain ensures the integrity of certificates.</li>
                    <li>Permanence: Certificates remain valid beyond organizations, eliminating reliance on issuing authorities for future verifications.</li>
                    <li>Scalability: Our solution can scale to meet the needs of both national and global certifications.</li>
                </ul>
                <h3>Join us in revolutionizing the way educational credentials are managed and verified. With SuperCert, trust and security are built into every certificate. Say hello to a future where verification is seamless, reliable, and hassle-free.</h3>
            </div>
            </div>
    </div>
  )
}

export default Aboutus
