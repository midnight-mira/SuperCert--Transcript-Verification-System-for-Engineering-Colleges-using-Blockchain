import React from 'react'
import '../../App.css'
import Msg from '../../assets/comments.png'
import Mail from '../../assets/mail.png'
import Phone from '../../assets/phone-call.png'
import Location from '../../assets/gps.png'
export default function ContactUs() {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "76f3ec5b-ec46-4e1c-aeba-a18dd4a48cd5");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
             } else {
        console.log("Error", data);
        setResult(data.message);
        event.target.reset();
      }
    };
  
  return (
    <div className='contact'>
      <div className="contact-col">
        <h3>Send us a message <img src ={Msg} /></h3>
        <p>Please feel free to contact us for any inquiries</p>
        <ul>
            <li><img src={Mail} />Contact: akanksha.a.gairola@slrtce.in</li>
            <li><img src={Phone} />9637303766</li>
            <li><img src={Location} />Shree LR Tiwari College of Engineering</li>
        </ul>
        </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
            <label>Your Name</label>
            <input type='text' name='name' placeholder='Enter Your Name' required/>
            <label>Phone Number</label>
            <input type='tel' name='name' placeholder='Enter Your Phone Number' required/>
            <label>Write Your Message</label>
            <textarea name='message' rows='6' placeholder='Enter Your message' required></textarea>
            <button type='submit' className='btn dark-btn'>Submit Now</button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  )
}
