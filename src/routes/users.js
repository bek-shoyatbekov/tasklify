const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task.controller');

const userController = require('../controllers/user.controller');

router.get('/api/v1/signup', (req, res, next) => {

  return res.render('signup', { title: "Sign up", verified: false })
});

router.post('/api/v1/signup', userController.signup);

router.get('/api/v1/signin', (req, res, next) => {
  return res.render('signin', { title: 'Sign In', verified: false })
});

router.post('/api/v1/signin', userController.signin);

//tasks

router.post('/api/v1/tasks', taskController.add);

//app.get('/api/v1/tasks')  -  get all the tasks

// app.post('/api/v1/tasks')  - create a new task
// app.get('/api/v1/tasks/:id')  - get a  task
// app.put('/api/v1/tasks/:id')  - update a  task
// app.delete('/api/v1/tasks/:id')  - delete a  task






module.exports = router;
