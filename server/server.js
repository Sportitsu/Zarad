'use strict';
var mongoose = require('mongoose');
var express = require('express');
// var config = require('./_config');

var MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/node-test';

mongoose.connect(MONGO_URI);


var app = express();

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers');
	next();
});



// connect to mongoDB database
var port = process.env.PORT || 8000;

// configure server with all routing plus middleware
require('./config/middleware.js')(app,express);
require('./config/routes.js')(app, express);


// start listening on port 8000
var listener = app.listen(port , function(){
	console.log('Listening on port ' + listener.address().port); // Listening port
});

module.exports = app;
