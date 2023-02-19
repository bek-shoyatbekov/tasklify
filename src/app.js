const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

require('dotenv').config();

const app = express();




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

require('./config/connectDB')();

const userRoute = require('./routes/users');
const indexRoute = require('./routes/index');


app.use('/', indexRoute);
app.use('/me', userRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: "Error", verified: false, msg: 'Something went wrong' });
});



module.exports = app;