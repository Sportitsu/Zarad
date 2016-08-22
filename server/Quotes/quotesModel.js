'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var quoteSchema = new Schema({
 image : { type : String}
});

var Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;