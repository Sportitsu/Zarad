var mongoose = require('mongoose');

var Schema = mongoose.Schema ;

// Admin table is here.
var adminSchema = new Schema ({
	username : {type: String, require : true, index : { unique : true }},
	password : {type: String, require : true},
	firstName : {type: String, require : true},
	lastName : {type: String, require : true},
	email : {type: String, require : true}
});

var Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;