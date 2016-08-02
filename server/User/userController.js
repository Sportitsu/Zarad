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
	}
}