'use strict';
var mongoose = require('mongoose');
var express = require('express');
var config = require('./_config');

var app = express();

// connect to mongoDB database
var port = process.env.PORT || 8000;
mongoose.connect('mongodb://zarad1993:yarabakri1204@ds145415.mlab.com:45415/heroku_1h02s8mf');

// configure server with all routing plus middleware
require('./config/middleware.js')(app,express);
require('./config/routes.js')(app, express);


// start listening on port 8000
var listener = app.listen(port , function(){
	console.log('Listening on port ' + listener.address().port); // Listening port
});

module.exports = app;
