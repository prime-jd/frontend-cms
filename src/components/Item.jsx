import React from 'react';

function Item({ item }) {
    return (
        <div className="item">
            <p className="heading">Subject: <span className="brown">{item.subject}</span></p>
            <p className="heading">Subject Code: <span className="brown">{item.subjectCode}</span></p>
            <p className="heading">Start Time: <span className="brown">{item.startTime}</span></p>
            <p className="heading">End Time: <span className="brown">{item.endTime}</span></p>
            <p className="heading">Status: <span className="brown">{item.status}</span></p>
            <p className="heading">Mark: <span className="brown">{item.mark}</span></p>
            <p className="heading">Faculty: <span className="brown">{item.faculty}</span></p>
        </div>
    );
}

export default Item;