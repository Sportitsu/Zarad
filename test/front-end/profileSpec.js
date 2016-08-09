

'use strict';
describe('profileController',function(){
  var  $scope, $rootScope, $window,$location,Profile,createController,$httpBackend;
  beforeEach(module('zarad'))
  beforeEach(inject(function($injector){
       
    $rootScope=$injector.get('$rootScope');
    $window=$injector.get('$window');
    $location=$injector.get('$location');
    $httpBackend=$injector.get('$httpBackend')
    Profile=$injector.get('Profile');
    $scope=$rootScope.$new();
    
    var $controller=$injector.get('$controller');
        
    createController = function(){
      return $controller('profileController',{
        $scope: $scope,
        $window: $window,
        $location : $location,
        Profile : Profile
      });
    };
    createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  
  
  //test if the property in  scope
  it('should have a club property on the $scope', function () {
    expect($scope.club).to.be.an('object');
  });
  it('should have a getClub method',function(){
    expect($scope.getClub).to.be.a('function');
  })
  xit('should be able to create new admin with signup()', function () {
    $httpBackend.expectPOST("/api/admin/create").respond(201, '');
      $scope.signup();
      $httpBackend.flush();
  });
  
})
