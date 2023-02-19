const Task = require('../models/task.model');


exports.add = async (req, res, next) => {
    try {
        console.log(req.body);
        res.send({ something: 'hello' })

    } catch (error) {
        next(error)
    }
}
exports.delete = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
exports.update = async (req, res, next) => {
    try {

    } catch (error) {

    }
}

