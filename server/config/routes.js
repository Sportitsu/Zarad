// Require all the controller functions here 

// Waiting for database setup 

module.exports = function(app,express){

	app.get('/api/home' , function(req,res){
		res.status(200).send('Connected to home');
	});

	app.get('/api/admin' , function(req,res){
		res.status(200).send('Admin on road');
	})

	app.post('/api/admin' , function(req,res){
		res.status(201)
	})

}