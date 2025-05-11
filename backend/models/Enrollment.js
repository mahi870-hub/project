const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  enrolledAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
