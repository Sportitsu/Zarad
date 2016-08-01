
var expect = require ('chai').expect;
var path = require('path')
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var test = require(path.join(__dirname,'../../' ,'./server/server.js'));

console.log(test);


describe("Testing Server", function (){
	it("should work", function (){
		expect(true).to.be.true
	})
})