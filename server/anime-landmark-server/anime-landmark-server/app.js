var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');


var index = require('./routes/index');
var get_database = require('./routes/get_database');
var init_database = require('./routes/init_database');
var get_image = require('./routes/get_image');
var submit_landmark = require('./routes/submit_landmark');


var get_landmark64 = require('./routes/facelandmark/get_facelandmark64');
var init_landmark64 = require('./routes/facelandmark/init_database');
var get_landmark64_database = require('./routes/facelandmark/get_landmarkdatabase');
var submit_landmark64 = require('./routes/facelandmark/submit_facesubtask');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5000kb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/init_database', init_database);
app.use('/get_image', get_image);
app.use('/get_database', get_database);
app.use('/submit_landmark', submit_landmark);


app.use('/facelandmark/get_facelandmark64', get_landmark64);
app.use('/facelandmark/init_database', init_landmark64);
app.use('/facelandmark/get_database', get_landmark64_database);
app.use('/facelandmark/submit_facesubtask', submit_landmark64);

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