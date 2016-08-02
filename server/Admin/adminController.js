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
				var returnAdmin = new Admin ({
					username : admin.username,
					email : admin.email,
					firstName : admin.firstName,
					lastName : admin.lastName
				})
				res.status(200).send(returnAdmin);
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
            var returnAdmin = new Admin ({
              username : newAdmin.username,
              email : newAdmin.email,
              firstName : newAdmin.firstName,
              lastName : newAdmin.lastName
            });
            res.status(201).send(returnAdmin);
          }
        })
      } else {
        res.send(500,'Admin Already Exists');
      }
    })
  }
}