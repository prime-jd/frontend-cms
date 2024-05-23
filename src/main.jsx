import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './App.css'
import { Route, RouterProvider, HashRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './components/Login.jsx'
import DayForm from './components/DayForm.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import TableForm from './components/TableForm.jsx'
import OTPGenerator from './components/OTPgenerator.jsx'
import OTPForm from './components/OTPForm.jsx'


const router = HashRouter(
  
  createRoutesFromElements(
    <Route>
    <Route path='/frontend/' element={<Layout />}>
       <Route path='' element={<Home  />} />
       <Route path='signup' element={<Register />} />
       <Route path='dayform' element={<DayForm />} />
       <Route path='tableform' element={<TableForm />} />
       <Route path='teacher-tt' element={<OTPGenerator/>} />
    </Route>
    <Route path='/frontend/otpform' element={<OTPForm/>} />
    <Route path='/frontend/login' element={<Login />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
