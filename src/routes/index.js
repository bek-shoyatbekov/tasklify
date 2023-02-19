const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let verified = req.session.user ? true : false;
  let task = ["apple", "banana", "orange", "kiwi"];
  res.render('index', { title: 'Welcome to Tasklify', verified: true, task: task });
});

module.exports = router;
