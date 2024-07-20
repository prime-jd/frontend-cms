import React from 'react'
import { useState, useEffect } from 'react';
import "../App.css"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const { user}= useSelector((state)=>state.variables);
  const [isFaculty, setFaculty] = useState(false)
  const [isStudent, setStudent] = useState(false)
  
  useEffect(()=>{
    if(user){
      if(user!='' && user.substr(0,2)==='T_')
        setFaculty(true);
      if(user!='' && user.substr(0,2)!=='T_')
        setStudent(true);
    }
  },[])

    return (
      <header>
        <h1>Class Monitoring System</h1>
        <nav>
          <ul >
            <li><Link to="/">Home</Link></li>
            <li><Link to='/login'>{user ? 'logout' : 'login/signup'}</Link></li>
            {isStudent &&<li><Link to="/dayform">DayForm</Link></li>}
            {user && <li><Link to="/contact">Contact</Link></li>}
            {isFaculty && <li><Link to="/teacher-tt">TimeTable</Link></li>}
          </ul>
        </nav>
      </header>
    );
  }
  export default Header;
