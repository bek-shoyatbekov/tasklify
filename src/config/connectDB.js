
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.set('strictQuery', false)
const conn = () => {
    mongoose
        .connect(process.env.mongo_uri)
        .then((result) => {
            console.log(`Connected DB...`);
        }).catch((err) => {
            console.log(err)
        });
}

module.exports = conn;