var mongoose = require('mongoose');

// Admin table is here.
var adminSchema = new Schema ({
	username : {type: String, require : true},
	password : {type: String, require : true},
	firstName : {type: String, require : true},
	lastName : {type: String, require : true},
	email : {type: String, require : true}
});

var Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;