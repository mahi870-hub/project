const BASE_URL = 'http://localhost:5000/api/courses';

export async function addCourseContent(courseId, content) {
  const res = await fetch(`${BASE_URL}/${courseId}/add-content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  });
  return await res.json();
}

export async function getCourse(courseId) {
  const res = await fetch(`${BASE_URL}/${courseId}`);
  return await res.json();
}
