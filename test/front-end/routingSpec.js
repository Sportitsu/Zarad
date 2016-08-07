'use strict'
describe('Routing',function(){
    var $route;
    beforeEach(module('zarad'));
    beforeEach(inject(function($injector){
        $route=$injector.get("$route");
    }));
    it('Should have / route, template, and controller', function () {
        expect($route.routes['/']).to.be.defined;
        expect($route.routes['/'].controller).to.equal('AuthController');
        expect($route.routes['/'].templateUrl).to.equal('app/auth/home.html');
    });
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
    it('Should have /AdminMain route, template, and controller', function () {
        expect($route.routes['/AdminMain']).to.be.defined;
        expect($route.routes['/AdminMain'].controller).to.equal('AdminController');
        expect($route.routes['/AdminMain'].templateUrl).to.equal('app/Admin/AdminMain.html');
    });
    it('Should have /AdminAction route, template, and controller', function () {
        expect($route.routes['/AdminAction']).to.be.defined;
        expect($route.routes['/AdminAction'].controller).to.equal('AdminController');
        expect($route.routes['/AdminAction'].templateUrl).to.equal('app/Admin/AdminAction.html');
    });
    it('Should have /AdminSignin route, template, and controller', function () {
        expect($route.routes['/AdminSignin']).to.be.defined;
        expect($route.routes['/AdminSignin'].controller).to.equal('AdminController');
        expect($route.routes['/AdminSignin'].templateUrl).to.equal('/app/Admin/AdminSignin.html');
    });
    it('Should have /AdminSignup route, template, and controller', function () {
        expect($route.routes['/AdminSignup']).to.be.defined;
        expect($route.routes['/AdminSignup'].controller).to.equal('AdminController');
        expect($route.routes['/AdminSignup'].templateUrl).to.equal('/app/Admin/AdminSignup.html');
    });
    
    it('Should have /AddClub route, template, and controller', function () {
        expect($route.routes['/AddClub']).to.be.defined;
        expect($route.routes['/AddClub'].controller).to.equal('AdminController');
        expect($route.routes['/AddClub'].templateUrl).to.equal('/app/Admin/AddClub.html');
    });
    
    it('Should have /AddTournment route, template, and controller', function () {
        expect($route.routes['/AddTournment']).to.be.defined;
        expect($route.routes['/AddTournment'].controller).to.equal('AdminController');
        expect($route.routes['/AddTournment'].templateUrl).to.equal('/app/Admin/AddTournment.html');
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