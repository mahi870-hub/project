import React, { useState, useEffect } from 'react';
import './LiveClassess.css';  // Style file
import { useNavigate } from "react-router-dom";


const LiveClassess = () => {
    const navigate = useNavigate();

  // Sample data (replace with real API data if needed)
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'React Basics Live Workshop',
      date: '2025-05-15',
      time: '6:00 PM - 7:30 PM',
      instructor: 'John Doe',
      platform: 'Zoom',
      link: 'https://zoom.us/j/1234567890',
    },
    {
      id: 2, 
      title: 'Data Science Q&A Session',
      date: '2025-05-17',
      time: '4:00 PM - 5:00 PM',
      instructor: 'Jane Smith',
      platform: 'Google Meet',
      link: 'https://meet.google.com/abc-defg-hij',
    },
    {
      id: 3,
      title: 'React Basics Live Workshop',
      date: '2025-05-15',
      time: '6:00 PM - 7:30 PM',
      instructor: 'John Doe',
      platform: 'Zoom',
      link: 'https://zoom.us/j/1234567890',
    },
    {
      id: 4,
      title: 'Data Science Q&A Session',
      date: '2025-05-17',
      time: '4:00 PM - 5:00 PM',
      instructor: 'Jane Smith',
      platform: 'Google Meet',
      link: 'https://meet.google.com/abc-defg-hij',
    },
  ]);

   useEffect(() => {
            const token = localStorage.getItem("token");
    
            if (!token) {
                navigate("/login");
            }
        },[])

  return (
    <div className="live-session-container">
      <h1>Upcoming Live Sessions</h1>
      {sessions.length > 0 ? (
        <div className="sessions-list">
          {sessions.map((session) => (
            <div key={session.id} className="session-card">
              <h2>{session.title}</h2>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.time}</p>
              <p><strong>Instructor:</strong> {session.instructor}</p>
              <p><strong>Platform:</strong> {session.platform}</p>
              <a href={session.link} target="_blank" rel="noopener noreferrer" className="join-button">
                Join Session
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No live sessions are scheduled right now.</p>
      )}
    </div>
  );
};

export default LiveClassess;