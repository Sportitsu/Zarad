var mongoose = require('mongoose');
var express = require('express');
var config = require('./_config');

var app = express();

// connect to mongoDB database
// var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/zarad';
var port = process.env.PORT || 8000;



var options = {
 index: "../www/index.html"
};

//app.use('/', express.static('app', options));

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI[app.settings.env],function(err, res){
	if(err){
		console.log('Error Connecting to the database. ' + err);
	} else {
		console.log('Connected to Database ' + config.mongoURI[app.settings.env])
	}
});

// configure server with all routing plus middleware
require('./config/middleware.js')(app,express);
require('./config/routes.js')(app, express);


// start listening on port 8000
var listener = app.listen(port , function(){
	console.log('Listening on port ' + listener.address().port); // Listening port
})

module.exports = app;
