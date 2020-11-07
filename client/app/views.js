const renderCourseList = (coursesArr) => {
    const courseList = [...coursesArr]
      .map(courseName => {
        const loadButton = document.createElement('button');
        loadButton.classList.add('btn', 'course');
        loadButton.innerHTML = courseName.name;
  
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.style.float="right";
        deleteButton.classList.add('btn', 'delete');
        deleteButton.onclick = () => deleteCourse(courseName);

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pen"></i>';
        editButton.style.float="right";
        editButton.classList.add('btn', 'delete');
        editButton.onclick = () => handlers.modifyCourse(courseName);
        
        const li = document.createElement('li');
        li.appendChild(loadButton);
        li.appendChild(editButton);
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