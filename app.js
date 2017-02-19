var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var gen = require('./public/javascripts/gen.js');
var index = require('./routes/index');
var users = require('./routes/users');
var request = require('request');

var app = express();

var http = require('http').createServer(app);
var fs = require('fs');
var socketio = require('socket.io');
var request = require('request');
var io = socketio();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
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

io.on('connection', function(socket) {

    console.log("Got connection.");

    socket.on('query', function(q) {
        console.log(q);
        wolframQuery(q, socket);
    });
});

function wolframQuery(query, socket) {
    var result;
    var options = {
        url: 'https://api.wolframalpha.com/v1/result?appid=XVVT6H-237WH8JWQY&i=' + encodeURI(query),
        headers: {}
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            socket.emit('message', {
                stuff: body
            });
            console.log(body);
        }
    }
    request(options, callback);
}


module.exports = app;
