const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');


const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const flash = require('connect-flash');

require('dotenv').config();

const app = express();
const User = require('./models/user.model');

// view engine setup
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
  secret: `${process.env.session_secret}`,
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.use(flash())

require('./config/connectDB')();

const userRoute = require('./routes/users');
const taskRoute = require('./routes/task');

app.use((req, res, next) => {
  if (typeof req.session.user == 'undefined' || typeof req.session.tasks == 'undefined') {
    req.session.tasks = [];
    res.locals.isAuth = false;
    console.log('--------------Task-------------');
    console.log(req.session.tasks);
    console.log('--------------Task-------------');
  } else {

    User.findById(req.session.user._id)
      .then((user) => {
        req.session.user = user;
        console.log('------User-----');
        console.log(user);
        console.log('------User-----');
        res.locals.isAuth = true;
      }).catch((err) => {
        next(err);
      });
  }
  next();


});


app.use('/', taskRoute);
app.use('/', userRoute);

// catch 404 and forward to error handler
app.use('*', (req, res, next) => {
  req.flash('message', "Page not found");
  res.redirect('/');
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.render('error', { title: "Error", verified: false, msg: 'Something went wrong', isAuth: true });
});



module.exports = app;