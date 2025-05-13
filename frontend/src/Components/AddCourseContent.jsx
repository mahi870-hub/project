import { useState } from 'react';
import { addCourseContent } from '../services/api';

function AddCourseContent({ courseId }) {
  const [type, setType] = useState('video');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = { type, title, url, questions };
    await addCourseContent(courseId, content);
    alert('Content added successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="video">Video</option>
        <option value="document">Document</option>
        <option value="quiz">Quiz</option>
      </select>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      {(type === 'video' || type === 'document') && (
        <input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
      )}
      {type === 'quiz' && (
        <textarea
          placeholder='Enter quiz JSON (e.g. [{"question": "...", "options": [...], "answer": "..."}])'
          onChange={(e) => setQuestions(JSON.parse(e.target.value))}
        />
      )}
      <button type="submit">Add Content</button>
    </form>
  );
}

export default AddCourseContent;
