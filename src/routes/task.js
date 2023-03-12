const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
/* GET home page. */
// router.get('/', function (req, res, next) {
//   let verified = req.session.user ? true : false;
//   let tasks = [{ _id: 8, title: "apple", status: 'active' }, { _id: 5, title: "banana", status: 'active' }, { _id: 4, title: "kiwi", status: 'none' }, { _id: 1, title: "cherry", status: 'active' },];

// });

//tasks
router.get('/', taskController.getTask);
// - delete a  task
router.get('/delete/:id', taskController.delete)

//add new task
router.post('/add', taskController.add);


// - update a  task

router.post('/update/:id', taskController.update)





module.exports = router;
