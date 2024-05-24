import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App.jsx';
//import './App.css'
import Layout from './Layout.jsx';
import Login from './components/Login.jsx';
import DayForm from './components/DayForm.jsx';
import Register from './components/Register.jsx';
import Home from './components/Home.jsx';
import TableForm from './components/TableForm.jsx';
import OTPGenerator from './components/OTPgenerator.jsx';
import OTPForm from './components/OTPForm.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/frontend/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='signup' element={<Register />} />
        <Route path='dayform' element={<DayForm />} />
        <Route path='tableform' element={<TableForm />} />
        <Route path='teacher-tt' element={<OTPGenerator />} />
      </Route>
      <Route path='/frontend/otpform' element={<OTPForm />} />
      <Route path='/frontend/login' element={<Login />} />
    </Route>
  ),
  {
    basename: '/frontend', // Add this line
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
