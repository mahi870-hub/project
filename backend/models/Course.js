import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  type: String, // 'video', 'document', 'quiz'
  title: String,
  url: String,
  questions: [
    {
      question: String,
      options: [String],
      answer: String,
    }
  ]
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  link: String,
  contents: [contentSchema],
});

export default mongoose.model('Course', courseSchema);
