import React from 'react'
import { useState, useEffect } from 'react';
import "../App.css"
import Cookies from 'js-cookie';

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
            <li><a href="/">Home</a></li>
            {isLoggedin && <li><a href="/login">logout</a></li>}
            {isStudent &&<li><a href="/dayform">DayForm</a></li>}
            {isLoggedin && <li><a href="/contact">Contact</a></li>}
            {isFaculty && <li><a href="/teacher-tt">TimeTable</a></li>}
          </ul>
        </nav>
      </header>
    );
  }
  export default Header;
