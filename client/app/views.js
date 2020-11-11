const renderCourseList = (coursesArr) => {
    const courseList = [...coursesArr]
      .map(course => {
        console.log(course);
        const loadButton = document.createElement('div');
        loadButton.classList.add('service');

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        loadButton.appendChild(nameDiv);

        const wrapper = document.createElement('div');
        nameDiv.appendChild(wrapper);

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icon');
        iconDiv.innerHTML = `<i class="fas fa-user-graduate"></i>`;
        wrapper.appendChild(iconDiv)

        const nameHeader = document.createElement('h2');
        nameHeader.innerHTML = course.name;
        wrapper.appendChild(nameHeader);

        if (!course.details === ''|| !course.details === 'undefined'){
          const details = document.createElement('p');
          details.classList.add('details');
          details.innerHTML = course.details;
          nameDiv.appendChild(details);

        }
        
        const codeDiv = document.createElement('div');
        codeDiv.classList.add('code');
        nameDiv.appendChild(codeDiv);
        
        if(!course.code === '' || !course.place === ''|| !course.code === 'undefined'|| !course.place === 'undefined'){
          const code = document.createElement('p');
          code.innerHTML = `<i class="fas fa-code"></i> <span>${course.code}</span>`;
          codeDiv.appendChild(code);
  
          const place = document.createElement('p');
          place.innerHTML = `${course.place}`;
          codeDiv.appendChild(place);
        }
        
        const iconsDiv = document.createElement('div');
        iconsDiv.classList.add('icons');
        loadButton.appendChild(iconsDiv);

        const detailsButton = document.createElement('div');
        detailsButton.classList.add('icon');
        detailsButton.innerHTML = `<i class="fas fa-info-circle"></i>`;
        iconsDiv.appendChild(detailsButton);
        detailsButton.onclick = () => handlers.getDetails(course);

        const deleteButton = document.createElement('div');
        deleteButton.classList.add('icon');
        deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        iconsDiv.appendChild(deleteButton );
        deleteButton.onclick = () => deleteCourse(course);

        const editButton = document.createElement('div');
        editButton.classList.add('icon');
        editButton.innerHTML = `<i class="fas fa-edit"></i>`;
        iconsDiv.appendChild(editButton);
        editButton.onclick = () => handlers.modifyCourse(course);

        const li = document.createElement('li');
        li.appendChild(loadButton);
    
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