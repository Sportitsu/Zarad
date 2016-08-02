var User = require('./userModel.js');
var jwt = require('jwt-simple');

module.exports={
	// fetching a user based on the user name
	getUser: function(req,res){
		User.findOne({username: req.params.username})
		.exec(function(error,user){
			if(user){
				res.status(200).send(user);
			}else{
				res.status(500).send(error);
			}
		})
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
					newObject.email = users[i].username;
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
				              res.status(200).send(newUser);
				            };
				        });
	                }
	      
	    });

	},

	editPorfile : function(req,res){

	}, 

	deleteUser : function(req, res){

	}, 


	checkAuth : function(req,res){
	    // checking to see if the user is authenticated
	    // grab the token in the header is any
	    // then decode the token, which we end up being the user object
	    // check to see if that user exists in the database
	    var token = req.headers['x-access-token'];
	    if (!token) {
	      res.status(500).send(new Error('No token'));
	    } else {
	      var user = jwt.decode(token, 'secret');
	      User.findOne({username: user.username})
	        .exec(function (error, foundUser) {
	          if(error){
	            res.status(500).send(error);
	          } else if (foundUser) {
	            res.send(200);
	          } else {
	            res.send(401);
	          }
	        });
	    }
	},
	signin : function(req,res){
		var username = req.params.username;
		User.findOne({username : username})
		.exec(function (error,user) {
			if (error) {
				res.status(500).send(error);
			}else if(!user){
				res.status(500).send(new Error('User does not exist'));
			}else{
				  var token = jwt.encode(user, 'secret');
	              res.setHeader('x-access-token',token);
	              var data={
	                token: token,
	                username: username
	              }
	            res.json(data);
			}
		});
	},
	// this function is for adding new users
	addUser :  function (req,res){
		username = req.body.username;
		User.findOne({username : username})
		.exec(function (error,user) {
			if(error){
				res.status(500).send(error);
			}else if(!user){
				var newUser = new User ({
					username : req.body.username,
					password : req.body.password,
					email : req.body.email,
					firstName : req.body.firstName,
					lastName : req.body.lastName,
					phone : req.body.phone,
					Date : req.body.Date,
					club : req.body.club,
					beltColor : req.body.beltColor,
					attendenc : req.body.attendenc,
					achievements : req.body.achievements
				})
				newUser.save(function (error,user) {
					if(error){
						res.status(500).send(error);
					}else{
						res.status(201).send(user)
					}
				})
			}else{
				res.status(500).send("User Already Exists");
			}
		})
	}
}