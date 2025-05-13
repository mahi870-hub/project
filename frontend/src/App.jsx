import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components and Views
import Navbar from './Components/Navbar';
import Courses from './View/Courses';
import Login from './Components/Login';
import Home from './View/Home';
import CourseDetails from './View/CourseDetails';
import EnrollPage from './View/EnrollPage';
import Signup from './Components/Signup';
import Dashboard from './View/Dashboard';
import LiveClassess from './View/LiveClassess'; 
import AdminDashboard from './View/AdminDashboard';
const App = () => {
    return (
        <Router>
            <Navbar /> {/* Render the Navbar on all pages */}

            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:courseId" element={<CourseDetails />} />
                    <Route path="/enroll/:courseId" element={<EnrollPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/live-classess" element={<LiveClassess />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
