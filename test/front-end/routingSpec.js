'use strict'
describe('Routing',function(){
	var $route;
	beforeEach(module('zarad'));
	beforeEach(inject(function($injector){
		$route=$injector.get("$route");
	}));
	it('Should have /signup route, template, and controller', function () {
		expect($route.routes['/signup']).to.be.defined;
    	expect($route.routes['/signup'].controller).to.equal('AuthController');
    	expect($route.routes['/signup'].templateUrl).to.equal('app/auth/signup.html');
	});

	it('Should have /signin route, template, and controller', function () {
    	expect($route.routes['/signin']).to.be.defined;
    	expect($route.routes['/signin'].controller).to.equal('AuthController');
    	expect($route.routes['/signin'].templateUrl).to.equal('app/auth/signin.html');
    });
    it('Should have /AdminHome route, template, and controller', function () {
    	expect($route.routes['/AdminHome']).to.be.defined;
    	expect($route.routes['/AdminHome'].controller).to.equal('AdminController');
    	expect($route.routes['/AdminHome'].templateUrl).to.equal('app/Admin/AdminHome.html');
    });



})