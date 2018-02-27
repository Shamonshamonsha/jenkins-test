var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var csrf = require('csurf')
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');


var app = express();




var whitelist = ['http://localhost:3002','localhost:3000','36ed3702.ngrok.io']
var corsOptions = {
  origin: function (origin, callback) {
    console.log("origin",origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  exposedHeaders:'X-CSRFTOKEN'
};

var csrfProtection = csrf({ cookie: false,key:'csrfToken'})

app.use(function(req,res,next){ req.headers.origin = req.headers.origin || req.headers.host; next(); })

//app.use(cors(corsOptions));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret:'myKeygdjg87182',
    resave: true,
    saveUninitialized: true,
    name: 'sessionId'
  }));

//app.use(csrfProtection);

//app.use(function(req, res, next) {
  //console.log("Token",req.csrfToken());
  //res.setHeader('X-CSRFTOKEN',req.csrfToken())
 // next();
//});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
