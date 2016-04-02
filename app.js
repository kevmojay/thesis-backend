'use strict';

var mongoose = require('mongoose');
var server = require('http').Server(app);
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var memoryRouter = require('./src/routes/memory');
var cpuRouter = require('./src/routes/cpu');
var responseRouter = require('./src/routes/response');

var port = process.env.PORT || 8080;
var app = express();

mongoose.connect('mongodb://localhost/thesis', function(err) {
  if(err) {
    console.log(err);
  } else{
    console.log('connected');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// CORS
app.use(function(req, res, next) {
  //res.header('Access-Control-Allow-Origin', 'http://107.170.193.27:8080');
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, X-Access-Token, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});

app.use('/api/memory', memoryRouter);
app.use('/api/cpu', cpuRouter);
app.use('/api/response', responseRouter);

app.listen(port);
console.log('Listening on port ', port);
module.exports = app;
