import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './CourseDetails.css';
import courseDetailsData from '../data/courseDetailsData'; // Adjust the path as needed

const CourseDetails = () => {
    const { courseId } = useParams();

    const course = courseDetailsData.find((course) => course.id === courseId);

    if (!course) {
        return <p>Course not found.</p>;
    }

    return (
        <div className="course-details-container">
            <header className="course-details-header">
                <h1>{course.title}</h1>
                <p className="instructor">Instructor: {course.instructor}</p>
            </header>

            <section className="course-description">
                <h2>Course Description</h2>
                <p>{course.description}</p>
            </section>

            <section className="course-syllabus">
                <h2>Syllabus</h2>
                <ul>
                    {course.syllabus.map((topic, index) => (
                        <li key={index}>{topic}</li>
                    ))}
                </ul>
            </section>

            <section className="enroll-section">
                <Link to={`/enroll/${course.id}`}>
                    <button className="enroll-button">Enroll Now</button>
                </Link>
            </section>
        </div>
    );
};

export default CourseDetails;
