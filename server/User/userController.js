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
	},

	signup : function(req, res){
		var username = req.body.username;
		var password = req.body.password;

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

	}

}