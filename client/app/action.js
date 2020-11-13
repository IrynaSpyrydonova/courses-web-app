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
  modifyHandler: (course)=>{
      
    document.getElementById("course-name").value=course.name
    document.getElementById("course-name").setAttribute('dataId', course.id);
    if(course.code!==undefined) {document.getElementById("course-code").value=course.code}
    if(course.place!==undefined) {document.getElementById("course-place").value=course.place}
    document.getElementById("course-details").value=course.details
    document.getElementById("save-button").innerHTML="Save changes"
    
    window.scrollTo({top: 0, behavior: 'smooth'});
  },

  modifyCourse: async (course) => {
    try {
      //reset save button
      document.getElementById("save-button").innerHTML="Save new course"
      //fetch method:put
      const resPut = await fetch("/api/courses/" + course.id, {
        method: "PUT",
        body: JSON.stringify({
          name: course.name,        
          code: course.code,
          place: course.place,
          details: course.details
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const resNew = await fetch("/api/courses");
      const dataNew = await resNew.json();
      renderCourseList(dataNew);
      //message to user
      document.querySelector('.modify').style.display= 'inline-block';
      setTimeout(function(){ document.querySelector('.modify').style.display= 'none'; }, 3000);

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
const deleteCourse = async (course) => {
	const id = course.id;
	const res = await fetch(`/api/courses/${id}`, {
		method: "DELETE",
		headers: {
			"content-type": "application/json; charset=UTF-8",
		},
	});
	if (!res.ok) {
		alert(`Something went wrong:`);
		console.log("Error from put: ", res);
	} else {
		const resNew = await fetch("/api/courses");
      const dataNew = await resNew.json();
      renderCourseList(dataNew);
  }
  
};   
