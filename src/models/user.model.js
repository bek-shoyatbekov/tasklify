const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: [isEmail, "Please fill a  valid email address"]
    },
    password: {
        type: String,
    },

})

module.exports = model("User", userSchema);