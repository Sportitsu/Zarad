var path = require('path');
var expect = require ('chai').expect;
var test = require(path.join(__dirname,'../../' ,'./client/app.js'));
describe("something else", function (){
	it("this is front-end", function (){
		expect(true).to.be.true;
	})
})