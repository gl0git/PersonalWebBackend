var createError = require('http-errors');
var cors = require('cors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://MongoDefault123:mongoguy123@cluster0.psbdm.mongodb.net/weblog?retryWrites=true&w=majority'
mongoose.connect(mongoURI, {useUnifiedTopology: true, useNewUrlParser: true})
const db = mongoose.connection;
const Log = require('./models/logModel')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/weblogs', (req, res, next) => {
  if (req.body.token != '$OK$#JTNKGOO!IRMKF)!J.#K!OJ$%NT!%N!_eirjnowkgehgbnEL!#34561313EJKMF') {
    res.status(403).send()
  }
  const log = new Log({
    title: req.body.title,
    message: req.body.message,
    date: req.body.date,
  }).save(err => {
    if (err) {
      console.log(err)
      return next(err)
    }
  })
})

app.get('/weblogs', (req, res) => {
  Log.find({}, (err, logs) => {
    if (err) {
      console.log(err)
      res.status(400).send()
    }
    res.json({'logs': logs})
  })
})

app.get('/weblogs/:id', (req, res) => {
  Log.findOne({_id: req.params.id}, (err, log) => {
    if (err) {
      console.log(err)
      res.status(400).send()
    }
    res.json({'log': log})
  })
})

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
