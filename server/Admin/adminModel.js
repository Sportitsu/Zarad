var mongoose = require('mongoose');

var Schema = mongoose.Schema ;

// Admin table is here.
var adminSchema = new Schema ({
	username : {type: String, required : true, index : { unique : true }},
	password : {type: String, required : true},
	firstName : {type: String, required : true},
	lastName : {type: String, required : true},
	email : {type: String, required : true}
});

var Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;