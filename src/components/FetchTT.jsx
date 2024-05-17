import React, { useState, useEffect } from 'react';
import Timetable from './TableForm.jsx';

function FetchTT() {
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('/api/v1/user/week-schedule')
      .then(response => response.json())
      .then(data => {
        console.log(data.message)
        console.log(data.data)
        setTimetableData(data.data);
        console.log(timetableData)
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []); // Run only once on component mount

  const timeSlots = [
    '09:30 - 10:20', '10:20 - 11:10', '11:10 - 12:00', '12:00 - 12:50',
    '12:50 - 13:40', '13:40 - 14:30', '14:30 - 15:20', '15:20 - 16:10', '16:10 - 17:00'
  ];

  return (
    <div>
      <h1>Timetable</h1>
      <Timetable data={timetableData} timeSlots={timeSlots}  />
    </div>
  );
}

export default FetchTT;
