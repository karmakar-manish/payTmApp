import { useState } from 'react'
import './App.css'

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

//import the routes
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SendMoney from './pages/SendMoney.jsx'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* default route  */}
        <Route path='/' element={<Navigate to="/signup"/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/sendmoney' element={<SendMoney/>}/>
      </Routes>
    </BrowserRouter>  
  )
}

export default App
