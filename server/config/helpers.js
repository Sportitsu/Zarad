'use strict';
var jwt = require('jwt-simple');
var CronJob = require('cron').CronJob;
var User = require('./../User/userModel');
module.exports = {
	job : new CronJob('00 00 00 * * *', function(){
		console.log('starting');
		var threeDays = 259200000;
		var oneMonth  = 2592000000;
		User.find({}).exec(function(err, users){
				for(var i = 0 ; i < users.length; i++){
						var isFinished = users[i].subscription + ( oneMonth * users[i].membership);
						if(isFinished - Date.now() < threeDays && isFinished - Date.now() > -1){
							console.log('Should Subscribe');
							users[i].resub = true;
						} else if(isFinished - Date.now() > 0){
							console.log('Still Valid , Good To Go');
							users[i].valid = true;
						 } else {
						 	console.log('Sorry , better come again soon to run');
						 	users[i].valid = false;
							users[i].resub = true;
						 }
						 users[i].save();
				}
			});
	}, null, true, 'Asia/Amman'),

	getClubName : function(clubName){

		var name = 'cl';
		for(var i = 0; i < 4 ; i++){
			if(clubName[i]){
				name+= clubName[i];	
			}
		}
		name+= Math.floor(Math.random()*999);
		return name;
	},

	getPlayerName : function(playerName){
		var name = 'pl';
		for(var i = 0; i < 4 ; i++){
			if(playerName[i]){
				name+= playerName[i];
			}
		}
		name+= Math.floor(Math.random()*999);
		return name;	
	},

	errorLogger : function(error, req, res, next){
		console.log(error);
		next(error);
	},
	errorHandler : function(error, req, res){
		res.status(500).send(error);
	},
	decode : function(req, res, next){
		var token = req.headers['x-access-token'];
		var user;

		if(!token){
			return res.send(403); // send forbidden if token is not provided
		}

		try {
			// decode token and attach user to the request
			// for use inside our controllers
			user = jwt.decode(token , 'secret');
			req.user = user;
			next();
		} catch(error){
			return next(error);
		}

	}
};