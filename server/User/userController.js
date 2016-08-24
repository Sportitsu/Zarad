'use strict';
var User = require('./userModel.js');
var jwt = require('jwt-simple');
var Club = require('../Club/clubModel.js');
var helpers = require('../config/helpers');
var clubController = require('../Club/clubController.js');

module.exports= {
	// fetching a user based on the user name
	getUser: function(req,res){
		User.findOne({username: req.params.username})
		.exec(function(error,user){
			if(user){
				res.status(200).send(user);
			}else{
				helpers.errorHandler(error,req,res);
			}
		});
	},
	// adding a new user
	getAllUsers :  function (req,res){
		User.find({})
		.exec(function (error,users) {
			if (users.length === 0) {
				helpers.errorHandler('Empty Table', req, res);
			} else {
				var newArr=[];
				for (var i = 0; i < users.length; i++) {
					var newObject = {};
					newObject.username = users[i].username;
					newObject.email = users[i].email;
					newObject.firstName = users[i].firstName;
					newObject.lastName = users[i].lastName;
					newObject.phone = users[i].phone;
					newObject.Date = users[i].Date;
					newObject.club = users[i].club;
					newObject.beltColor = users[i].beltColor;
					newObject.attendenc = users[i].attendenc;
					newObject.achievements = users[i].achievements;
					newObject.valid = users[i].valid;
					newObject.resub = users[i].resub;
					newObject.subscription = users[i].subscription;
					newObject.membership = users[i].membership;
					newObject.country = users[i].country;
					newObject.age = users[i].age;
					newObject.middleName = users[i].middleName || 'N/A';
					newObject.image = users[i].image || 'http://i.imgur.com/FlEXhZo.jpg?1';
					newArr.push(newObject);
				}
				res.status(200).json(newArr);
			}
		});
	},

	getClubUsers:function(req,res){
		var clubName=req.params.clubName;
		User.find({})
		.exec(function(error,users){
			if(users.length === 0){
				helpers.errorHandler('Empty Table', req, res);
			}else{
				var results=[];
				for (var i = 0; i < users.length; i++) {
					if(users[i].club=== clubName){
						results.push(users[i]);
					}
				}
				res.status(200).json(results);
			}
		});
	},

	signin : function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		// var key = req.body.username.indexOf('@') === -1 ? key = 'username' : key = 'email';
		if(username.charAt(0)==='P' && username.charAt(1)==='l'){
			User.findOne({username: username})
      		.exec(function (error, user) {
      			if(user){
	      		    Club.findOne({clubName : user.club}).exec(function(err,club){
	      		    	if(club){
			       			if (user) {
			     		 	      User.comparePassword(password,user.password, res, function(found){
			        		        if(found){
			       				       var token = jwt.encode(user, 'secret');
			         			        res.setHeader('x-access-token',token);
			         			        //modified the response to send the username
			         			        //to save it in local stoarge to be accessed late
			                            res.json({token:token, user: username});
			      			        } else {
			       				       helpers.errorHandler('Wrong Password', req, res);
			                        }
			                    });
			    		    } else {
			     		 	    helpers.errorHandler('User Does Not Exist', req, res);
			                }
	      		    	} else {
	      		    		helpers.errorHandler('Club No longer Exists', req, res);
	      		    	}
	      		    });
      			} else {
			 	    helpers.errorHandler('User Does Not Exist', req, res);
      			}
            });
		}else if(username.charAt(0) ==='C' && username.charAt(1)=== 'l'){
			clubController.signin(req,res);
		}else{
			helpers.errorHandler(' Invalid User Name', req, res);
		}
	},
	signup : function(req, res){
		if(req.body.beltColor && req.body.password && req.body.club && req.body.country){
			req.body.username = req.body.username || helpers.getPlayerName(req.body.firstName);
		} else {
			helpers.errorHandler('Wrong set Up' , req, res);
		}
			User.findOne({username: req.body.username})
	    		.exec(function(error,user){
			        if(user){
			          helpers.errorHandler('User Already Exists', req, res);
				    } else {
			    		Club.findOne({ clubName : req.body.club})
				        	.exec(function(err, foundClub){
				        		if(foundClub){
				        			var newUser = new User ({
							            username: req.body.username,
						  	            password: req.body.password,
							            email: req.body.email,
						     	        firstName: req.body.firstName,
							            lastName: req.body.lastName,
							            middleName: req.body.middleName,
						    	        age: req.body.age,
						   	            image: req.body.image || 'http://i.imgur.com/FlEXhZo.jpg?1',
						   	            country : req.body.country,
						   	            phone : req.body.phone, 
						   	            club : req.body.club,
						   	            beltColor : req.body.beltColor,
						   	            attendance : req.body.attendance || 0,
						   	            achievements : req.body.achievements,
						   	            membership : req.body.membership || 1,
						   	            subscription : req.body.subscription || Date.now()
							        });				   		
							        newUser.save(function(err, newUser){
							            if(err){
							                helpers.errorHandler(err, req, res);
							            } else {
							                res.status(201).send(newUser);
							            }
							        });	
				        		} else {
				        			helpers.errorHandler('Club Not Found', req, res);
				        		}
				        	});
	                }
	    });

	},

	editProfile : function(req,res){
		User.findOne({username  : req.body.username})
			.exec(function(err , user){
				if(user){
					user.email = req.body.email || user.email; 
					user.firstName = req.body.firstName || user.firstName;
					user.lastName = req.body.lastName || user.lastName;
					user.middleName = req.body.middleName || user.middleName;
					user.age = req.body.age || user.age;
					user.image = req.body.image || user.image;
					user.country = req.body.country || user.country;
					user.phone = req.body.phone || user.phone; 
					user.club = req.body.club || user.club;
					user.beltColor = req.body.beltColor || user.beltColor;
					req.body.achievements ? user.achievements.push({ name : req.body.achievements , place:req.body.place}) : user.achievements;
					user.attendance = req.body.attendance || user.attendance;
					if(req.body.oldPassword){
						User.comparePassword(req.body.oldPassword , user.password , res , function(){
								user.password = req.body.password;
								user.save(function(err, savedUser){
									res.status(201).send('Updated \n' + savedUser);
								});
						});
					}
					user.save(function(err, savedUser){
						res.status(201).send(savedUser);
					});
				} else {
					helpers.errorHandler('User Not Available', req, res);
				}
			});
	}, 

	deleteUser : function(req, res){
		var username = req.body.username;
		User.findOne({username: username}).remove().exec(
			function(err,data){
			if(data.result.n){
				res.status(201).send('User Deleted');
			} else {
				helpers.errorHandler('Not Available', req, res);
			}
		});
	},

	resub : function(req,res){
		var username = req.body.username;
		User.findOne({username : username})
			.exec(function(err, user){
				if(user){
					if(user.valid){
						var isFinished = user.subscription + ((30 * 24 * 60 * 60 * 1000) * user.membership);
						var remaining = isFinished - Date.now();
						user.subscription = (Date.now() + remaining);
						user.resub = false;
						user.membership = req.body.membership;
					} else {
						user.subscription = Date.now();
						user.membership = req.body.membership;
						user.resub = false;
						user.valid = true;
					}
					user.save(function(err, saved){
						if(saved){
							res.status(201).send(saved);
						} else {
							helpers.errorHandler('Not Saved', req, res);		
						}
					});
				} else {
					helpers.errorHandler('Not Available', req, res);
				}
			});
	},

	updateGoal : function(req,res){
		var goal = req.body.goal; 
		var username = req.body.username;
		var method = req.body.method;
		User.findOne({username : username})
			.exec(function(err , user){
				if(user){
					if(method > 0){
						user.goals.push(goal);
					} else if(method < 0){
							for(var i = 0 ; i < user.goals.length; i++){
								if(user.goals[i].title === goal.title){
									console.log(user.goals[i].title);
									user.goals.splice(i,1);
								}

							}
					}
					user.save(function(err,saved){
						if(saved){
							res.status(201).send(saved);
						}
					});
				} else {
					helpers.errorHandler('User Not Found', req,res);
				}
			});
	}
};