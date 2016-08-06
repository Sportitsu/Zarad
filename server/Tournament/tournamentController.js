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
	},
	// function to fetch one tournament
	getOne : function (req,res) {
		var name = req.params.name;
		Tournament.findOne({ name : name })
		.exec(function(error,tournament){
			if(tournament){
				res.status(200).send(tournament);
			}else{
				res.status(500).send(error);
			}
		})
	},
	// function to delete a tournament
	tournamentRemove : function (req,res) {
		var id = req.body.id;
		Tournament.findOne({ _id : id }).remove()
		.exec(function(error, data){
			if(data){
				res.status(201).send('Tournament Deleted');
			}else{
				res.status(500).send('Not Available');				
			}
		})
	},
	// function to edit Trounament
	tournamentEdit : function (req,res) {
		var id = req.body.id;
		Tournament.findOne({ _id : id })
		.exec(function(error, tournament){
			if(!tournament){
				res.status(500).send("Tournament Not Available");
			}else{
				tournament.name = req.body.name || tournament.name;
				tournament.Date = req.body.Date || tournament.Date;
				tournament.place = req.body.place || tournament.place;
				tournament.organizer = req.body.organizer || tournament.organizer;
				tournament.details = req.body.details || tournament.details;
				tournament.poster = req.body.poster || tournament.poster;

				tournament.save(function(error,saved){
					res.status(201).send(saved);
				})
			}

			})
		}
}