var Admin = require('./adminModel.js');
var jwt = require('jwt-simple');

module.exports = {
	//fetch one admin
	getAdmin : function (req, res){
		Admin.findOne({username:req.params.username})
		.exec(function (error,admin) {
			if(error){
				console.error(error);
			}else{
				res.status(200).send(admin);
			}
		})
	},
	//Add new admin 

	addAdmin: function (req, res) {
    var username=req.body.username;
    Admin.findOne({username: username})
    .exec(function(error,admin){
      if(error){
        res.status(500).send(error);
      } else if(!admin){
      	console.log("YAAAAAAAAAAAA")
        var newAdmin = new Admin ({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        });
        
        newAdmin.save(function(err, newAdmin){
          if(err){
            res.status(500).send(err);
          } else {
            res.status(200).send(newAdmin);
          }
        })
      } else {
        res.send(500,'Admin Already Exists');
      }
    })
  }
}