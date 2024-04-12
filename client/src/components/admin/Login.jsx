import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate= useNavigate()
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:5001/user/login', {
          email,
          password,
        });
  
        // Assuming the server sends back a token upon successful login
        const token = response.data.accessToken;
        console.log(token)
        
  
        // Set the token in a cookie with an expiry time (e.g., 1 day)
        Cookies.set('token', token, { expires: 1 });
  
        console.log('Login Successful!', response.data);
        if(token){
            navigate("/admin")
        }
        // Here you can redirect the user or perform any other actions
      } catch (error) {
        console.error('Login Error:', error.response.data);
        setError('Invalid username or password');
      }
    };


    return (
        <div className="container border border-black rounded m-4 d-flex justify-content-center align-items-center style={{ height: '100vh' }}">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        className="form-control"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login