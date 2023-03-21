const Task = require('../models/task.model');

const uuid = require('uuid');

const flash = require('connect-flash');

exports.getTask = async (req, res, next) => {
    let tasks;
    if (!req.session.user) {
        tasks = req.session.task;
    } else {
        tasks = await Task.findOne({ userId: req.session.user._id });
    }
    res.render('index', { _id: uuid.v4(), title: 'Tasklify', tasks: tasks, message: false });
}

exports.add = async (req, res, next) => {
    try {
        const { title, status } = req.body;
        const task = { _id: Math.round(Math.random() * 1000), title: title, status: status };
        if (!req.session.user) {
            req.session.task.push(task);
        } else {
            const newTask = await Task.create({
                userId: req.session.user._id,
                title: title,
                status: status
            })
            await newTask.save();
        }
        req.flash('msg', 'Task has been Added');
        return res.redirect('/');
    } catch (error) {
        next(error)
    }
}
exports.delete = async (req, res, next) => {
    try {

        if (!req.session.user) {
            req.session.task = req.session.task.filter(e => e._id != req.params.id);
            return res.redirect('/');
        } else {
            await Task.deleteOne({ _id: req.params.id });
            return res.redirect('/');
        }
    } catch (error) {

    }
}
exports.update = async (req, res, next) => {
    try {
        if (!req.session.user) {
            let arr = [...req.session.task];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]._id == req.params.id) {

                    arr[i] = { _id: arr[i]._id, title: req.body.task, status: req.body.status }
                }
            };
            req.session.task = arr;
            return res.redirect('/');
        }else {
         
        }



    } catch (err) {
        console.log(err);
    }
}

