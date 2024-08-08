import React, { useState, useEffect } from 'react';
import '../DateForm.css'; // Import the CSS file for styling

const DateForm = () => {
    const [date, setDate] = useState('');
    const [data, setData] = useState([]);

    // Helper function to format date
    const formatDate = (inputDate) => {
        const [year, month, day] = inputDate.split('-');
        return `${day}-${month}-${year}`;
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = formatDate(date);

        try {
            const response = await fetch('https://cms-eight-navy.vercel.app/api/v1/user/recorddisplay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date: formattedDate }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result); // Log to verify structure
            setData(result.data); // Ensure result is an array
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        // Set default date to current date in yyyy-mm-dd format
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
        handleSubmit(); // Fetch data for the current date
    }, []);

    return (
        <div className="container">
            <h1>Submission Records</h1>
            <form onSubmit={handleSubmit} className="date-form">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>

            {data.length > 0 && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Subject</th>
                            <th>Faculty</th>
                            <th>Roll No</th>
                            <th>Start Time</th>
                            <th>Proxy</th>
                            <th>Class Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((record, index) => (
                            <tr key={index}>
                                <td>{record.date || 'N/A'}</td>
                                <td>{record.time || 'N/A'}</td>
                                <td>{record.subject || 'N/A'}</td>
                                <td>{record.faculty || 'N/A'}</td>
                                <td>{record.rollNo || 'N/A'}</td>
                                <td>{record.startTime || 'N/A'}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={record.proxy || false}
                                        readOnly
                                    />
                                </td>
                                <td>{record.className || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DateForm;
