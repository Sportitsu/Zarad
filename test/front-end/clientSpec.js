
'use strict';

describe('Autherization factory',function(){
	var Auth;
	beforeEach(module('zarad')); //load the app module before each test , actully angular mock allow us to load our angular modules to test
	beforeEach(inject(function(_Auth_){ // inject here is injecting a service
		Auth=_Auth_;
	}))
	it('auth factory should exist',function(){
		expect(Auth).toBeDefined();
	});

	describe('.siginin', function(){

		it('should exist', function(){
			expect(Auth.siginin).toBeDefined();
		});
	});

	describe('.siginup',function(){
		it('should exist',function(){
			expect(Auth.siginup).toBeDefined();
		})
	})
})

