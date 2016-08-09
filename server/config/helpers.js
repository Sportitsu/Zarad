'use strict';
var jwt = require('jwt-simple');

module.exports = {
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