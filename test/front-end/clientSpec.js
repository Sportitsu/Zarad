'use strict';


describe('AuthController',function(){

	//var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth;
	var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth;
	beforeEach(module('zarad'));
	beforeEach(inject(function($injector){
        console.log($injector.get);
		// mock out our dependencies
	    $rootScope = $injector.get('$rootScope');
	    
	    $location = $injector.get('$location');
	    $window = $injector.get('$window');
	    $httpBackend = $injector.get('$httpBackend');
	    Auth = $injector.get('Auth');
	    $scope = $rootScope.$new();

	    var $controller = $injector.get('$controller');

	    createController = function () {
	      return $controller('AuthController', {
	        $scope: $scope,
	        $window: $window,
	        $location: $location,
	        Auth: Auth
	      });
	    };
	    createController();
  }));


	it('should have a signup method', function () {
    expect($scope.signup).to.be.a('function');
  });

	it('should have a signin method', function () {
    expect($scope.signin).to.be.a('function');
  });

})

describe('Autherization factory',function(){
	var Auth;
	beforeEach(module('zarad')); //load the app module before each test , actully angular mock allow us to load our angular modules to test
	beforeEach(inject(function(_Auth_){ // inject here is injecting a service
		console.log(_Auth_)
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

});

	


