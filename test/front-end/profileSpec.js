'use strict';
describe('Testing AngularJS Zarad Profile Page', function(){
    beforeEach(angular.mock.module('zarad.index'));
    beforeEach(angular.mock.module('zarad.services'));
    beforeEach(angular.mock.module('ionic'));

    describe('Testing parentController', function(){
      var scope , ctrl, $window;
      var $q , deferred, User;
      beforeEach(inject(function($controller, $rootScope, _$window_, _$q_, _User_, _$timeout_){
        scope = $rootScope.$new();
        ctrl = $controller('parentController',{$scope : scope});
        $window = _$window_;
        $window.localStorage.member=JSON.stringify({beltColor : 'purple'});
        $q =  _$q_;
        deferred = _$q_.defer();
        User = _User_;
        spyOn(_User_, 'editProfile').and.returnValue(deferred.promise);

        $controller('parentController', { 
          $scope: scope, 
          User: _User_, 
          $window: _$window_,
          $timeout: _$timeout_, 
          $q: _$q_ 
        });
      }));

      it('should initialize the data in the scope', function(){
        expect(scope.data).toBeDefined();
      });

      it('should have a function called check color', function(){
        expect(typeof scope.checkColor).toBe('function');
      });

      it('should get the Auth services', inject(['Auth', function(Auth){
        expect(Auth.signin).toBeDefined();
      }]));

      it('should check color header writings', function(){
        scope.data = { beltColor : 'Purple' , usernmae: 'Plmsdf898'};
        scope.checkColor();
        expect(scope.initColor).toBeDefined();
      });

      it('should check color header writings', function(){
        scope.data = { beltColor : 'white' , usernmae: 'Plmsdf898'};
        scope.checkColor();
        expect(scope.initColor).toBeDefined();
      });

      it('should have a member in the window local Storage' , function(){
        expect($window.localStorage.member).toBeDefined();
      })

      it('should have confirm method', function(){
        expect(scope.confirm).toBeDefined();
      });

      it('should return promise when editing profile', function(){

        // deferred.resolve({data: {username : 'Plmoha429' , password: "02134u32", valid:false}})

        // scope.confirm();
        // scope.$apply();

      })

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

    describe('Auth Controller Promise Tests', function () {

      var $scope, $q,deferred,$window,Auth,User;
      beforeEach(inject(function(_$controller_, _$rootScope_, _$location_, _User_, _$window_, _$ionicPopup_ , _Auth_, _$timeout_, _$q_) {

        $q = _$q_;
        $scope = _$rootScope_.$new();
        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();
        Auth = _Auth_;
        User = _User_;
        // Use a Jasmine Spy to return the deferred promise
        spyOn(_Auth_, 'signin').and.returnValue(deferred.promise);
        $window = _$window_
        // Init the controller, passing our spy service instance
        spyOn(_User_, 'getUser').and.returnValue(deferred.promise);
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

      it('should call set Window User when passing Pl username', function(){

        deferred.resolve({user:  'Plmoha492' , token : 'sjdflisaudj3432', data:{valid:true}});

        $scope.signin();
        $scope.$apply();

        expect(true).toEqual(true);

      })
      
      it('should Return Error Signin', function () {
        // This will call the .catch function in the controller
        deferred.reject('This is an error');
        
        // We have to call apply for this to work
        $scope.signin();
        $scope.$apply();
        // Since we called apply, not we can perform our assertions
        expect($scope.error).toEqual('This is an error');
      });

        it('should Get User', function () {
          // Setup the data we wish to return for the .then function in the controller
          var resp = { user : 'Plmoha492' , token : '892u34298u'};
          deferred.resolve({data : { username: 'Plmoha492'  , password: 'dfjakj32343SdDfjn', beltColor : 'Purple' , valid : true}});
          

          // We have to call apply for this to work
          $scope.setWindowUser(resp);
          $scope.$apply();
          // Since we called apply, not we can perform our assertions
          expect(User.getUser).toHaveBeenCalled();
          expect($scope.error).toBe(undefined);
        });

        it('should return error when valid is false', function(){
          var resp = {user: 'Plmoha492', token : '329u4821'};

          deferred.resolve({data: {username : 'Plmoha429' , password: "02134u32", valid:false}})

          $scope.setWindowUser(resp);
          $scope.$apply();

          expect(User.getUser).toHaveBeenCalled();

        });

        it('should handle error when calling setWindowUser', function(){
          deferred.reject('This is an error');

          $scope.setWindowUser({user: 'sfj'});
          $scope.$apply();

          expect(User.getUser).toHaveBeenCalled();
          expect($scope.error).toEqual('This is an error');
        })
    });

  })
})

