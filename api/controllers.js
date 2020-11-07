'use strict'

const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const config = require('../config');
const DATA_DIR = path.join(__dirname, '..', 'data', 'courses.json');

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
      if (err)  return res.status(500).send(err.message);
      let courses = JSON.parse(data);
      console.log(courses);
      const course = {
          id: courses.length + 1,
          name: req.body.courseName
      };
      courses.push(course);
      res.send(course);
      let newData = JSON.stringify(courses, null, 2);
      
      fs.writeFile(DATA_DIR, newData, (err) => {
          if (err) return res.status(500).send(err.message);
          console.log('Data written to file');
      });

  });
  },
};

module.exports = controllers;
