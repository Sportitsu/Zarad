'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likeSchema = new Schema ({
	tourid : {type : String, required : true, index : {unique : true} },
	username :{type : String, required : true ,index : {unique : true}},
    like    : {type : Boolean , required : true},
    disLike  : {type : Boolean, required : true }
	
});
var Like = mongoose.model('Like',likeSchema);
module.exports = Like;