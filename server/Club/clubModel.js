var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Club Table is here 
var clubSchema = new Schema ({
	username : {type : String, required : true, index : {unique : true}},
	password : {type : String, required : true},
	country  : {type : String},
	clubName : {type : String}
});

var Club = mongoose.model('Club',clubSchema);
module.exports = Club;