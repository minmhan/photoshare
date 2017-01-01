var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var multer = require('multer');
var moment = require('moment');
require('./app_server/models/db');


var photos = require('./app_server/routes/index')

var app = express();
app.disable('view cache');

// view engine setup
app.set('views', path.join(__dirname, 'app_server/views'));

hbs.registerHelper('timeago', function(timestamp){
  return moment(timestamp).startOf('minute').fromNow();
});
hbs.registerPartials(__dirname + '/app_server/views/_partials');
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest:path.join(__dirname, 'public/upload') }).single("file"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', photos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
