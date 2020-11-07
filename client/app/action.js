const saveCourse = (courseName) => {
    fetch('api/courses/', {
      method: 'POST',
      body: JSON.stringify({courseName}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(courseList => {
        console.log(courseList);
        alert('your changes are saved');
        return fetch('api/courses');
      })
      .then(response => response.json())
      .then(data => renderCourseList(data))
      .catch(err => {
        alert('unable to save your changes');
        console.error(err);
      });
  };

  