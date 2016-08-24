'use strict';
var Club = require('./clubModel');
var jwt = require('jwt-simple');
var helpers = require('../config/helpers');

module.exports ={
	// fetch a club
	getClub : function (req,res) {
		var username = req.params.username;
		Club.findOne({username : username})
		.exec(function (error,club) {
			if(club){
				var returnClub = new Club ({
					username : club.username,
					country : club.country,
					clubName : club.clubName,
					email : club.email,
					image: club.image
				});
				res.status(200).send(returnClub);
			}else{
				helpers.errorHandler(error, req, res);
			}
		});
	},
	getClubForUser : function(req,res){
		var clubName = req.body.clubName ;
	    Club.findOne({clubName : clubName})
	    	.exec(function(err, club){
	    		if(club){
	    			res.status(200).send(club);
	    		} else {
	    			helpers.errorHandler('Error Getting Club', req,res);
	    		}
	    	});
	},
	// Add a new club
	addClub : function(req,res){
		if(req.body.password && req.body.country && req.body.clubName){
			req.body.username = req.body.username || helpers.getClubName(req.body.clubName);
		} else {
			helpers.errorHandler('Wrong set Up' , req,res);
		}

		Club.findOne({username : req.body.username})
		.exec(function (error,club) {
			if(club){
				helpers.errorHandler('Club Already Exists', req, res);
				}else{
				var newClub = new Club({
					username : req.body.username,
					password : req.body.password,
					country  : req.body.country,
					clubName : req.body.clubName,
					email : req.body.email,
					channelId: req.body.channelId || '',
					image: req.body.image || 'http://i.imgur.com/FlEXhZo.jpg?1'
				});
				newClub.save(function (error,club) {
					if(error){
						helpers.errorHandler(error, req, res);
					}else{
						var returnClub = new Club ({
							username : club.username,
							country : club.country,
							clubName : club.clubName,
							email : club.email,
							channelId: req.body.channelId || '',
							image : club.image
						});
						res.status(201).send(returnClub);
					}
				});
			}
		});
	},
	// fetch all clubs
	getAllClubs : function (req, res){
		Club.find({})
		.exec(function (error,clubs) {
			if(clubs.length === 0){
				helpers.errorHandler('Empty Table', req, res);
			}else{
				var clubArray = [];
				for (var i = 0; i < clubs.length; i++) {
					var clubObj = {};
					clubObj.username = clubs[i].username;
					clubObj.country = clubs[i].country;
					clubObj.clubName = clubs[i].clubName;
					clubObj.email = clubs[i].email;
					clubObj.image=clubs[i].image;
					clubArray.push(clubObj);
				}
				res.status(200).send(clubArray);
			}
		});
	},
	// club sign in
	// we want it to take an email or username
	signin : function (req,res) {
		var username = req.body.username;
		var password = req.body.password;
		Club.findOne({ username : username})
		.exec(function (error,club) {
			if(club){
				Club.comparePassword(password,club.password, res, function(found){
        		        if(found){
        		        	var token = jwt.encode(club, 'secret');
         			        res.setHeader('x-access-token',token);
         			         //modified the response to send the clubname
         			        //to save it in local storage to be accessed late
                            res.json({token: token, user: club.username});
      			        } else {
       				       helpers.errorHandler('Wrong Password', req, res);
                        }
                });
			}else{
				helpers.errorHandler('Club Does Not Exists', req, res);
			}
		});
	},

	// this function is to remove a club
	clubRemove :  function (req, res){
		var username = req.body.username;
		Club.findOne({ username : username }).remove()
		.exec(function (error,data) {
			if(data.result.n){
				res.status(201).send('Club Deleted');
			}else{
				helpers.errorHandler('Not Available', req, res);
			}
		});
	},
	// this function is to modify the information of a club
	clubEdit : function (req,res) {
		Club.findOne({ username : req.body.username })
		.exec(function (error, club) {
			if(club){
				club.country = req.body.country || club.country;
				club.channelId = req.body.channelId || club.channelId;
				club.image = req.body.image || club.image;
				if(req.body.oldPassword){
					Club.comparePassword(req.body.oldPassword , club.password, res, function (found){
						if(found){
							club.password = req.body.password;
						} else {
							helpers.errorHandler('Wrong Entry', req, res);
						}
					});
				}
				club.save(function (error, savedClub) {
					res.status(201).send(savedClub);
				});
			}else{
				helpers.errorHandler('Club Not Available', req, res);
			}
		});
	}
};
