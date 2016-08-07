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
    it('Should have /club route, template, and controller', function () {
        expect($route.routes['/club']).to.be.defined;
        expect($route.routes['/club'].controller).to.equal('clubController');
        expect($route.routes['/club'].templateUrl).to.equal('app/club/club.html');
    });
    it('Should have /clubprofile route, template, and controller', function () {
        expect($route.routes['/clubprofile']).to.be.defined;
        expect($route.routes['/clubprofile'].controller).to.equal('profileController');
        expect($route.routes['/clubprofile'].templateUrl).to.equal('app/profile/clubprofile.html');
    });
     it('Should have /userprofile route, template, and controller', function () {
        expect($route.routes['/userprofile']).to.be.defined;
        expect($route.routes['/userprofile'].controller).to.equal('profileController');
        expect($route.routes['/userprofile'].templateUrl).to.equal('app/profile/userprofile.html');
    });



})