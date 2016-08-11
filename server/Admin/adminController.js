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


	addAdmin: function (req, res) { 

    var username=req.body.username;
    Admin.findOne({username: username})
    .exec(function(error,admin){
    

       if(admin){
        helpers.errorHandler('Admin Already Exists', req,res);
      } else {
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

    });
  },
  // Admin sign in function 
  signin : function (req,res) {
    //var username = req.body.username;
    //var password = req.body.password;
     var username = req.body.username;  
    var password = req.body.password;
    Admin.findOne({ username : username })
    .exec(function (error,admin) {
      
        if(admin){
            Admin.comparePassword(password, admin.password, res, function(found){
                if(found){
                  var token = jwt.encode(admin, 'secret');
                  res.setHeader('x-access-token',token);
                   //modified the response to send the username
                   //to save it in local stoarage to be accessed late
                  res.json({token: token,user:username});
                } else {
                  helpers.errorHandler('Wrong Password', req,res);
                }
            });
        }else{
          helpers.errorHandler('Admin Not Found', req, res);
        }
    });
  },
  adminRemove : function (req,res) {
    var username = req.body.username;
    Admin.findOne({ username : username}).remove()
    .exec(function (error, admin) {
      if(admin.result.n){
        res.status(201).send('Admin deleted');
      }else{
        helpers.errorHandler('Admin Not Found', req, res);
      }
    });
  },

  getAdmins : function (req,res) {
      Admin.find({})
      .exec(function (error, admins){
          if (admins.length === 0) {
            helpers.errorHandler('No Admins Found', req, res);
          }else{
            var adminsArr = [];
            for (var i = 0; i < admins.length; i++) {
              var adminObj={};
              adminObj.username = admins[i].username;
              adminObj.email = admins[i].email;
              adminObj.firstName = admins[i].firstName;
              adminObj.lastName = admins[i].lastName;
              adminObj._id = admins[i]._id;
              adminsArr.push(adminObj);
            }
            res.status(200).send(adminsArr);
          }
      });
  }
};
