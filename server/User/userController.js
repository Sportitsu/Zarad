'use strict';
var User = require('./userModel.js');
var jwt = require('jwt-simple');
var Club = require('../Club/clubModel.js');

module.exports= {
	// fetching a user based on the user name
	getUser: function(req,res){
		User.findOne({username: req.params.username})
		.exec(function(error,user){
			if(user){
				res.status(200).send(user);
			}else{
				res.status(500).send(error);
			}
		});
	},
	// adding a new user
	getAllUsers :  function (req,res){
		User.find({})
		.exec(function (error,users) {
			if (users.length === 0) {
				res.status(500).send('Empty Table');
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
					newArr.push(newObject);
				}
				res.status(200).json(newArr);
			}
		});
	},
	signin : function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		User.findOne({username: username})
      		.exec(function (error, user) {
       			if (!user) {
     		 	    res.status(500).send(new Error('User does not exist'));
    		    } else {
       			    User.comparePassword(password,user.password, res, function(found){
        		        if(!found){
       				       res.status(500).send('Wrong Password');
      			        } else {
     			            var token = jwt.encode(user, 'secret');
         			        res.setHeader('x-access-token',token);
                            res.json({token: token});
                        }
                    });
                }
            });
	},
	signup : function(req, res){
		var username = req.body.username;
			User.findOne({username: username})
	    		.exec(function(error,user){
			        if(user){
			          res.status(500).send('User Already Exists');
				    } else {
			    		Club.findOne({ clubName : req.body.club})

				        	.exec(function(err, foundClub){
				        		if(!foundClub){
				        			res.status(500).send('Club Not Found');
				        		} else {
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
						   	            achievements : req.body.achievements
							        });				        			
							        newUser.save(function(err, newUser){
							            if(err){
							                res.status(500).send(err);
							            } else {
							                res.status(201).send(newUser);
							            };
							        });			        			
				        		}
				        	});
	                }
	      
	    });

	},




	editProfile : function(req,res){
		User.findOne({username  : req.body.username})
			.exec(function(err , user){
				if(!user){
					res.status(500).send('User not Available');
				} else {
					user.email = req.body.email || user.email, 
					user.firstName = req.body.firstName || user.firstName,
					user.lastName = req.body.lastName || user.lastName,
					user.middleName = req.body.middleName || user.middleName,
					user.age = req.body.age || user.age,
					user.image = req.body.image || user.image,
					user.country = req.body.country || user.country,
					user.phone = req.body.phone || user.phone, 
					user.club = req.body.club || user.club,
					user.beltColor = req.body.beltColor || user.beltColor,
					user.achievements = req.body.achievements || user.achievements ,
					user.attendance = req.body.attendance || user.attendance
					if(req.body.oldPassword){
						User.comparePassword(req.body.oldPassword , user.password , res , function(found){
								user.password = req.body.password;
								user.save(function(err, savedUser){
									res.status(201).send('Updated \n' + savedUser);
								});
						});
					}
					user.save(function(err, savedUser){
						res.status(201).send(savedUser)	
					});
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
				res.status(500).send('Not Available');
			}
		});
	}
}