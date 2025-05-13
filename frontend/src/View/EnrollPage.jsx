import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './EnrollPage.css';

const EnrollPage = () => {
  const { courseId } = useParams();

  const coursesData = [
    {
      id: 'full-stack-web-development',
      title: 'Full Stack Web Development',
      instructor: 'John Doe',
      description:
        'Learn front-end and back-end development using modern technologies like React, Node.js, and MongoDB.',
      price: 50, // Set the price for the course (though we won't be using this in coupon enrollment)
    },
    {
      id: 'react-for-beginners',
      title: 'React for Beginners',
      instructor: 'Chirag Garg',
      description:
        'Start building modern web applications with React.js and learn how to develop dynamic user interfaces.',
      price: 30, // Set the price for the course (though we won't be using this in coupon enrollment)
    },
    {
      id: 'data-science-with-python',
      title: 'Data Science with Python',
      instructor: 'Jane Smith',
      description:
        'Master data analysis and machine learning techniques using Python and popular libraries such as Pandas, NumPy, and Scikit-learn.',
      price: 40,
    },
    {
      id: 'ui-ux-design-fundamentals',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Johnson',
      description: 'Discover principles of good design, user experience, and prototyping tools...',
      price: 25,
    },
    {
      id: 'machine-learning-basics',
      title: 'Machine Learning Basics',
      instructor: 'Andrew Ng',
      description: 'Understand the fundamentals of machine learning and how to apply algorithms to real-world problems.',
      price: 45,
    },
    {
      id: 'advanced-javascript',
      title: 'Advanced JavaScript',
      instructor: 'Mahi Garg',
      description: 'Deep dive into JavaScript, learn advanced concepts such as closures, promises, and asynchronous programming.',
      price: 35,
    },
    // Add more courses as needed...
  ];

  // Find the course based on the courseId from the URL
  const course = coursesData.find((course) => course.id === courseId);

  if (!course) return <p>Course not found.</p>;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    coupon: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validCoupons = ['MAHI1', 'FREECOURSE', 'DISCOUNT20']; // List of valid coupon codes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const { name, email, coupon } = formData;

    if (!name || !email) {
      setMessage('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    // Convert entered coupon to uppercase for case-insensitive comparison
    const couponCode = coupon.trim().toUpperCase();

    // If coupon is valid, enroll for free
    if (validCoupons.includes(couponCode)) {
      try {
        const res = await fetch('http://localhost:5000/api/enroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId: course.id,
            courseTitle: course.title,
            studentName: name,
            studentEmail: email,
            coupon: couponCode,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setMessage('Enrollment successful with coupon!');
          setFormData({ name: '', email: '', coupon: '' });
        } else {
          setMessage(data.error || 'Enrollment failed.');
        }
      } catch (error) {
        console.error('Enrollment error:', error);
        setMessage('An error occurred. Please try again.');
      }
    } else {
      setMessage('Invalid coupon code.');
    }

    setLoading(false);
  };

  return (
    <div className="enroll-page-container">
      <header className="enroll-page-header">
        <h1>Enroll in {course.title}</h1>
        <p className="instructor">Instructor: {course.instructor}</p>
      </header>

      <section className="course-description">
        <h2>About This Course</h2>
        <p>{course.description}</p>
        <p><strong>Price:</strong> ${course.price}</p>
      </section>

      <section className="enrollment-form">
        <h2>Enroll Now</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="coupon">Coupon Code :</label>
            <input
              type="text"
              id="coupon"
              name="coupon"
              value={formData.coupon}
              onChange={handleChange}
              placeholder="Enter coupon code"
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing...' : 'Enroll Now'}
          </button>
        </form>

        {message && <p className="enrollment-message">{message}</p>}
      </section>
    </div>
  );
};
export default EnrollPage;