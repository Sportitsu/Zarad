describe('Controller: ListLibrariesController', function() {
  var scope, restService, $location;
});
var mockRestService = {};
beforeEach(function() {
  var mockRestService = {};
  module('zarad', function($provide) {
    $provide.value('restService', mockRestService);
  });

  inject(function($q) {
    mockRestService.data = [
      {
        username: 0,
        password:"2222",
        country:"jordan",
        clubName: 'Angular'
      },
      {
       username: 1,
        password:"1111",
        country:"jordan",
        clubName: 'Angular2'
      }
    ];

    mockRestService.getAll = function() {
      var defer = $q.defer();

      defer.resolve(this.data);

      return defer.promise;
    };

    mockRestService.Addclub = function(password,country,clubName) {
      var defer = $q.defer();

      var id = this.data.length;

      var club = {
        username: 1,
        password:"1111",
        country:password,
        clubName: clubName
      };

      this.data.push(item);
      defer.resolve(item);

      return defer.promise;
    };
  });
});











////////////////////////////

'use strict';
describe('AdminController',function(){
	var  $scope, $rootScope, $window,$location,Admin,createController,$httpBackend;
	beforeEach(module('zarad'))
	beforeEach(inject(function($injector){
       
		$rootScope=$injector.get('$rootScope');
		$window=$injector.get('$window');
		$location=$injector.get('$location');
		$httpBackend=$injector.get('$httpBackend')
		Admin=$injector.get('Admin');
		$scope=$rootScope.$new();
		
		var $controller=$injector.get('$controller');
        
		createController = function(){
			return $controller('AdminController',{
				$scope: $scope,
				$window: $window,
				$location : $location,
				Admin : Admin
			});
		};
		createController();
	}));

	afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
     });
	//test if the function in the scope
	it('should have a Addclub method',function(){
		expect($scope.Addclub).to.be.a('function');
	});
	it('should have a Addtournament method',function(){
		expect($scope.Addtournament).to.be.a('function');
	});
	it('should have a Adminsignin method',function(){
		expect($scope.Adminsignin).to.be.a('function');
	});
	//test if the property in  scope
	it('should have a club property on the $scope', function () {
		expect($scope.club).to.be.an('object');
	});
	it('should have a user property on the $scope', function () {
		expect($scope.user).to.be.an('object');
	});
	it('should have a tournament property on the $scope', function () {
		expect($scope.tournament).to.be.an('object');
	});
	// test if thier is areqest send to server // here we use fake reqest
	it('should be able to create new Club with Addclub()', function () {
		$httpBackend.expectPOST("/api/clubregister").respond(201, '');
    	$scope.Addclub();
    	$httpBackend.flush();
	});
	it('should be able to create new admin with Adminsignin()', function () {
		$httpBackend.expectPOST("/api/admin/signin").respond(201, '');
    	$scope.Adminsignin();
    	$httpBackend.flush();
	});
	//this must be fill  be fill 
	it('should be able to create new tournament with Addtournament()', function () {
		$httpBackend.expectPOST('').respond(201, '');
    	$scope.Addtournament();
    	$httpBackend.flush();
	});
	

})
















/*angular.module('MyAppMocks',[]).
  factory('Admin', function(){
    return {
      //search: sinon.stub()
      Addclub: sinon.stub(),
      Addtournament:sinon.stub()
  };

  });*/




/*describe('Adminfactories:Admin', function () {
  // Load your module.
  var scope, Admin, controllerFactory, spy;

  function createController() {
    return controllerFactory('Admin', {
      $scope: scope,
      Admin: Admin
    });
  }
  beforeEach(module('zarad'));

  beforeEach(module('MyAppMocks'));
  beforeEach(inject(function($controller, $rootScope, _Admin_){
    scope = $rootScope.$new();

    Admin = _Admin_;

    controllerFactory = $controller;

  }));

it('should call Admin.Addclub', function(){
    createController();
    expect(Admin.Addclub).to.have.been.called();
  });

  // Setup the mock service in an anonymous module.
 
 
  
});*/
