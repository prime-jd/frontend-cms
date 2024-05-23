import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './components/Login.jsx'
import DayForm from './components/DayForm.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import TableForm from './components/TableForm.jsx'
import OTPGenerator from './components/OTPgenerator.jsx'
import OTPForm from './components/OTPForm.jsx'


const router = createBrowserRouter(
  
  [
    {
      path: '/frontend/',
      element: <Layout />,
      children: [
        { path: '/frontend/', element: <Home /> },
        { path: '/frontend/signup', element: <Register /> },
        { path: '/frontend/dayform', element: <DayForm /> },
        { path: '/frontend/tableform', element: <TableForm /> },
        { path: '/frontend/teacher-tt', element: <OTPGenerator /> },
      ],
    },
    { path: '/frontend/otpform', element: <OTPForm /> },
    { path: '/frontend/login', element: <Login /> },
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
)
