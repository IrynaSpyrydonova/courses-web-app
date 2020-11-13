'use strict'

const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const config = require('../config');
const DATA_DIR = path.join(__dirname, '..', 'data', 'courses.json');

function validateCourse(course){
  const schema = Joi.object({ name: Joi.string() .min(3) .required() });
  return schema.validate(course);
}

const controllers = {
  hello: (req, res) => {
    res.json({ api: 'courses!' });
  },

  getListOfCourses: (req, res, next) => {
    fs.readFile(DATA_DIR, 'utf8', (err, data) => {
      if (err) {
          throw err;
      }
  
      res.send(JSON.parse(data));
    });
  },

  saveCourse: (req, res)=>{
    fs.readFile(DATA_DIR, 'utf-8', (err, data) => {
      console.log(data);
      if (err)  return res.status(500).send(err.message);
      let courses = JSON.parse(data);
      console.log(courses);
      const course = {
        id: courses.nextId,
        name: req.body.name,
        code: req.body.code,
        place: req.body.place,
        details:req.body.details
    };

      courses.nextId++;
      courses.courses.push(course);
      res.send(course);
      let newData = JSON.stringify(courses, null, 2);
      
      fs.writeFile(DATA_DIR, newData, (err) => {
          if (err) return res.status(500).send(err.message);
          console.log('Data written to file');
      });

  });
  },

  //PUT METHOD
editFile: (req, res, next) => {
  console.log('edit files')
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    fs.readFile(DATA_DIR, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err.message);
        let courses = JSON.parse(data);
        const course =courses.courses.find(c => c.id === parseInt(req.params.id));

        if(!course) res.status(404).send('The course with the given ID was not found!');
        course.name=req.body.name;
        res.send(course);
        
        let updatedData = JSON.stringify(courses, null, 2);
        
        fs.writeFile(DATA_DIR, updatedData, (err) => {
          if (err) {
            next(err);
            return;
          }
            console.log('File is updated');
        });
    })
},
//GET course by ID Method 

getCourseById:(req,res, next) =>{
  fs.readFile(DATA_DIR, 'utf8', (err, data) =>{
    let courses = JSON.parse(data);
  const course = courses.courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status (404).send('The course with the given ID was not found.')
  res.send(course);
    if(err)
    next(err);
    return;
  });
 },

 //GET Method 

listFiles:(req,res , next) =>{
  console.log('get files')
  fs.readFile(DATA_DIR, 'utf8', (err, data) =>{
    console.log('list files')
    if(err)
    next(err);
    return;
  });

  res.send(JSON.parse(data));
},
//Delete Course Method 

deleteCourse: (req, res, next) => {

  fs.readFile(DATA_DIR, "UTF-8", (err, data) => {
    if (err) {
      console.error("Error: ", err);
      return;
    }
    let parsedData = JSON.parse(data);
    console.log("read from file: ", parsedData);
    
    let specificCourse = parsedData.find(function (c) {
      console.log(`c.id is: ${c.id}, req.params.id is: ${req.params.id}`);
      return c.id === parseInt(req.params.id);
    });

    if (!Course) {
      console.log("incorrect id ");
      return res.status(404).send("The course with the given ID was not found!");
    }

    const index = parsedData.indexOf(Course);

    parsedData.splice(index, 1);
    let toWrite = JSON.stringify(parsedData, null, " ");

    fs.writeFile(DATA_DIR, toWrite, "UTF-8", (err) => {
      if (err) {
        console.log("changes not saved");
        process.exit();
      }

      console.log("changes saved");
    });
    res.send(Course);
  });
},
};


module.exports = controllers;
