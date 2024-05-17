import React, { useState, useEffect } from 'react';
import '../style.css';
import Timetable from './TableForm';

function OTPGenerator() {
  const [data,setData]= useState([]);
  const [otp, setOTP] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [className, setClassName] = useState('');

  // Function to generate a random 4-digit OTP
  const generateOTP = () => {
    const otpValue = Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999
    setOTP(otpValue.toString()); // Convert to string and set the OTP state
  };

  // Function to get the current time and format it for input[type="time"]
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Ensures two-digit format
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensures two-digit format
    const formattedTime = `${hours}:${minutes}`;
    setCurrentTime(formattedTime);
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetch('/api/v1/user/teacher-TT')
      .then(response => response.json())
      .then(data => {
        setData(data.data);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const timeSlots = [
    '09:30 - 10:20', '10:20 - 11:10', '11:10 - 12:00', '12:00 - 12:50',
    '12:50 - 01:40', '01:40 - 02:30', '02:30 - 03:20', '03:20 - 04:10', '04:10 - 05:00'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      otp,
      time : currentTime,className
    };

    fetch('/api/v1/user/schedule-out', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success actions
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error actions
    });
  };

  // Fetch current time automatically when component mounts
  useEffect(() => {
    getCurrentTime();
    // Set an interval to update the time every minute
    const intervalId = setInterval(getCurrentTime, 60000); // Update every 60 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <button onClick={handleClick} >Show TT</button>
      <div>
        <Timetable data={data} timeSlots={timeSlots}  />
      </div>
      <h2>OTP Generator</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={() => {}}
          placeholder="Generated OTP will appear here"
        />
        <br />
        <label htmlFor="className">ClassName:</label>
        <input
          type="text"
          id="className"
          name="className"
          value={className}
          onChange={(e) => {setClassName(e.target.value)}}
          placeholder="classname"
        />
        <br />
        <label htmlFor="currentTime">Current Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={currentTime}
          onChange={() => {}}
        />
        <br />
        <button type="button" onClick={generateOTP}>Generate OTP</button>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OTPGenerator;
