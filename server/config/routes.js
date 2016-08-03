// Require all the controller functions here 
var helpers = require('./helpers.js'); // our custom middleware
var adminController = require('../Admin/adminController');
var userController = require('../User/userController');
var clubController = require('../Club/clubController');

// Waiting for database setup 
module.exports = function(app,express){
	// Home page Routes
	app.get('/api/home' , function(req,res){
		res.status(200).send('Connected to home');
	});
	// Just for testing mocha


	// Admin Page Routes
	app.get('/api/admin/x/:username' ,adminController.getAdmin);
	app.post('/api/admin/create', adminController.addAdmin);
	// app.post('/api/createclub', clubController.addClub);???
	// *************************** //	
	



	// Club Page Routes
	app.post('/api/clubregister',clubController.addClub);
	app.get('/api/club/:username', clubController.getClub);
	app.get('/api/clubs', clubController.getAllClubs);



	// User Page Routes
    app.post('/api/user/delete', userController.deleteUser); // 
	app.post('/api/user/editProfile', userController.editProfile);
	app.get('/api/user/x/:username', userController.getUser);
	app.get('/api/users', userController.getAllUsers);
	app.post('/api/user/signin' , userController.signin);
	app.post('/api/user/signup', userController.signup);

    // If a request is sent somewhere other than the routes above,
    // send it through our custom error handler
    app.use(helpers.errorLogger);
    app.use(helpers.errorHandler);
}