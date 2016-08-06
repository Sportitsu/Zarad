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
    it('Should have /adminhome route, template, and controller', function () {
    	expect($route.routes['/adminhome']).to.be.defined;
    	expect($route.routes['/adminhome'].controller).to.equal('AdminController');
    	expect($route.routes['/adminhome'].templateUrl).to.equal('app/admin/adminhome.html');
    });
    it('Should have /admin route, template, and controller', function () {
        expect($route.routes['/admin']).to.be.defined;
        expect($route.routes['/admin'].controller).to.equal('AdminController');
        expect($route.routes['/admin'].templateUrl).to.equal('app/admin/admin.html');
    });



})