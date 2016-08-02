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
			if (error) {
				res.status(500).send(error);
			}else{
				var newarr=[];
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
					newarr.push(newObject);
				}
				res.json(newArr);
			}
		});
	},
	// user sign in fuction
	signin : function (req,res){
		username = req.body.username;
		password = req.body.password;

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