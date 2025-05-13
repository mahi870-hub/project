const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// POST /api/courses/:courseId/add-content
router.post('/:courseId/add-content', async (req, res) => {
  const { title, videoUrl, description } = req.body;

  try {
    const course = await Course.findOne({ id: req.params.courseId });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    course.content.push({ title, videoUrl, description });
    await course.save();

    res.json({ message: 'Content added successfully', course });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
