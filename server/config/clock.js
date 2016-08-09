var User = require('./../User/userModel');
var mongoose = require('mongoose');
var MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/node-test';
var time = require('time');

mongoose.connect(MONGO_URI);
var threeDays = 259200000;
var oneMonth  = 2592000000;
User.find({}).exec(function(err, users){
	for(var i = 0 ; i < users.length; i++){
			var isFinished = users[i].subscription + ( oneMonth * users[i].membership);
			if(isFinished - Date.now() < threeDays && isFinished - Date.now() > -1){
				users[i].resub = true;
			} else if(isFinished - Date.now() > 0){
				users[i].valid = true;
			 } else {
			 	users[i].valid = false;
				users[i].resub = true;
			 }
			 users[i].save();
	}
});
