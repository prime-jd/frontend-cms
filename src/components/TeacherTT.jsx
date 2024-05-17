import React, { useState } from 'react';
import '../Timetable.css';

function Timetable({ data, timeSlots, facultyId }) {
  // State variable to track checked state of the checkboxes
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    // Toggle the checked state
    setIsChecked(!isChecked);
  };

  // Filter data to include only classes for the specific facultyId
  const filteredData = data.filter(item => item.facultyId === facultyId);

  return (
    <div className="timetable-container">
      <table>
        <thead>
          <tr>
            <th>Time/Day</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through each time slot */}
          {timeSlots.map(slot => (
            <tr key={slot}>
              <td>{slot}</td>
              {/* Loop through each day */}
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => {
                // Find the class for the current day and time slot
                const classInfo = filteredData.find(item => item.day === day && item.startTime === slot.split(' - ')[0] && item.endTime === slot.split(' - ')[1]);

                return (
                  <td key={day}>
                    {/* Render a checkbox if data is filled */}
                    {classInfo && (
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked
                      />
                    )}
                    {/* Display class information */}
                    {classInfo ? `${classInfo.subject} (${classInfo.subjectCode}) - ${classInfo.facultyId}` : '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;
