const renderCourseList = (coursesArr) => {
    const courseList = [...coursesArr]
      .map(courseName => {
        const loadButton = document.createElement('button');
        loadButton.classList.add('btn', 'course');
        loadButton.innerHTML = courseName.name;
  
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'X';
        deleteButton.classList.add('btn', 'delete');
        deleteButton.onclick = () => deleteCourse(courseName);
  
        const li = document.createElement('li');
        li.appendChild(loadButton);
        li.appendChild(deleteButton);
  
        return li;
      })
      .reduce((all, next) => {
        all.appendChild(next);
        return all;
      }, document.createElement('ul'));
  
    const courseListContainer = document.getElementById('files-list-container');
    courseListContainer.innerHTML = '';
    courseListContainer.appendChild(courseList);
  };