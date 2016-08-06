'use strict';
var Admin = require('./adminModel.js');
var jwt = require('jwt-simple');
var helpers = require('../config/helpers');

module.exports = {
	//fetch one admin
	getAdmin : function (req, res){
    Admin.findOne({username:req.params.username})
		.exec(function (error,admin) {

			if(admin){
				var returnAdmin = new Admin ({
					username : admin.username,
					email : admin.email,
					firstName : admin.firstName,
					lastName : admin.lastName
				});
				res.status(200).send(returnAdmin);
			} else {
        helpers.errorHandler('InCorrect',req,res);
      }
		});
	},
	//Add new admin 
<<<<<<< HEAD

	addAdmin: function (req, res) { 
=======
	addAdmin: function (req, res) {
>>>>>>> 35b17c9ad7c534c0c45e1dbe8b5311c1aecdd15b
    var username=req.body.username;
    // var username="1"
    // console.log("fsgf")
    Admin.findOne({username: username})
    .exec(function(error,admin){
<<<<<<< HEAD
       if(!admin){
        //  var newAdmin = new Admin ({
        //   username:"elham",
        //   password: "1",
        //   email: "wwew",
        //   firstName: "dsd",
        //   lastName: "sdsd"
        // });
=======

       if(admin){
        helpers.errorHandler('Admin Already Exists', req,res);
      } else {
>>>>>>> 35b17c9ad7c534c0c45e1dbe8b5311c1aecdd15b
        var newAdmin = new Admin ({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        });
        newAdmin.save(function(err, newAdmin){
          if(err){
            helpers.errorHandler(err,req,res);
          } else {
            var returnAdmin = new Admin ({
              username : newAdmin.username,
              email : newAdmin.email,
              firstName : newAdmin.firstName,
              lastName : newAdmin.lastName
            });
            res.status(201).send(returnAdmin);
          }
        });
      }
<<<<<<< HEAD
    })
  
},
=======
    });
  },
>>>>>>> 35b17c9ad7c534c0c45e1dbe8b5311c1aecdd15b
  // Admin sign in function 
  signin : function (req,res) {
    //var username = req.body.username;
    //var password = req.body.password;
     var username = req.body.user
    var password = req.body.password;
    Admin.findOne({ username : username })
    .exec(function (error,admin) {
        if(admin){
            Admin.comparePassword(password, admin.password, res, function(found){
                if(found){
                  var token = jwt.encode(admin, 'secret');
                  res.setHeader('x-access-token',token);
                  res.json({token: token});
                } else {
                  helpers.errorHandler('Wrong Password', req,res);
                }
            });
        }else{
          helpers.errorHandler('Admin Not Found', req, res);
        }
    });
  }
};
