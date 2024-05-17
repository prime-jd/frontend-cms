// App.js
import React, { useContext } from 'react';
import '../styles.css';
import Login from './Login';



function Home() {
  
  return (
    

 
    <div className="content">
      <img src="https://educloud.app/lms/src/attendance/hero2.png" alt="Monitoring System Image" />
      <div className="divider"></div>
      <div>
        <h1 className="monitoring-system">Class Monitoring System</h1>
        
          <a href="/login" className="enlarge-btn">Login to Access</a>
    
      </div>
    </div>
  );
}




export default Home;
