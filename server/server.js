var mongoose = require('mongoose');
var express = require('express');


var app = express();

// connect to mongoDB database
var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/zarad';
var port = process.env.PORT || 8000;

mongoose.createConnection(mongoURI);

// configure server with all routing plus middleware
require('./config/middleware.js')(app,express);
require('./config/routes.js')(app, express);

// start listening on port 8000
var listener = app.listen(port , function(){
	console.log('Listening on port ' + listener.address().port); // Listening port
})

module.exports = app;
