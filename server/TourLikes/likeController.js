'use strict';
var Like = require('./likeModel');
var helpers = require('../config/helpers');

module.exports = {
	addLike:function(req,res){
		console.log(req.body)
		var tourid=req.body.tourid
		var username=req.body.username
		//{ tourid: '113', username: '123', like: true, disLike: false }
		//we must test user name also 
		Like.findOne({ tourid : tourid})
		.exec(function(error,returnlike){
			console.log("dss")
			if(returnlike){
				returnlike.like=true;
				returnlike.disLike=false
			   	returnlike.save(function(error,saved){
					res.status(201).send(saved);
				});
			}else{
				console.log("dfdf")
				var newLike = new Like({
					tourid: req.body.tourid,
					username: req.body.username,
					like: true,
					disLike: false 
				});
				newLike.save(function(error,newLike){
					if(error){
						helpers.errorHandler(error, req, res);
					}
					res.status(201).send(newLike);
				})

			}
		})
	},
	DisLike:function(req,res){
		console.log(req.body)
		var tourid=req.body.tourid
		var username=req.body.username

	}
}