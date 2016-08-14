// TOD
describe('Profile index',function(){
  var baseUrl = 'http://zarad.herokuapp.com';
  var  $scope, $rootScope, $window,$location,club,createController,$httpBackend;
  beforeEach(module('zarad'))
  beforeEach(inject(function($injector){
       
    $rootScope=$injector.get('$rootScope');
    $window=$injector.get('$window');
    $location=$injector.get('$location');
    $httpBackend=$injector.get('$httpBackend')
    club=$injector.get('club');
    $scope=$rootScope.$new();
    
    var $controller=$injector.get('$controller');
        
    createController = function(){
      return $controller('parentController',{
        $scope: $scope,
        $window: $window,
        $location : $location,
        club : club
      });
    };

       createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
     });
  

  it('should have a AddUser method',function(){
    expect($scope.AddUser).to.be.a('function');
  });

});