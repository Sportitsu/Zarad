var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tournamentSchema = new Schema ({
	name : {type : String , required : true},
	Date : {type : String , required : true},
	place : {type : String , required : true},
	organizer : {type : String , required : true},
	details : {type :  String , required : true},
	poster : {type : String , required : true}
});

var Tournament = mongoose.model('Tournament',tournamentSchema);

module.exports = Tournament;