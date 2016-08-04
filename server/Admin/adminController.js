var Admin = require('./adminModel.js');
var jwt = require('jwt-simple');

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
				})
				res.status(200).send(returnAdmin);

			} else {
        res.status(500).send('InCorrect');
      }

		})
	},
	//Add new admin 

	addAdmin: function (req, res) {

    console.log("edfdg")
    
    //var username=req.body.username;
    var username="1"
    console.log("fsgf")
    Admin.findOne({username: username})
    .exec(function(error,admin){
  console.log("fsgf++++")
       if(!admin){
         var newAdmin = new Admin ({
          username:"elham",
          password: "1",
          email: "wwew",
          firstName: "dsd",
          lastName: "sdsd"
        });
        /*var newAdmin = new Admin ({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        });
        */
        
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
  
},
  // Admin sign in function 
  signin : function (req,res) {
    //var username = req.body.username;
    //var password = req.body.password;
     var username = req.body.user
    var password = req.body.password;
    Admin.findOne({ username : username })
    .exec(function (error,admin) {
      if(!admin){
        res.status(500).send(new Error('Admin Not Found'));
      }else{
        Admin.comparePassword(password,user.password, res, function(found){
          if(!found){
            res.status(500).send('Wrong Password');
          } else {
            var token = jwt.encode(user, 'secret');
            res.setHeader('x-access-token',token);
            res.json({token: token});
          }
        });
      }
    })
  }
}