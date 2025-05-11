import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courseData';
import './Courses.css';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  return (
    <div className="courses-container">
      <header className="courses-header">
        <h1>Explore Our Courses</h1>
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </header>

      <section className="courses-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <Link to={course.link} className="course-link">Start Learning</Link>
            </div>
          ))
        ) : (
          <p>No courses found matching your search.</p>
        )}
      </section>
    </div>
  );
};

export default Courses;
