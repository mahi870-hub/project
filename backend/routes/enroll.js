const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

// POST /api/enroll
router.post('/', async (req, res) => {
  const { courseId, courseTitle, studentName, studentEmail } = req.body;

  if (!courseId || !courseTitle || !studentName || !studentEmail) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newEnrollment = new Enrollment({
      courseId,
      courseTitle,
      studentName,
      studentEmail,
    });

    await newEnrollment.save();
    res.status(201).json({ message: 'Enrollment successful' });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
