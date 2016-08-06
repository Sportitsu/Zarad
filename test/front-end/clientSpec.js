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
	}));

	it('should have a signup method',function(){
		expect($scope.signup).to.be.a('function');
	});

	it("should have a signin metheod",function(){
		expect($scope.signin).to.be.a('function')
	});
	it('should have a user property on the $scope', function () {
		expect($scope.user).to.be.an('object')
	});

	xit('should store token in localStorage after signin',function(){
		var token = 'sjj232hwjhr3urw90rof';
	    $httpBackend.expectPOST('/api/user/signin').respond({token: token});
	    $scope.signin();
	    $httpBackend.flush();
	    expect($window.localStorage.getItem('com.zarad')).to.equal(token);
	})
});
