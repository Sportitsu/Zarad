'use strict';
var Quote = require('./quotesModel.js');


module.exports = {

	getQuotes : function(req, res){
		Quote.find({})
			 .exec(function(err, quotes){
			 	if(quotes.length > 0){
			 		res.status(200).send(quotes);
			 	} else {
			 		res.status(500).send('NOTHING IN');
			 	}
			 });
	} , 

	addQuote : function(req, res){
		var newQuote = new Quote({
			image : req.body.image
		});
		newQuote.save(function(err, saved){
			if(saved){
				res.status(201).send(saved);
			}
		});
	}
};