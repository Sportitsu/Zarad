'use strict';
describe('AdminController',function(){
  var  $scope, $rootScope, $window,$location,Admin,createController,$httpBackend,$state;
  beforeEach(module('zarad'))
  beforeEach(inject(function($injector){
       
    $rootScope=$injector.get('$rootScope');
    $window=$injector.get('$window');
    $location=$injector.get('$location');
    $httpBackend=$injector.get('$httpBackend')
    Admin=$injector.get('Admin');
    $state=$injector.get('$state');
    $scope=$rootScope.$new();
    
    var $controller=$injector.get('$controller');
        
    createController = function(){
      return $controller('AdminController',{
        $scope: $scope,
        $window: $window,
        $location : $location,
        Admin : Admin,
        $state:$state
      });
    };
    
    createController();
  }));

  afterEach(function () {
    // $httpBackend.flush();
    $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
     });

  //test if the function in the scope
  it('should have a Addclub method',function(){
    expect($scope.Addclub).to.be.a('function');
  });
  
  it('should have a addTournament method',function(){
    expect($scope.addTournament).to.be.a('function');
  });

  it('should have a signup method ',function(){
    expect($scope.registerAdmin).to.be.a('function');
    $httpBackend.expectGET('www/js/templates/AdminAction.html');
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
  it('should be able to create new Club with Addclub()', function () {
    $httpBackend.expectPOST("http://zarad.herokuapp.com/api/club/register").respond(500, '');
      $scope.Addclub();
  });

  it('should be able to create new admin with registerAdmin()', function () {
    $httpBackend.expectPOST("http://zarad.herokuapp.com/api/admin/create").respond(201);
    $scope.registerAdmin();
  });

  it('should be able  signin admin with signin()', function () {
    var token = 'sjj232hwjhr3urw90rof';
    $httpBackend.expectPOST("http://zarad.herokuapp.com/api/admin/signin").respond({token:token});
    $scope.signin();
  });

  //this must be fill  be fill 
  it('should be able to create new tournament with addTournament()', function () {
    $httpBackend.expectPOST('http://zarad.herokuapp.com/api/tournament/create').respond(201, '');
    $scope.addTournament();
  });

})