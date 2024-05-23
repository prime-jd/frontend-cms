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
      path: '/vite-react-router/',
      element: <Layout />,
      children: [
        { path: '/vite-react-router/', element: <Home /> },
        { path: '/vite-react-router/signup', element: <Register /> },
        { path: '/vite-react-router/dayform', element: <DayForm /> },
        { path: '/vite-react-router/tableform', element: <TableForm /> },
        { path: '/vite-react-router/teacher-tt', element: <OTPGenerator /> },
      ],
    },
    { path: '/vite-react-router/otpform', element: <OTPForm /> },
    { path: '/vite-react-router/login', element: <Login /> },
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
)
