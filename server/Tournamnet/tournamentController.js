var Tournament = require('./tournamentModel');

module.exports = {
	// fetch all tournaments function
	getAll : function (req,res) {
		Tournament.find({})
		.exec(function (error, tournaments) {
			if(tournaments.length === 0){
				res.status(500).send("Empty Table");
			}else{
				var tournamentsArray=[];
				for (var i = 0; i < tournaments.length; i++) {
					var tournamentObj ={};
					tournamentObj.name = tournaments[i].name;
					tournamentObj.Date = tournaments[i].Date;
					tournamentObj.place = tournaments[i].place;
					tournamentObj.organizer = tournaments[i].organizer;
					tournamentObj.details = tournaments[i].details;
					tournamentObj.poster = tournaments[i].poster;
					tournamentsArray.push(tournamentObj);
				}
				res.status(200).send(tournamentsArray);
			}
		})
	},
	// Add tournament function
	addTournament : function (req, res) {
		Tournament.exec(function (error,tournament) {
			if(error){
				res.status(500).send(error);
			}else{
				var newTournament = new Tournament({
					name : req.body.name,
					Date : req.body.Date,
					place : req.body.place,
					organizer : req.body.organizer,
					details : req.body.details,
					poster : req.body.poster
				})
				newTournament.save(function(error, tournament){
					if(error){
						res.status(500).send(error);
					}else{
						res.status(201).send(tournament);
					}
				})
			}
		})
	},
	// function to fetch one tournament
	getOne : function (req,res) {
		var name = req.body.name;
		Tournament.findOne({ name : name })
		.exec(function(error,tournament){
			if(tournament){
				res.status(200).send(tournament);
			}else{
				res.status(500).send(error);
			}
		})
	}
}