'use strict';

describe('AuthController',function(){
	//var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth;
	var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth;
	beforeEach(function (){module('zarad')});
	beforeEach(inject(function($injector){

		// mock out our dependencies
	    //$rootScope = $injector.get('$rootScope');
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