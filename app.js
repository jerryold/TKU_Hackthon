var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var signinRouter = require('./routes/signin');
var makePairRouter = require('./routes/make_pair');
var aboutRouter = require('./routes/about');
var settingRouter = require('./routes/setting');
var gameRouter = require('./routes/game');
var animationRouter = require('./routes/animation');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var users = {};//用戶列表

app.use('/', indexRouter);
app.use('/signin', signinRouter);
app.use('/make_pair', makePairRouter);
app.use('/about', aboutRouter);
app.use('/setting', settingRouter);
app.use('/game', gameRouter);
app.use('/animation', animationRouter);

var chatRouter = require('./routes/chat');
var chatSignInRouter = require('./routes/chat_signin');
app.use('/chat', chatRouter);
app.use('/chat_signin', chatSignInRouter);

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
