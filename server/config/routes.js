// Require all the controller functions here 
var helpers = require('./helpers.js'); // our custom middleware
// Waiting for database setup 
module.exports = function(app,express){
	// Home page Routes
	app.get('/api/home' , function(req,res){
		res.status(200).send('Connected to home');
	});
	// Just for testing mocha

	// Admin Page Routes
	app.post('/api/admin' , function(req,res){
		// console.log(req.body);
		console.log(req.params.username)
		// TO DO ....
	});

	app.get('/api/admin/:username' , function(req,res){
		console.log(req.body);

	})


	// Club Page Routes



	// User Page Routes

    // If a request is sent somewhere other than the routes above,
    // send it through our custom error handler
    app.use(helpers.errorLogger);
    app.use(helpers.errorHandler);
}