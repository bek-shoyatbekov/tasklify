const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task.controller');

const userController = require('../controllers/user.controller');

router.get('/signup', (req, res, next) => {

  return res.render('signup', { title: "Sign up", message: false })
});

router.post('/signup', userController.signup);

router.get('/signin', (req, res, next) => {
  return res.render('signin', { title: 'Sign In' , message: false})
});

router.post('/signin', userController.signin);






module.exports = router;
