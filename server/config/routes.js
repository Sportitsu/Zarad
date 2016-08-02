// Require all the controller functions here 
var helpers = require('./helpers.js'); // our custom middleware
// Waiting for database setup 

module.exports = function(app,express){

	app.get('/api/home' , function(req,res){
		res.status(200).send('Connected to home');
	});


	app.post('/api/admin' , function(req,res){
		console.log(req.body);
		res.status(201).send('You are not convincing me to give you aanything')
	})



    // If a request is sent somewhere other than the routes above,
    // send it through our custom error handler
    app.use(helpers.errorLogger);
    app.use(helpers.errorHandler);
}