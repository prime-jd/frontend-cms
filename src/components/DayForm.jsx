import React, { useEffect, useState } from 'react';
import "../App.css"// Import the CSS file
import { data } from 'autoprefixer';
import TableForm from './TableForm';
import { useNavigate } from 'react-router-dom';
import FetchTT from './FetchTT';

function DayForm() {                                         // to protect it from teacher
    // State variable to store selected day
    const [selectedDay, setSelectedDay] = useState('');
    const [username, setUsername] = useState('');
    const [items, setItems]= useState([]);
    const [daySubmit, setDaySubmit] = useState(false)
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [error, setError] = useState('');
    const [date, setDate] = useState(getCurrentDate());
    const [startTime, setStartTime] = useState('');
    const [facultyId, setsetFacultyId] = useState('');
    const [subject, setSubject] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [faculty, setFaculty] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [className, setClassName] = useState('')
    const navigate = useNavigate(); 
    

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Prepare form data
        const formData = {
            username: username,
            day: selectedDay
        };
    
        // Send form data to backend using POST request
        fetch('/api/v1/user/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
             })
             .then(response => {
                 if (response.ok) {
                     console.log('Day data submitted successfully');
                     return response.json(); // Parse the response
                 } else {
                     console.log('Failed to submit day data');
                     setDaySubmit(false);
                     throw new Error('Failed to submit day data');
                 }
             })
             .then(data => {
                 // console.log(data);
                 setItems(data.data); // Update state with data from response
                 setDaySubmit(true);
                 console.log(items);
                
                 //compareItemTime(); 
             })
             .catch(error => navigate('/login'));
             
             // compareItemTime(); 
            //  console.log("function called")
    };
    
    const handletimeSubmit = (event) => {
        event.preventDefault();
        // Prepare form data
        const formData = {
            date,
            subject : subject ,
            faculty ,
            facultyId : facultyId ,
            startTime : startTime,
            roomNo,
            className
        };
        // Send form data to backend using POST request
        fetch('/api/v1/user/schedule-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(dayResponse => {
            if (dayResponse.ok) {
                console.log('time data submitted successfully');
                dayResponse.json().then(data => console.log(data.data));  
                navigate('/otpform');
            } else {
                console.log('Failed to submit time data');
            }
        })
        .catch(error => {console.log('Error submitting day data:')
        setError(error.message);
        });
       
    };

    //get current time
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      }
    
    //current time from item comparison
    function compareItemTime() {
        const currentTime = getCurrentTime();
        const rangeInMinutes = 40; 
        const filteredItems = items.filter(item => {
          const startTime = item.startTime;
          const isInRange = compareTimes(startTime, currentTime, rangeInMinutes);
          return isInRange;
        });
        
      
        console.log(filteredItems);
        if (filteredItems.length > 0) {
          const firstItem = filteredItems[0];
          setFaculty(firstItem.faculty);
          setsetFacultyId(firstItem.facultyId);
          setStartTime(firstItem.startTime);
          setSubject(firstItem.subject);
          setSubjectCode(firstItem.subjectCode);
          setRoomNo(firstItem.roomNo);
          setClassName(firstItem.className);
        } else {
          console.log("No items within range");
        }
      }
      
   
    //compare time
    function compareTimes(time1, time2, rangeInMinutes) {
        var splitTime1 = time1.split(":");
        var splitTime2 = time2.split(":");
        var hours1 = parseInt(splitTime1[0]);
        var minutes1 = parseInt(splitTime1[1]);
        var hours2 = parseInt(splitTime2[0]);
        var minutes2 = parseInt(splitTime2[1]);
   
        var totalMinutes1 = hours1 * 60 + minutes1;
        var totalMinutes2 = hours2 * 60 + minutes2;
        return Math.abs(totalMinutes2 - totalMinutes1) <= rangeInMinutes;
      }
      

    function getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = today.getFullYear();
      
        return `${day}-${month}-${year}`;
      }

    //render for update time
    useEffect(() => {
        setDate(getCurrentDate());
        const intervalId = setInterval(() => {
          setCurrentTime(getCurrentTime());
        }, 60000); 
        
        return () => clearInterval(intervalId); // Clean up interval on component unmount
      }, []);

    return (
        <>
        {/*time*/}
        <div className="input-container">
        <input type="time" value={currentTime} readOnly className="input-field" />
        </div>

        {/*day content*/}
        <div style={{marginBottom : '50px'}}  className="form-container">
            <h2>Select Day</h2>
            <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">username</label>
                  <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="day">Select a day:</label>
                    <select id="day" name="day" value={selectedDay} onChange={(e)=>setSelectedDay(e.target.value)} required>
                        <option value="">Select a day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        {error && <div style={{textAlign :'center',color : 'red', fontFamily: 'cursive'}}>{error}</div>}
        {/* table contents */}
        {daySubmit && <div  className="form-container"> 
         
            <h2>Enter Details</h2>
            <form onSubmit={handletimeSubmit}>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="text" id="subject" name="date" date={date}/>
                </div>
                
                <div>
                    <label htmlFor="startTime">startTime:</label>
                    <input type="time" id="time" name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="facultyId">FacultyId:</label>
                    <input type="text" id="faculty" name="facultyId" value={facultyId} onChange={(e) => setsetFacultyId(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="subjectCode">Subject Code:</label>
                    <input type="text" id="subjectode" name="subjectCode" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="faculty">Faculty:</label>
                    <input type="text" id="faculty" name="faculty" value={faculty} onChange={(e) => setFaculty(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="roomNo">Room No.:</label>
                    <input type="text" id="faculty" name="roomNo" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="className">Class:</label>
                    <input type="text" id="faculty" name="className" value={className} onChange={(e) => setClassName(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
                
            </form>
            <button style={{marginTop:'10px', width : '60px', marginLeft: '700px',textAlign: 'center'}} onClick={(e)=>(compareItemTime())}>Fetch</button>
        </div>}

        {/*item display*/}
        {<div className="items-container">
           {items.map((item, index) => (
           <div key={index} className="item">
           <p className="heading">Subject: <span className="brown">{item.subject}</span></p>
           <p className="heading">Subject Code: <span className="brown">{item.subjectCode}</span></p>
           <p className="heading">Start Time: <span className="brown">{item.startTime}</span></p>
           <p className="heading">Faculty: <span className="brown">{item.faculty}</span></p>
           </div>
           ))}
        </div>
        }

        {/*time table*/}
        <div>
        <FetchTT func={startTime} />
        </div>
     
        </>
    );
}

export default DayForm;
