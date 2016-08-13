describe('clubController',function(){
  var  $scope, $rootScope, $window,$location,club,createController,$httpBackend;
  beforeEach(module('zarad'))
  beforeEach(inject(function($injector){
       
    $rootScope=$injector.get('$rootScope');
    $window=$injector.get('$window');
    $location=$injector.get('$location');
    $httpBackend=$injector.get('$httpBackend')
    club=$injector.get('Club');
    $scope=$rootScope.$new();
    
    var $controller=$injector.get('$controller');
        
    createController = function(){
      return $controller('clubController',{
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
  console.log($scope)
  it('should have a AddUser method',function(){
    expect($scope.AddUser).to.be.a('function');
  });
  it('should be able to create new AddUser with AddUser()', function () {
    $httpBackend.expectPOST("http://zarad.herokuapp.com/api/club/register").respond(201, '');
    //$httpBackend.whenGET('/api/user/signup').respond({status: 200});
      club.AddUser();
      $httpBackend.flush();
      expect(res.status).toEqual(201);
  });
  })