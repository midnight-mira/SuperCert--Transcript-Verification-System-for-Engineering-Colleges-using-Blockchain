import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg p-2 fs-4">
        <div className="container-fluid">
          <a className="navbar-brand fs-4" href="/">SUPERCERT</a>    
          </div>
      </nav>

    </div>
  )
}

export default Header


// []- use react boostrap
// []-img and name on left,logout on right
// []- find good font and color

