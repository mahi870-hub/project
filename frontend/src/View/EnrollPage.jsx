import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './EnrollPage.css';  // Import CSS for styling

const EnrollPage = () => {
  // Using useParams to get the courseId from the URL
  const { courseId } = useParams(); 
 
  // Sample data for courses (in a real app, this data would likely come from an API)
  const coursesData = [
    {
      id: 'full-stack-web-development',
      title: 'Full Stack Web Development',
      instructor: 'John Doe',
      description:
        'Learn front-end and back-end web development using modern technologies like React, Node.js, and MongoDB.',
    },
    {
      id: 'data-science-with-python',
      title: 'Data Science with Python',
      instructor: 'Jane Smith',
      description:
        'Master data analysis and machine learning techniques using Python and popular libraries such as Pandas, NumPy, and Scikit-learn.',
    },
     {
    id: 'ui-ux-design-fundamentals',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Emily Johnson',
    description: 'Discover principles of good design, user experience, and prototyping tools...',
  },
  {
    id: 'machine-learning-basics',
    title: 'Machine Learning Basics',
    instructor: 'Andrew Ng',
    description: 'Understand the fundamentals of machine learning and how to apply algorithms to real-world problems.',
  },
  {
    id: 'advanced-javascript',
    title: 'Advanced JavaScript',
    instructor: 'Mahi Garg',
    description: 'Deep dive into JavaScript, learn advanced concepts such as closures, promises, and asynchronous programming.',
  },
  {
    id: 'react-for-beginners',
    title: 'React for Beginners',
    instructor: 'Chirag Garg ',
    description: 'Start building modern web applications with React.js and learn how to develop dynamic user interfaces.',
  },
    // More courses can be added here
  ];

  // Find the selected course based on the courseId from the URL
  const course = coursesData.find((course) => course.id === courseId);

  // If the course doesn't exist, show a loading message or a 404 message
  if (!course) {
    return <p>Course not found.</p>;
  }

  // State to handle the form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      // Simulate successful enrollment
      setMessage('You have successfully enrolled in the course!');
      // Here, you would likely send a request to the backend for real enrollment
    } else {
      setMessage('Please fill in all the fields.');
    }
  };

  return (
    <div className="enroll-page-container">
      <header className="enroll-page-header">
        <h1>Enroll in {course.title}</h1>
        <p className="instructor">Instructor: {course.instructor}</p>
      </header>

      <section className="course-description">
        <h2>Course Description</h2>
        <p>{course.description}</p>
      </section>

      <section className="enrollment-form">
        <h2>Enrollment Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">Enroll Now</button>
        </form>

        {message && <p className="enrollment-message">{message}</p>}
      </section>
    </div>
  );
};

export default EnrollPage;
