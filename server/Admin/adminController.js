var Admin = require('./adminModel.js');
var jwt = require('jwt-simple');

module.exports = {
	//fetch one admin
	getAdmin : function (req, res){
		Admin.findOne({username:req.body.username})
		.exec(function (error,admin) {
			if(error){
				console.error(error);
			}else{
				res.status(200).send(admin);
			}
		})
	}
}