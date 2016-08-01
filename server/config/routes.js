// Require all the controller functions here 


module.exports = function(app,express){

	app.get('/api/home' , function(req,res){
		res.status(200).send('Connected to home');
	})

}