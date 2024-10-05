import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Notfound from './pages/Notfound'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={<Notfound/>}/>
    </Routes>
    </>
  )
}

export default App
