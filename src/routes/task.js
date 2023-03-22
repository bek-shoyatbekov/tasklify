const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

//tasks
router.get('/', taskController.getTask);
// - delete a  task
router.get('/delete/:id', taskController.delete)

//add new task
router.post('/add', taskController.add);


// - update a  task

router.post('/update/:id', taskController.update)





module.exports = router;
