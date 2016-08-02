'use strict';

describe('AuthController',function(){
	var $scope, $location , $window , $httpBackend , $rootScope , createController , Auth ;

	beforeEach(module('zarad'));
	beforeEach(inject(function($injector) {
		
		$rootScope = $injector.get('$rootScope');
		$location= $injector.get('$location');
		$window = $injector.get('$window');
		$httpBackend = $injector.get('$httpBackend');
		Auth= $injector.get('Auth');
		$scope= $rootScope.$new();

		var $controller= $injector.get('$controller');

		createController = function(){
			return $controller('AuthController',{
				$scope: $scope,
				$window : $window,
				$location : $location,
				Auth: Auth
			});
		};
		createController();
	}));

	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
		//$window.localSorage.removeItem('com.zarad');
	});
	it('should have a signup method',function(){
		expect($scope.signup).to.be.a('function');
	});
});