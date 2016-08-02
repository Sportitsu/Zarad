// Require all the controller functions here 

// Waiting for database setup 

module.exports = function(app,express){

	app.get('/api/home' , function(req,res){
		res.status(200).send('Connected to home');
	});


	app.post('/api/admin' , function(req,res){
		console.log(req.body);
		res.status(201).send('You are not convincing me to give you aanything')
	})

}