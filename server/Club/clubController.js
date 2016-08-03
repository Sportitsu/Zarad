var Club = require('./clubModel');
var jwt = require('jwt-simple');

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
					clubName : club.clubName
				})
				res.status(200).send(returnClub);
			}else{
				res.status(500).send(error)
			}
		})
	},
	// Add a new club
	addClub : function(req,res){
		var username = req.body.username;
		Club.findOne({username : username})
		.exec(function (error,club) {
			if(!club){
				var newClub = new Club({
					username : req.body.username,
					password : req.body.password,
					country  : req.body.country,
					clubName : req.body.clubName
				});
				newClub.save(function (error,club) {
					if(error){
						res.status(500).send(error);
					}else{
						var returnClub = new Club ({
							username : club.username,
							country : club.country,
							clubName : club.clubName
						})
						res.status(201).send(returnClub)
					}
				})
			}else{
				res.status(500).send("Club Already Exists");
			}
		})
	},
	// fetch all clubs
	getAllClubs : function (req, res){
		Club.find({})
		.exec(function (error,clubs) {
			if(clubs.length === 0){
				res.status(500).send("Empty Table");
			}else{
				var clubArray = [];
				for (var i = 0; i < clubs.length; i++) {
					var clubObj = {};
					clubObj.username = clubs[i].username;
					clubObj.country = clubs[i].country;
					clubObj.clubName = clubs[i].clubName;
					clubArray.push(clubObj);
				}
				res.status(200).send(clubArray);
			}
		})
	},
	// club sign in
	singin : function (req,res) {
		var username = req.body.username;
		var password = req.boddy.password;

		Club.findOne({ username: username})
		.exec(function (error,club) {
			if(!club){
				res.status(500).send(new Error('User does not exist'));
			}else{
				club
			}
		})
	}
}