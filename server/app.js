var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect("mongodb://admin:abc123@ds259241.mlab.com:59241/subarashi-overflow", {
  useNewUrlParser: true,
});

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('connected! to subarashi overflow');
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var answersRouter = require('./routes/answer');
var questionsRouter = require('./routes/question');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/answers', answersRouter);
app.use('/questions', questionsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
