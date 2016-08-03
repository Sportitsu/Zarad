'use strict';

describe('AuthController',function(){
	var $scope, $rootScope, $window, $location ,$httpBackend , createController, Auth;
	beforeEach(module('zarad'))
	beforeEach(inject(function($injector){
		$rootScope=$injector.get('$rootScope');
		$httpBackend=$injector.get('$httpBackend');
		$window=$injector.get('$window');
		$location=$injector.get('$location');
		Auth=$injector.get('Auth');
		$scope=$rootScope.$new();

		var $controller=$injector.get('$controller');

		createController = function(){
			return $controller('AuthController',{
				$scope: $scope,
				$window: $window,
				$location : $location,
				Auth : Auth
			});
		};
		createController();
	}))
	it('should have a signup method',function(){
		expect($scope.signup).to.be.a('function');
	});

	it('should store token in local stoarge',function(){
		var token= 'sjj232hwjhr3urw90rof';
		$httpBackend.expectPOST('/api/user/signup').respond({token : token});
		$scope.signup();
		$httpBackend.flush();
		expect($window.localStorage.getItem('com.zarad')).to.equal(token)
	});

});