import { useEffect, useState } from 'react';
import { getCourse } from '../services/api';
import AddCourseContent from '../Components/AddCourseContent';
import { useParams } from 'react-router-dom';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourse(id).then(setCourse);
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <h2>Course Content</h2>
      {course.contents.map((c, idx) => (
        <div key={idx}>
          <h3>{c.title}</h3>
          {c.type === 'video' && <video src={c.url} controls />}
          {c.type === 'document' && <a href={c.url} target="_blank">Download</a>}
          {c.type === 'quiz' && (
            <div>
              {c.questions.map((q, i) => (
                <div key={i}>
                  <p>{q.question}</p>
                  <ul>{q.options.map((o, j) => <li key={j}>{o}</li>)}</ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <AddCourseContent courseId={id} />
    </div>
  );
}

export default CourseDetail;
