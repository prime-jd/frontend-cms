import React, { useState, useCallback, useEffect, Children } from 'react';
import { useNavigate } from 'react-router-dom';
import  ContextProvider  from '../Context/contextProvider.js';
import "../styles.css"
import Layout from '../Layout.jsx';

function Login({Children}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  function getCookieDetails() {
    const cookies = document.cookie;
    if(cookies===""){
      return false;
    }
    return true;
  }
  


  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch('/api/v1/user/logout', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //     });
  //     setIsLoggedin(false)
  //   } catch (error) {
  //     console.log('Network error:', error);
  //   }
  // };

  const handleSubmit = (async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      //console.log(response.data)
      const data = await response.json();
      
      console.log(data.message.user.username)
      setUsername(data.message.user.username); // assuming the response has a field 'username'
      navigate("/")
      
    } catch (error) {
      setError(error.message);
    }
   
  });

  useEffect(()=>{
    setIsLoggedin(getCookieDetails())
    // console.log(getCookieDetails())
    // console.log(isLoggedin)
    // console.log(document.cookie)
  },[getCookieDetails])

  


  return (
  
    <div className='container'>
      
      {error && <div>{error}</div>}
      {!isLoggedin && <div className='login-box'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        
        
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
     
        <button type="submit">Login</button>
      </form>
      </div>}

      {/*logout*/}
      {isLoggedin && <div className='login-box'>
        <h1>Logout</h1>
        <form   action='/api/v1/user/logout'  method='post'>
          <button type='submit'>Logout User</button>
        </form>
        </div>}
      
    </div>
      
  );
}

export default Login;
