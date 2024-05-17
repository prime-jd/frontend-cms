import React, { useState } from 'react';
import '../App.css' ; // Import your custom CSS file
import axios from 'axios';
import { data } from 'autoprefixer';


const Register = () => {
    const[response, setResponse] = useState("please signup");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [stats, setStats] = useState(0)

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleCoverImageChange = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('coverImage', coverImage);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('fullname', fullname);

    
    fetch('/api/v1/user/register',
       {method : 'POST',
       body : formData}
  )
    .then(res => {
       res.json().then(data =>{setResponse(data.message); setStats( data.statusCode)})
    })
    .catch(error => {
      // Handle error response
      setResponse(error.message);
    });
  }

  const boxStyle = {
    fontFamily : 'cursive',
    width: '100%',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: stats > 400 ?'CDFADB' :'#FF8080',
    color:'#dc3545',
    fontSize: '24px',
    marginRight: '10px',
  };


  return (
    <>
 

   <div style={boxStyle}>
      {response}
    </div>  



    <div className="container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit} id="registration-form">
        <div className="form-group">
          <label htmlFor="avatar" className="form-label">Avatar:</label>
          <input type="file" id="avatar" accept="image/*" className="form-input" onChange={handleAvatarChange} />
        </div>
        <div className="form-group">
          <label htmlFor="coverImage" className="form-label">Cover Image:</label>
          <input type="file" id="coverImage" accept="image/*" className="form-input" onChange={handleCoverImageChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" id="email" className="form-input" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" id="password" className="form-input" value={password} onChange={handlePasswordChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input type="text" id="username" className="form-input" value={username} onChange={handleUsernameChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="fullname" className="form-label">Full Name:</label>
          <input type="text" id="fullname" className="form-input" value={fullname} onChange={handleFullnameChange} required />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
      
    
     
    </div>
    <p className='text'>Already registered? Please login</p> 
    <div className='container1'>
       <a href='/login' className='buttonStyle'>Login to Access</a>
       </div>
    </>
  );
};

export default Register;
