const User = require('../models/user.model');


exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const isValidEmail = await User.findOne({ email: email });
        if (isValidEmail) {
            return res.status(400).render('error', { title: 'Error', verified: false, msg: "Email already exist" });
        }
        const user = await User.create({
            name, email, password
        });
        const result = await user.save();
        console.log(result);
        req.session.user = user._id;
        return res.status(201).render('index', { title: 'Home', verified: true })

    } catch (error) {
        return next(error);
    }
}


exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const isValidEmail = await User.findOne({ email: email });
        if (!isValidEmail || password != isValidEmail.password) {
            return res.status(400).render('error', { title: 'Error', verified: true, msg: "Email or Password incorrect" });
        }
        req.session.user = isValidEmail._id;
        return res.status(201).render('index', { title: 'Home', verified: true })

    } catch (error) {
        return next(error);
    }
}