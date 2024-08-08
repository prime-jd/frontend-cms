import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "../styles.css"

function OTPForm() {
  const [rollNo, setRollNo] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [timerStarted, setTimerStarted] = useState(false);

  const handleNavigation = () => {
    setTimerStarted(true);
    setTimeout(() => {
      navigate('/dayform');
    }, 3000); // 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/user/authotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rollNo, otp }),
      });
      const data = await response.json();
      console.log(data); // Handle the response as needed
      // navigate('/dayform');
      setMessage(data.message);
      handleNavigation();
    } catch (error) {
      console.log('Error sending OTP:', error);
      setMessage(error);
    }
    
  };

  return (
    <div>
      <div>
        {message && <p style={{fontFamily :'cursive', color:'red',textAlign:'center'}}>{message}</p>}
      <h2>Send OTP</h2>
      <form onSubmit={handleSubmit} action='/otpform'>
        <label htmlFor="rollNo">Roll Number:</label>
        <input
          type="text"
          id="rollNo"
          name="rollNo"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        />
        <br />
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          required
        />
        <br />
        <button type="submit">Send OTP</button>
      </form>
      </div>
    </div>
  );
}

export default OTPForm;
