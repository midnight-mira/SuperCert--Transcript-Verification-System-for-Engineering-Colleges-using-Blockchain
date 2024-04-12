import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import '../../style/adminPage.css'

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AdminLayout