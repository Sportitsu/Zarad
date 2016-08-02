
var expect = require ('chai').expect;
var path = require('path')

var test = require(path.join(__dirname,'../../' ,'./client/app.js'));

console.log(test);


describe("Testing Server", function (){
	it("should work", function (){
		expect(true).to.be.true
	})
})