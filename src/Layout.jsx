import React, { useContext, useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import ContextProvider from './Context/contextProvider'
import Login from './components/Login'


function Layout() {

//  const {isLoggedin, setIsLoggedin} = useContext(Context);
    

    return (
        <>
         <Header  />
         <Outlet />
         <Footer />
         </>
    )
}

export default Layout
