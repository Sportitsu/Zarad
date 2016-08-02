// Require all the controller functions here 
var adminController = require('../Admin/adminController');

// Waiting for database setup 

module.exports = function(app,express){

	app.get('/api/home' , function(req,res){
		res.status(200).send('Connected to home');
	});

	// admin routes
	app.get('/api/admin/:username' ,adminController.getAdmin);
	app.post('/api/admincreate', adminController.addAdmin);
	app.post('/api/admin' , function(req,res){
		res.status(201).send('test');
	})

}