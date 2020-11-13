export const init = async () => {
  const res = await fetch('/api/courses');
  const data = await res.json();
  console.log(data);
  renderCourseList(data)
};

document.getElementById('save-button')
  .addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.querySelector('#course-name');
    const details = document.querySelector('#course-details');
    const code = document.querySelector('#course-code');
    const userCode = Number(code.value);
    const place = document.querySelector('#course-place');
    if (name.value.length === 0 || details.value.length === 0){
      document.querySelector('.error').style.display= 'inline-block';
    } else if(isNaN(userCode)){
        document.querySelector('.error').style.display= 'none';
        document.querySelector('.error-code').style.display= 'inline-block';
      } else {
      document.querySelector('.error').style.display= 'none';
      document.querySelector('.error-code').style.display= 'none';
      const courseToSave = {
        name: name.value,
        code: userCode,
        place: place.value,
        details: details.value
      }
      saveCourse(courseToSave);
      name.value = '';
      details.value = '';
      code.value ='';
      place.value = '';
    }
  });

  document.querySelector('details').addEventListener('toggle', (e)=>{
    if(document.querySelector('details').open === true){
      window.scroll({
        top: 500,
        left: 0,
        behavior: 'smooth'
      });
    }
  });