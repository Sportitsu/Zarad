var Club = require('./clubModel');
var jwt = require('jwt-simple');

module.exports ={
	// fetch a club
	getClub : function (req,res) {
		var username = req.params.username;
		Club.findOne({username : username})
		.exec(function (error,club) {
			if(club){
				returnClub = new Club ({
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
	}
}