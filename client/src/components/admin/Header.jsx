import React from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
  const navigate = useNavigate()
  const handleLogout = () => {

    axios.post('http://localhost:5001/user/logout', {}, {
      withCredentials: true
    });
    Cookies.remove('token', { path: '/' });
    const token = Cookies.get('token')
    if (token) {
      console.log(token)
    }
    navigate("/")

  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg p-2 fs-4">
        <div className="container-fluid">
          <a className="navbar-brand fs-4" href="/">SUPERCERT</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/admin">Home</a>
              </li>

            </ul>
            <div className="d-flex flex-row-reverse bd-highlight">
              <div className="p-4 bd-highlight">
                <button onClick={handleLogout}><a className="nav-link active" style={{'border': "none"}} aria-current="page" href="#">Logout</a></button>
              </div>
            </div>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Header


// []- use react boostrap
// []-img and name on left,logout on right
// []- find good font and color

