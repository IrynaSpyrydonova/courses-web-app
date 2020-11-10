'use strict'

const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const config = require('../config');
const DATA_DIR = path.join(__dirname, '..', 'data', 'courses.json');

const controllers = {
  hello: (req, res) => {
    res.json({ api: 'courses!' });
  }
};

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


module.exports = controllers;
