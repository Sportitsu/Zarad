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
  xit('should have a Addclub method',function(){
    expect($scope.Addclub).to.be.a('function');
  });
  

  it('should have a Addtournament method',function(){
    expect($scope.Addtournament).to.be.a('function');
  });
  it('should have a signup method ',function(){
    expect($scope.signup).to.be.a('function');
  });
  it('should have a signin method ',function(){
    expect($scope.signin).to.be.a('function');
  });
  //test if the property in  scope
  it('should have a club property on the $scope', function () {
    expect($scope.club).to.be.an('object');
  });
  it('should have a user property on the $scope', function () {
    expect($scope.user).to.be.an('object');
  });
  it('should have a admin property on the $scope', function () {
    expect($scope.admin).to.be.an('object');
  });
  it('should have a tournament property on the $scope', function () {
    expect($scope.tournament).to.be.an('object');
  });
  // test if thier is areqest send to server // here we use fake reqest
  xit('should be able to create new Club with Addclub()', function () {
    $httpBackend.expectPOST("/api/club/register").respond(201, '');
      $scope.Addclub();
      $httpBackend.flush();
  });
  it('should be able to create new admin with signup()', function () {
    $httpBackend.expectPOST("/api/admin/create").respond(201, '');
      $scope.signup();
      $httpBackend.flush();
  });

  it('should be able  signin admin with signin()', function () {
    var token = 'sjj232hwjhr3urw90rof';
    $httpBackend.expectPOST("/api/admin/signin").respond({token:token});
      $scope.signin();
      $httpBackend.flush();
  });
  //this must be fill  be fill 
  it('should be able to create new tournament with Addtournament()', function () {
    $httpBackend.expectPOST('/api/tournament/create').respond(201, '');
      $scope.Addtournament();
      $httpBackend.flush();
  });
  

})