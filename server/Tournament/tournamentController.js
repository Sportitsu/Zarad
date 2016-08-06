var Tournament = require('./tournamentModel');
var helpers = require('../config/helpers');

module.exports = {
	// fetch all tournaments function
	getAll : function (req,res) {
		Tournament.find({})
		.exec(function (error, tournaments) {
			if(tournaments.length === 0){
				helpers.errorHandler("Empty Table", req, res);
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
				helpers.errorHandler(error, req, res);
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
				helpers.errorHandler(error, req, res);
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
				helpers.errorHandler("Not Available", req, res);			
			}
		})
	},
	// function to edit Trounament
	tournamentEdit : function (req,res) {
		var id = req.body.id;
		Tournament.findOne({ _id : id })
		.exec(function(error, tournament){
			if(tournament){
				tournament.name = req.body.name || tournament.name;
				tournament.Date = req.body.Date || tournament.Date;
				tournament.place = req.body.place || tournament.place;
				tournament.organizer = req.body.organizer || tournament.organizer;
				tournament.details = req.body.details || tournament.details;
				tournament.poster = req.body.poster || tournament.poster;
				tournament.save(function(error,saved){
					res.status(201).send(saved);
				})
			}else{
				helpers.errorHandler("Tournament Not Available", req, res);
			}
		});
	}
}