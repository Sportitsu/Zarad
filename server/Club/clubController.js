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
	}
}