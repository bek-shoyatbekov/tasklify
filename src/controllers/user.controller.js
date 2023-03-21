const User = require('../models/user.model');
const Task = require('../models/task.model');
const ObjectId = require('mongodb').ObjectId()
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const isValidEmail = await User.findOne({ email: email });
        if (isValidEmail) {
            req.flash('msg', 'Email already exist');
            return res.status(400).redirect('/signup');
        }
        const user = await User.create({
            name, email, password
        });
        const result = await user.save();
        req.session.user = user;
        return res
            .status(201)
            .render('index',
                {
                    title: 'Home', tasks: [], message: ''
                }
            )
    } catch (err) {
        return next(err);
    }
}


exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const isValidEmail = await User.findOne({ email: email });
        if (!isValidEmail || password != isValidEmail.password) {
            req.flash('msg', 'Email or Password incorrect')
            return res.status(400).redirect('/signin');
        }
        req.session.user = isValidEmail;
        const tasks = await Task.find({ userId: isValidEmail._id });
        return res.status(201).render('index', { title: 'Home', tasks: tasks, message: '' })
    } catch (error) {
        return next(error);
    }
}