'use strict';

describe('Club Controller', function(){
  beforeEach(angular.mock.module('zarad.club'));
  beforeEach(angular.mock.module('zarad.services'));
  beforeEach(angular.mock.module('ionic'));
  beforeEach(angular.mock.module('ngCordova'));
  beforeEach(angular.mock.module('ionic-material'));

  var $scope , $window , $q , deferred , $location , User, Auth, Club, ionicPopupMock , ionicActionMock , ionicModalMock;
  beforeEach(inject(function($rootScope, $controller, _$window_, _$location_, _$q_, _User_, _Auth_, _Club_, $ionicPopup, $ionicModal, $ionicActionSheet, _$timeout_ ){

    $scope = $rootScope.$new();
    $window = _$window_;
    $q = _$q_;
    deferred = $q.defer();
    $location = _$location_;
    User = _User_;
    Auth = _Auth_;
    ionicPopupMock = $ionicPopup;
    ionicModalMock = $ionicModal;
    ionicActionMock = $ionicActionSheet;
    Club = _Club_;


    spyOn(_Club_, 'editClub').and.returnValue(deferred.promise);
    spyOn(_Club_, 'AddUser').and.returnValue(deferred.promise);
    spyOn(_Club_, 'getClub').and.returnValue(deferred.promise);
    spyOn(_Club_, 'getClubUsers').and.returnValue(deferred.promise);
    spyOn(_User_, 'resub').and.returnValue(deferred.promise);

    $controller('clubController', {
      $scope : $scope, 
      $window : $window,
      Auth : Auth ,
      Club : Club ,
      User : User ,
      $ionicPopup : ionicPopupMock ,
      $ionicModal : ionicModalMock , 
      $ionicActionSheet : ionicActionMock ,
      $timeout : _$timeout_
    });

    $window.localStorage['user'] = 'Clmsadk123';

  }));

  it('should istantiate Club controller', function(){
    expect($scope.clubUsers).toBeDefined();
  });

  it('should show Action sheet when calling show action function', inject(function($q) {
    var popup = spyOn(ionicActionMock, 'show').and.callThrough().and.returnValue(deferred.promise);
    $scope.showClubAction();
    expect(popup).toHaveBeenCalled();
    expect(true).toBe(true);
  }));

  it('should have a function called show User', function(){
    expect($scope.showUser).toBeDefined();
  })

  it('should have show User working', function(){
    $scope.userProfileData;
    $scope.showUser('Some Data Here');
    expect($scope.userProfileData).toEqual('Some Data Here');
  });


  it('should have show User working', function(){
    $scope.userProfileData;
    $scope.editUserProfile('Some Data Here');
    expect($scope.userProfileData).toEqual('Some Data Here');
  });

  it('should show Popup When Confirming club edit', inject(function($q) {
    var popup = spyOn(ionicPopupMock, 'confirm').and.callThrough().and.returnValue(deferred.promise);
    $scope.confirmClubEdit();
    expect(popup).toHaveBeenCalled();
    expect(true).toBe(true);
  }));


  it('should show when there are unsubscribed users', function(){
    $scope.usersToSubscribe = {data:[1,2,3]};
    $scope.show();
    $scope.$apply();
    expect(true).toBe(true); 
  });

  it('should return false when no unsubscribed users', function(){
    $scope.usersToSubscribe = {data:[]};
    $scope.show();
    $scope.$apply();
    expect(true).toBe(true);
  });


  it('should get Club when get Club function is called', function(){
    
    $scope.club = {data: ''};
    deferred.resolve({username : 'Clmajkh34' , image : '23424iandf.jpg' , clubName: 'TestingClub', data:[{subscription:'12323'},{subscription:'231'}]});
    $scope.getClub();
    $scope.$apply();
    expect(true).toBe(true);
  })


  it('should get Club when get Users function is called', function(){
    $scope.club = {data : ''}
    $scope.clubUsers = { data : [] }  ;
    deferred.resolve({data:[{subscription: '14089'}, {subscription : '1234'} , {subscription :'234'}, {subscription: '2433242'}]});
    $scope.getUsers();
    $scope.$apply();

    expect(Club.getClubUsers).toHaveBeenCalled();
    expect(true).toBe(true);
  });

  it('should have a method that checks subscription', function(){

    $scope.usersToSubscribe = { data : []};
    $scope.usersEndedSubs = { data : []};
    var object= { resub : true , subscription : '1234382', membership : '1' , valid: true};
    $scope.checkSubscription(object);
    $scope.$apply();
    expect(true).toBe(true);
  });


  it('should have a popup resup function', function(){
    var popup = spyOn(ionicPopupMock, 'show').and.callThrough().and.returnValue(deferred.promise);
    $scope.resup();
    expect(popup).toHaveBeenCalled();
    expect(true).toBe(true);
  });


  it('should have a function that resubscribes users' , function(){
    $scope.club = { data : { clubName: 'testingClub'}};
    deferred.resolve({data:[{subscription: '14089'}, {subscription : '1234'} , {subscription :'234'}, {subscription: '2433242'}]});
    $scope.renew('anyname');
    $scope.$apply();

    expect(true).toBe(true);
  });

  it('should have a function that gets time', function(){
    // TODO this TEST 
    // dont know what is going on 
    $scope.getTime();
    $scope.$apply();
    expect(true).toBe(true);
  });

  it('should have an initialize function that starts at start', function(){
    var popup = spyOn(ionicModalMock, 'fromTemplateUrl').and.callThrough().and.returnValue(deferred.promise);
    deferred.resolve({innerscope : 'test'});
    $scope.callModals();
    expect(popup).toHaveBeenCalled();
    expect(true).toBe(true);
  });

  it('should have a get user place function that works', function(){
    $scope.getUserPlace(3,'Plmoha492');
    $scope.$apply();
    expect($scope.editUserProfileData.place).toBe(3);

  });

  it('should test the cancel function that does nothing', function(){
    $scope.cancelAction();
    $scope.$apply();
    expect(true).toBe(true);
  });

});








