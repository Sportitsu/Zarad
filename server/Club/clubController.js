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
	signin : function (req,res) {
		var username = req.body.username;
		var password = req.body.password;

		Club.findOne({ username: username})
		.exec(function (error,club) {
			if(!club){
				res.status(500).send(new Error('User does not exist'));
			}else{
				Club.comparePassword(password,club.password, res, function(found){
        		        if(!found){
       				       res.status(500).send('Wrong Password');
      			        } else {
     			            var token = jwt.encode(club, 'secret');
         			        res.setHeader('x-access-token',token);
                            res.json({token: token});
                        }
                });
			}
		})
	},

	// this function is to remove a club
	clubRemove :  function (req, res){
		var username = req.body.username;
		Club.findOne({ username : username }).remove()
		.exec(function (error,data) {
			if(data.result.n){
				res.status(201).send("Club Deleted");
			}else{
				res.status(500).send("Not Available");
			}
		})
	},
	// this function is to modify the information of a club
	clubEdit : function (req,res) {
		Club.findOne({ username : req.body.username })
		.exec(function (error, club) {
			if(!club){
				res.status(500).send("Club Not Available");
			}else{
				club.country = req.body.country || club.country;
				if(req.body.newClubName){
					var clubName = req.body.newClubName;
					Club.findOne({ clubName : clubName})
					.exec(function (error,clubTwo) {
						if(clubTwo){
							res.status(500).send("Club Name Already Exists");
						}else{
							club.clubName = req.body.newClubName;
						}
					})
				}
				if(req.body.oldPassword){
					Club.comparePassword(req.body.oldPassword , club.password, res, function (found){
						if(found){
							club.password = req.body.password;
							club.save(function(error,savedClub){
								res.status(201).send('Updated/n'+savedClub);
							})
						} else {
							res.status(500).send('Wrong Entry');
						}
					})
				}
				club.save(function (error, savedClub) {
					res.status(201).send(savedClub);
				})
			}
		})
	}
}