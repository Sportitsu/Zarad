'use strict';

describe('AuthController',function(){
<<<<<<< HEAD
	//var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth;
	var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth;
	beforeEach(module('zarad'));
	beforeEach(inject(function($injector){
        console.log($injector.get);
		// mock out our dependencies
	    $rootScope = $injector.get('$rootScope');
	    //console.log("asaadsdsddsd",$rootScope)
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
=======
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
>>>>>>> ce19a72ca44eb375feb47de79e87cf9d8307eba9
