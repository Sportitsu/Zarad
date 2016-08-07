
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
	xit('should have a Adminsignin method',function(){
		expect($scope.Adminsignin).to.be.a('function');
	});
	//test if the property in  scope
	it('should have a club property on the $scope', function () {
		expect($scope.club).to.be.an('object');
	});
	xit('should have a user property on the $scope', function () {
		expect($scope.user).to.be.an('object');
	});
	it('should have a tournament property on the $scope', function () {
		expect($scope.tournament).to.be.an('object');
	});
	// test if thier is areqest send to server // here we use fake reqest
	it('should be able to create new Club with Addclub()', function () {
		$httpBackend.expectPOST("/api/club/register").respond(201, '');
    	$scope.Addclub();
    	$httpBackend.flush();
	});
	xit('should be able to create new admin with Adminsignin()', function () {
		$httpBackend.expectPOST("/api/admin/signin").respond(201, '');
    	$scope.Adminsignin();
    	$httpBackend.flush();
	});
	//this must be fill  be fill 
	it('should be able to create new tournament with Addtournament()', function () {
		$httpBackend.expectPOST('/api/tournament/create').respond(201, '');
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
 
 
  
});


describe('Controller: AdminController', function() {
  var scope, AdminController, $location;
  beforeEach(function() {
  var mockAdminController = {};
  module('zarad', function($provide) {
    $provide.value('AdminController', mockAdminController);
  });

  inject(function($q) {
    mockAdminController.data = [
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

    mockAdminController.getAll = function() {
      var defer = $q.defer();

      defer.resolve(this.data);

      return defer.promise;
    };

    mockAdminController.Addclub = function(password,country,clubName) {
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

beforeEach(inject(function($controller, $rootScope, _$location_, _AdminController_) {
  scope = $rootScope.$new();
  $location = _$location_;
  AdminController = _AdminController_;

  $controller('AdminController',
                {$scope: scope, $location: $location, AdminController: AdminController });

  scope.$digest();
}));

it('should contain all the club at startup', function() {
  expect(scope.club).to.equal([
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
      }]
  );
});


});

////
describe('Controller: AdminController', function() {
  var scope, Admin, $location;
  beforeEach(function() {
  var mockAdmin = {};
  module('zarad', function($provide) {
    $provide.value('Admin', mockAdmin);
  });

  inject(function($q) {
    mockAdmin.data = [
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

  
    mockAdmin.Addclub = function(password,country,clubName) {
      var defer = $q.defer();

      var id = this.data.length;

      var club = {
        username: id,
        password:"1111",
        country:password,
        clubName: clubName
      };

      this.data.push(club);
      defer.resolve(club);

      return defer.promise;
    };
  });
});

beforeEach(inject(function($controller, $rootScope, _$location_, Admin) {
  scope = $rootScope.$new();
  $location = _$location_;
  Admin = Admin;

  $controller('AdminController',{
    $scope: scope, 
    $location: $location,
    Admin: Admin 
  });

  scope.$digest();
}));

it('should contain all the club at startup', function() {
  expect(scope.club).to.equal([
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
      }]
  );
});


});
//////


describe('Controller: AdminController', function() {
  var scope, Admin, $location;
  beforeEach(function() {
  var mockAdmin = {};
  module('zarad', function($provide) {
    $provide.value('Admin', mockAdmin);
  });

  inject(function($q) {
    mockAdmin.data = [
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

  
    mockAdmin.Addclub = function(password,country,clubName) {
      var defer = $q.defer();

      var id = this.data.length;

      var club = {
        username: id,
        password:"1111",
        country:password,
        clubName: clubName
      };

      this.data.push(club);
      defer.resolve(club);

      return defer.promise;
    };
  });
});

beforeEach(inject(function($controller, $rootScope, _$location_, Admin) {
  scope = $rootScope.$new();
  $location = _$location_;
  Admin = Admin;

  $controller('AdminController',{
    $scope: scope, 
    $location: $location,
    Admin: Admin 
  });

  scope.$digest();
}));

it('should contain all the club at startup', function() {
  expect(scope.club).to.equal([
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
      }]
  );
});
it('should create new club and append it to the list', function() {
  // We simulate we entered a new library name
  scope.password = "Durandal";
  scope.country="223";
  scope.clubName="dass"
  // And that we clicked a button or something
  scope.Addclub();

  var lastclub = scope.club[scope.club.length - 1];

  expect(lastclub).to.equal({
    id: 2,
    country: '223',
    password : "Durandal",
    clubName:"dass"
  });
});


});






*/
