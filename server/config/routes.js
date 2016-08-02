// Require all the controller functions here 
var helpers = require('./helpers.js'); // our custom middleware
var adminController = require('../Admin/adminController');

// Waiting for database setup 
module.exports = function(app,express){
	// Home page Routes
	app.get('/api/home' , function(req,res){
		res.status(200).send('Connected to home');
	});
	// Just for testing mocha



	// Admin Page Routes
	app.get('/api/admin/:username' ,adminController.getAdmin);
	app.post('/api/admincreate', adminController.addAdmin);
	// *************************** //	
	

	


	// Club Page Routes



	// User Page Routes

    // If a request is sent somewhere other than the routes above,
    // send it through our custom error handler
    app.use(helpers.errorLogger);
    app.use(helpers.errorHandler);
}