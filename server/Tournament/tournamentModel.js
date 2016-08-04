var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var tournamentSchema = new Schema ({
	name : {type : String},
	Date : {type : Date},
	place : {type : String},
	organizer : {type : String},
	details : {type :  String},
	poster : {type : String}
});

var Tournament = mongoose.model('Tournament',tournamentSchema);

module.exports = Tournament;