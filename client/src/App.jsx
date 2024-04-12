import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/home/Layout'
import HomePage from './components/home/HomePage'
import AdminHomePage from './components/admin/AdminHomePage'
import AdminLayout from './components/admin/AdminLayout'
import AddDocument from './components/admin/AddDocument'
import Verify from './components/user/Verify'
import UserLayout from './components/user/UserLayout'
import Login from './components/admin/Login'
import Protected from './components/Protected'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Protected Component={AdminHomePage} />} />
        <Route path="/admin/addDocument" element={<Protected Component={AddDocument}/>} />
      </Route>

      <Route path="/guest" element={<UserLayout />} >
        <Route index element={<Verify />} />
      </Route>


    </Routes>
  )
}

export default App
