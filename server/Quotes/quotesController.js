'use strict';
var Quote = require('./quotesModel.js');
var helpers = require('../config/helpers');


module.exports = {

	getQuotes : function(req, res){
		Quote.find({})
			 .exec(function(err, quotes){
			 	if(quotes){
			 		res.status(200).send(quotes);
			 	} else {
			 		helpers.errorHandler('Error Getting Quotes')
			 	}
			 })
	} , 

	addQuote : function(req, res){
		var newQuote = new Quote({
			image : req.body.image
		})
		newQuote.save(function(err, saved){
			console.log(saved);
			console.log(err);
			if(saved){
				res.status(201).send(saved);
			}
		})
	}, 

	deleteQuote : function(req,res){
		// TODO Delete Quote
	}
};