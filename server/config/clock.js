var User = require('./../User/userModel');
var mongoose = require('mongoose');
var MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/node-test';
// var time = require('time');
mongoose.connect(MONGO_URI);
var threeDays = 259200000;
var oneMonth  = 2592000000;

// var a = new time.Date(59837089475);
// console.log(a.toString());

// var now = new time.Date(Date.now());
// console.log(now.toString());
	console.log('Hello Guys');
// console.log('This is the difference between the two  ' +( (59837089475 + oneMonth) - Date.now()) );

User.find({}).exec(function(err, users){
	for(var i = 0 ; i < users.length; i++){
			var isFinished = users[i].subscription + ( oneMonth * users[i].membership);
			console.log('This is ' + users[i].username + ' :\n');
			console.log('His due date is ' + isFinished);
			console.log('His comparison with now is  ' + (isFinished - Date.now()));
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
process.exit();