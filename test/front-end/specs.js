/*var test = require('../../client/app.js');
var expect = require ('chai').expect;

describe("something else", function (){
	it("this is front-end", function (){
		expect(true).to.be.true;
	})
})


'use strict';

describe('AuthController', function () {*/

'use strict';

describe('AuthController',function(){
	it('should have a signup method', function () {
    expect($scope.signup).to.be.a('function');
  });
})