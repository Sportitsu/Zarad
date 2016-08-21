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
			if(returnlike){
				console.log("dss")
				returnlike.like=req.body.like;
				returnlike.disLike=req.body.disLike
			   	returnlike.save(function(error,saved){
					res.status(201).send(saved);
				});
			}else{
				console.log("dfdf")
				var newLike = new Like({
					tourid: req.body.tourid,
					username: req.body.username,
					like: req.body.like,
					disLike: req.body.disLike 
				});
				console.log(newLike);
				newLike.save(function(error,newLike){
					console.log(newLike,error)
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

	},
	getAll : function (req,res) {
		Like.find({})
		.exec(function (error, likes) {
			if(likes.length === 0){
				helpers.errorHandler('Empty Table', req, res);
			}else{
			     
				res.status(200).send(likes);
			}
		});
	}
}