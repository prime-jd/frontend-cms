import React, { useState, useCallback, useEffect, Children } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles.css"
import { useDispatch, useSelector } from 'react-redux';
import { setuser } from '../features/variables/variablesSlice.js';
import { Link } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState();
  const navigate = useNavigate();
  const {user} = useSelector((store)=>store.variables)
  const dispatch = useDispatch();
  
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
      const data = await response.json();
      dispatch(setuser(data.message.user.username)); // assuming the response has a field 'username'
      navigate("/")
      
    } catch (error) {
      setError(error.message);
    }
   
  });

  const handleLogout = () => {
    fetch('/api/v1/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          dispatch(setuser(''));
        } else {
          console.error('Failed to logout');
        }
      })
      .catch((err) => {
        throw err;
      })
  };

  const handleCancel = ()=>{
    navigate('/');
  }
  
  useEffect(()=>{
     console.log(user);
  },[])

  return (
  
    <div className='container'>
      {error && <div>{error}</div>}
      {!user && <div className='login-box'>
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
        <h4 style={{color:'white'}}>Already Signup? <Link to='/signup'>signup</Link></h4>
      </form>
      </div>}

      {/*logout*/}
      {user && <div className='login-box'>
          <h4 style={{textAlign: 'center', color: 'white'}}>Do you want to logout? </h4>
          <button onClick={handleLogout}>Logout User</button><hr></hr>
          <button onClick={handleCancel}> Cancel</button>

        </div>}      
    </div>
      
  );
}

export default Login;
