export const init = async () => {
  const res = await fetch('/api/courses');
  const data = await res.json();
  console.log(data);
  renderCourseList(data)
};

document.getElementById('save-button')
  .addEventListener('click', (e) => {
    e.preventDefault();
    const courseNameToSave = e.target.form.courseName.value;
    console.log(courseNameToSave);
    saveCourse(courseNameToSave);
  });
