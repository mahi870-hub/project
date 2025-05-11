import React from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courseData';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Learn Anything, Anywhere</h1>
          <p>Access thousands of online courses to enhance your skills and boost your career.</p>
          <Link to="/courses" className="cta-button">Browse Courses</Link>
        </div>
      </header>

      <section className="categories-section">
        <h2 className="section-title">Popular Course Categories</h2>
        <section className="courses-list">
          {courses.length > 0 ? (
            courses.map(course => (
              <div key={course.id} className="course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <Link to={course.link} className="course-link">Start Learning</Link>
              </div>
            ))
          ) : (
            <p>No courses available.</p>
          )}
        </section>
      </section>

      <section className="testimonials-section">
        <h2 className="section-title">What Our Students Say</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <p>"This platform changed my life! I got my dream job after completing their web development course."</p>
            <h4>- John Doe</h4>
          </div>
          <div className="testimonial-card">
            <p>"The courses are easy to follow and the support team is incredible. Highly recommend!"</p>
            <h4>- Jane Smith</h4>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Learn Online. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
