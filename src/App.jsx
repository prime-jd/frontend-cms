
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from './Layout.jsx'
import Login from './components/Login.jsx'
import DayForm from './components/DayForm.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import TableForm from './components/TableForm.jsx'
import OTPGenerator from './components/OTPgenerator.jsx'
import OTPForm from './components/OTPForm.jsx'
import DateForm from './components/DateForm.jsx'

function App() {
  
  const router = createBrowserRouter(
  
    createRoutesFromElements(
      <Route>
      <Route path='/' element={<Layout />}>
         <Route path='' element={<Home  />} />
         <Route path='signup' element={<Register />} />
         <Route path='dayform' element={<DayForm />} />
         <Route path='tableform' element={<TableForm />} />
         <Route path='teacher-tt' element={<OTPGenerator/>} />
         <Route path='recorddisplay' element={<DateForm />} />
      </Route>
      <Route path='/otpform' element={<OTPForm/>} />
      <Route path='/login' element={<Login />}/>
      </Route>
    )
  )
  
  

  return (
    <>
   
   <RouterProvider router={router} />
    
    </>
  )
}

export default App
