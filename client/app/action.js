const saveCourse = (course) => {
    fetch('api/courses/', {
      method: 'POST',
      body: JSON.stringify(course),
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
      .then(courseData => {
        console.log(courseData);
        document.querySelector('.save').style.display= 'inline-block';
        setTimeout(function(){ document.querySelector('.save').style.display= 'none'; }, 3000);
        return fetch('api/courses');
      })
      .then(response => response.json())
      .then(data => renderCourseList(data))
      .catch(err => {
        alert('unable to save your changes');
        console.error(err);
      });
  };


  const handlers = {
  modifyCourse: async (course) => {
    try {
      const newCourseName=prompt("Please, enter the new course name.")
      if (newCourseName.length <3) {
        alert("Course name cannot be less than 3 characters!");
        return;
      }
      const res = await fetch("/api/courses");
      const data = await res.json();
      const exists = data.find((data) => data.name === newCourseName);
      if (exists) {
        alert(
          `The course "${newCourseName}" already exists.`
        );
        return;
      }
      const resPut = await fetch("/api/courses/" + course.id, {
        method: "PUT",
        body: JSON.stringify({
          name: newCourseName
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const resNew = await fetch("/api/courses");
      const dataNew = await resNew.json();
      renderCourseList(dataNew);

      alert("changes saved");
    } catch (error) {
      console.log(error);
    }
  },

  getDetails:async (course) =>{  
  try {
    const res = await fetch("/api/courses/" + course.id);
    const data = await res.json();
    document.querySelector(`[data-id="${data.id}"]`).classList.toggle('display');
  } catch (error) {
    
  }
}
}   