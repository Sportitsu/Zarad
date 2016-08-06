'use strict';
var mongoose = require('mongoose');
var express = require('express');
var config = require('./_config');

var app = express();
var MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/node-test';
// connect to mongoDB database
var port = process.env.PORT || 8000;
mongoose.connect(MONGO_URI);

// configure server with all routing plus middleware
require('./config/middleware.js')(app,express);
require('./config/routes.js')(app, express);


// start listening on port 8000
var listener = app.listen(port , function(){
	console.log('Listening on port ' + listener.address().port); // Listening port
});

module.exports = app;
