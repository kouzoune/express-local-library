const wiki = require("./wiki");
const compression = require("compression");
const RateLimit = require("express-rate-limit");
const helmet = require("helmet");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require("./routes/catalog");     //just add this
//Connexion to the database
const mongoose = require('mongoose');
const dev_db_url =  'mongodb+srv://user_name:password@cluster0.mh3runy.mongodb.net/?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
var app = express();

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

//setting Helmet for security, we allow loading cross-domain account of including jquery, bootstrap in the app
app.use(
  helmet.contentSecurityPolicy({
    directives:{
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);

const Limiter = RateLimit({
  windowMs: 1*60*1000,
  max: 20,
});

app.use(Limiter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/catalog", catalogRouter);

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

app.use
module.exports = app;
