'use strict';
describe('Testing AngularJS Zarad Profile Page', function(){

    beforeEach(angular.mock.module('zarad.index'));
    beforeEach(angular.mock.module('zarad.services'));
    beforeEach(angular.mock.module('ionic'));

    describe('Testing parentController', function(){
      var scope , ctrl, $window;

      beforeEach(inject(function($controller, $rootScope, _$window_){
        scope = $rootScope.$new();
        ctrl = $controller('parentController',{$scope : scope});
        $window = _$window_;
      }));

      it('should initialize the data in the scope', function(){
        expect(scope.data).toBeDefined();
      });

      it('should have a function called check color', function(){
        expect(typeof scope.checkColor).toBe('function');
      });

      it('should get the Auth services', inject(['Auth', function(Auth){
        expect(Auth.signin).toBeDefined();
      }]))

    });
});

describe('JS Login Page', function(){
  beforeEach(angular.mock.module('zarad.auth'));
  beforeEach(angular.mock.module('zarad.services'));
  beforeEach(angular.mock.module('ionic'));
  describe('Auth Controller', function(){
    var scope , ctrl, mockWindow, mockPopup;
    var originalTimeout;
    beforeEach(inject(function($controller, $rootScope, _$window_, $ionicPopup){
      scope = $rootScope.$new();
      ctrl = $controller('AuthController', {$scope:scope});
      mockWindow = _$window_;
      mockPopup=$ionicPopup;
      // jasmine.getEnv().defaultTimeoutInterval = 2000;// e.g. 15000 milliseconds
     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    }));

    afterEach(function(){
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })

    it('should have a signin function', function(){
      expect(scope.signin).toBeDefined();
      expect(typeof scope.signin).toBe('function');
    });


    it('should have a user in the scope', function(){
      expect(scope.user).toBeDefined();
    })

    it('should have a function called showPopup', function(){
      expect(scope.showPopup).toBeDefined();
      expect(typeof scope.showPopup).toBe('function');
    });

    describe('Testing a Controller that uses a Promise', function () {

      var $scope;
      var $q;
      var deferred;
      var $window;
      var Auth;
      beforeEach(inject(function(_$controller_, _$rootScope_, _$location_, _User_, _$window_, _$ionicPopup_ , _Auth_, _$timeout_, _$q_) {

        $q = _$q_;
        $scope = _$rootScope_.$new();
        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();
        Auth = _Auth_;
        // Use a Jasmine Spy to return the deferred promise
        spyOn(_Auth_, 'signin').and.returnValue(deferred.promise);
        $window = _$window_
        // Init the controller, passing our spy service instance

        _$controller_('AuthController', { 
          $scope: $scope, 
          Auth: _Auth_,
          $location: _$location_, 
          User: _User_, 
          $window: _$window_,
          $timeout: _$timeout_, 
          $q: _$q_ 
        });
      }));

      it('should resolve promise', function () {
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve({ user: 'Clmoha492'  , token: 'dfjakj32343SdDfjn' });
        
        // We have to call apply for this to work
        $scope.signin();
        $scope.$apply();
        // Since we called apply, not we can perform our assertions
        expect(Auth.signin).toHaveBeenCalled();
        expect($scope.error).toBe(undefined);
      });
      
      // it('should reject promise', function () {
      //   // This will call the .catch function in the controller
      //   deferred.reject();
        
      //   // We have to call apply for this to work
      //   $scope.signin();
      //   $scope.$apply();
      //   // Since we called apply, not we can perform our assertions
      //   expect($scope.myMethod).toBe(true);
      //   expect($scope.error).toBeDefined();
      // });
    });

  })
})

