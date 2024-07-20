import React from 'react'
import { useState, useEffect } from 'react';
import "../App.css"
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [isFaculty, setFaculty] = useState(false)
  const [isStudent, setStudent] = useState(false)

  function getCookieDetails() {
    const cookies = Cookies.get("userLogged");
    if(cookies==="teacher"){
      setFaculty(true)
    }
    if(cookies==="student"){
      setStudent(true)
    } 
    if(cookies != "")
      setIsLoggedin(true)
  }

  useEffect(()=>{
    getCookieDetails()
    // console.log(getCookieDetails())
    // console.log(isLoggedin)
    // console.log(document.cookie)
  },[getCookieDetails])

    return (
      <header>
        <h1>Class Monitoring System</h1>
        <nav>
          <ul >
            <li><Link to="/">Home</Link></li>
            {isLoggedin && <li><Link to='/login'>logout</Link></li>}
            {isStudent &&<li><Link to="/dayform">DayForm</Link></li>}
            {isLoggedin && <li><Link to="/contact">Contact</Link></li>}
            {isFaculty && <li><Link to="/teacher-tt">TimeTable</Link></li>}
          </ul>
        </nav>
      </header>
    );
  }
  export default Header;
