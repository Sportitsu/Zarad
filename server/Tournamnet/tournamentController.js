var Tournament = require('./tournamentModel');

module.exports = {
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
	}
}