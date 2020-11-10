const controllers = require('./controllers.js');
const express = require('express');

const router = express.Router();

router.get('/', controllers.hello);

const courses = [
{id: 1, name:'courses1'},
{id: 2, name:'courses2'},
{id: 2, name:'courses3'}
];


// write your routes
router.get('/course/:id', controllers.listFiles);



app.get('/api/courses/:id',(req,res) =>{
 const course = courses.find(c => c.id === (req.params.id));
 if (!course) res.status (404).send('The course with the given ID was not found.')
 res.send(course);
});

module.exports = router;
