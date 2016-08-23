'use strict';
// Require all the controller functions here 
var helpers = require('./helpers.js'); // our custom middleware
var adminController = require('../Admin/adminController');
var userController = require('../User/userController');
var clubController = require('../Club/clubController');
var tournamentController = require('../Tournament/tournamentController');
var quoteController = require('../Quotes/quotesController');

// Waiting for database setup 
module.exports = function(app){
	// Admin Page Routes
	app.post('/api/admin/create', adminController.addAdmin);
	app.post('/api/admin/signin', adminController.signin);
	app.get('/api/admin/x/:username' ,adminController.getAdmin);
	app.post('/api/admin/delete', adminController.adminRemove);
	app.get('/api/admin/admins', adminController.getAdmins);
	// *************************** //	
	
	//Tournament Page Routes
	app.get('/api/tournament/x/:name', tournamentController.getOne);
	app.get('/api/tournament/tournaments', tournamentController.getAll);
	app.post('/api/tournament/create', tournamentController.addTournament);
	app.post('/api/tournament/delete', tournamentController.tournamentRemove);
	app.post('/api/tournament/edit', tournamentController.tournamentEdit);
	app.post('/api/tournament/addLike', tournamentController.addLike);
	
	// Club Page Routes
	app.post('/api/club/register',clubController.addClub);
	app.get('/api/club/x/:username', clubController.getClub);
	app.get('/api/clubs', clubController.getAllClubs);
	app.post('/api/club/delete', clubController.clubRemove);
	app.post('/api/club/editProfile', clubController.clubEdit);
	app.post('/api/club/signin', clubController.signin);
	app.post('/api/club/getclub', clubController.getClubForUser);



	// User Page Routes

    app.post('/api/user/delete', userController.deleteUser); // 
	app.post('/api/user/editProfile', userController.editProfile);
	app.get('/api/user/x/:username', userController.getUser);
	app.get('/api/users', userController.getAllUsers);
	app.post('/api/user/signin' , userController.signin);
	app.post('/api/user/signup', userController.signup);
	app.post('/api/user/resub' , userController.resub);
	app.post('/api/user/goals', userController.updateGoal);

	// Quote Routes
	app.get('/api/quotes/get', quoteController.getQuotes);
	app.post('/api/quotes/newquote', quoteController.addQuote);


	app.get('/api/users/clubUsers/:clubName', userController.getClubUsers);
    // If a request is sent somewhere other than the routes above,
    // send it through our custom error handler
    app.use(helpers.errorLogger);
    app.use(helpers.errorHandler);
};
