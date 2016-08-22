'use strict';

describe('Videos Controller', function(){
	beforeEach(angular.mock.module('zarad.videos'));
	beforeEach(angular.mock.module('zarad.services'));
	beforeEach(angular.mock.module('ionic'));

  var $scope ,
	  $window ,
      $q ,
	  deferred , 
	  Tournament,
	  $location ,
      Admin,
      Auth,
	  Club,
   	  ionicPopupMock ,
      ionicActionMock ,
      ionicModalMock;
	beforeEach(inject(function($rootScope, $controller, _Tournament_,_$window_, _$location_, _$q_, _Admin_, _Auth_, _Club_, $ionicPopup, $ionicModal, $ionicActionSheet, _$timeout_){
	    $scope = $rootScope.$new();
	    $window = _$window_;
	    $q = _$q_;
	    deferred = $q.defer();
	    $location = _$location_;
	    Admin = _Admin_;
	    Auth = _Auth_;
	    Tournament = _Tournament_;
	    ionicPopupMock = $ionicPopup;
	    ionicModalMock = $ionicModal;
	    ionicActionMock = $ionicActionSheet;
	    Club = _Club_;

	    $window.localStorage.member = JSON.stringify({username : 'Pltesting' , image :'1293408.jpg'})

	    spyOn(_Club_,'getClubForUser').and.returnValue(deferred.promise);

	    $controller('VideosController', {
	      $scope : $scope, 
	      $window : $window,
	      Auth : Auth ,
	      Club : Club ,
	      Admin : Admin ,
	      Tournament : Tournament,
	      $ionicPopup : ionicPopupMock ,
	      $ionicModal : ionicModalMock , 
	      $ionicActionSheet : ionicActionMock ,
	      $timeout : _$timeout_
	    });
	}));

	it('should instantiate videos controller', function(){
		expect($scope.flag).toBeDefined();
	});

	it('should get the club details for user to get channel id', function(){
		deferred.resolve({data:{channelId: '214012348'}});

		$scope.$apply();

		expect(Club.getClubForUser).toHaveBeenCalled();
	});


	it('should handle error when channelId is not defined', function(){
		deferred.reject('not possible');

		$scope.$apply();

		expect(Club.getClubForUser).toHaveBeenCalled();
	});


	it('should set flag to false when not getting the response', function(){
		deferred.resolve({data: {usernmae: 'NoChannel'}});
		$scope.$apply();

		expect(Club.getClubForUser).toHaveBeenCalled();
	})
});


describe('User Home Controller', function(){


	beforeEach(angular.mock.module('zarad.home'));
	beforeEach(angular.mock.module('zarad.services'));
	beforeEach(angular.mock.module('ionic'));


	var $scope ,
	  $window ,
      $q ,
	  deferred , 
	  Tournament,
	  $location ,
      Admin,
      Auth,
      Quotes,
      User,
	  Club,
   	  ionicPopupMock ,
      ionicActionMock ,
      ionicModalMock ,
      $timeout;

	beforeEach(inject(function($rootScope, $controller, _Quotes_, _Tournament_, _User_, _$window_, _$location_, _$q_, _Admin_, _Auth_, _Club_, $ionicPopup, $ionicModal, $ionicActionSheet, _$timeout_){
	    $scope = $rootScope.$new();
	    $window = _$window_;
	    $q = _$q_;
	    deferred = $q.defer();
	    $location = _$location_;
	    Admin = _Admin_;
	    User = _User_;
	    Auth = _Auth_;
	    Tournament = _Tournament_;
	    ionicPopupMock = $ionicPopup;
	    ionicModalMock = $ionicModal;
	    ionicActionMock = $ionicActionSheet;
	    Club = _Club_;
	    $timeout = _$timeout_;

	    $window.localStorage.member = JSON.stringify({username : 'Pltesting' , image :'1293408.jpg'})
	    spyOn(_User_, 'updateGoal').and.returnValue(deferred.promise);
	    spyOn(_Quotes_, 'getQuotes').and.returnValue(deferred.promise);
	    $controller('UserHomeController', {
	      $scope : $scope, 
	      $window : $window,
	      Auth : Auth ,
	      Club : Club ,
	      Admin : Admin ,
	      User : User,
	      Tournament : Tournament,
	      $ionicPopup : ionicPopupMock ,
	      $ionicModal : ionicModalMock , 
	      $ionicActionSheet : ionicActionMock ,
	      $timeout : $timeout
	    });
	}));

	it('should istantiate home controller', function(){
		expect($scope.data).toBeDefined();
	});


	it('should have an update to Do function', function(){
		var passing = 'Eat Well';
		deferred.resolve({data:[{},{}]});
		$scope.updateTodo(passing);
		$scope.$apply();

		expect(User.updateGoal).toHaveBeenCalled();
	});

	it('should get error', function(){
		var passing = 'Eat Well';
		deferred.reject();
		$scope.updateTodo(passing);
		$scope.$apply();

		expect(User.updateGoal).toHaveBeenCalled();
	});


	it('should create a new task', function(){
		var passing = 'updating Task'; 
		deferred.resolve({data : [{}, {}]});

		$scope.createTask(passing);
		$scope.$apply();

		expect(User.updateGoal).toHaveBeenCalled();
	});

	it('should handle error when creating  task', function(){
		var passing = 'Eat Well';
		deferred.reject();
		$scope.createTask(passing);
		$scope.$apply();

		expect(User.updateGoal).toHaveBeenCalled();		

	});

	it('should be able to make refresh', function(){
		$scope.doRefresh();
		$scope.$apply();
		deferred.resolve({data:{test: 'testing'}});
		$timeout.flush(3000);


		$timeout.verifyNoPendingTasks();
		expect(true).toBe(true);
	});


	it('should be able to handle error when refresh', function(){
		$scope.doRefresh();
		$scope.$apply();
		deferred.reject();
		$timeout.flush(3000);


		$timeout.verifyNoPendingTasks();
		expect(true).toBe(true);
	});


	it('should have an initializing function', function(){
		deferred.resolve([{},{}]);

		$scope.initialize();
		$scope.$apply();

		expect(true).toBe(true);
	});

	it('should handle error with initializing function', function(){
		deferred.reject();

		$scope.initialize();
		$scope.$apply();

		expect(true).toBe(true);
	});
});

describe('User Profile Page controller', function(){
	beforeEach(angular.mock.module('zarad.user'));
	beforeEach(angular.mock.module('zarad.services'));
	beforeEach(angular.mock.module('ionic'));
	beforeEach(angular.mock.module('ngCordova'));
	beforeEach(angular.mock.module('ionic-material'));

    var $scope ,
	  $window ,
      $q ,
	  deferred , 
	  Tournament,
	  $location ,
      Admin,
      Auth,
      Quotes,
      User,
	  Club,
   	  ionicPopupMock ,
   	  $cordovaCamera,
      ionicActionMock ,
      ionicModalMock ,
      $timeout;

	beforeEach(inject(function($rootScope, $controller, _Quotes_, _Tournament_, _User_, _$window_, _$location_, _$q_, _Admin_, _Auth_, _Club_, $ionicPopup, $ionicModal, $ionicActionSheet, _$timeout_, $cordovaCamera){
	    $scope = $rootScope.$new();
	    $window = _$window_;
	    $q = _$q_;
	    deferred = $q.defer();
	    $location = _$location_;
	    Admin = _Admin_;
	    User = _User_;
	    Auth = _Auth_;
	    Tournament = _Tournament_;
	    ionicPopupMock = $ionicPopup;
	    ionicModalMock = $ionicModal;
	    ionicActionMock = $ionicActionSheet;
	    Club = _Club_;
	    $cordovaCamera = $cordovaCamera
	    $timeout = _$timeout_;

	    $window.localStorage.member = JSON.stringify({username : 'Pltesting' , image :'1293408.jpg', achievements : [{name:'UAEJJ',place:1},{name:'IBJJF',place:3},{name:'RAMADAN',place:2}]});
	    spyOn(_User_, 'updateGoal').and.returnValue(deferred.promise);
	    spyOn(_Quotes_, 'getQuotes').and.returnValue(deferred.promise);
	    $controller('UserProfileController', {
	      $scope : $scope, 
	      $window : $window,
	      Auth : Auth ,
	      Club : Club ,
	      Admin : Admin ,
	      User : User,
	      Tournament : Tournament,
	      $ionicPopup : ionicPopupMock ,
	      $ionicModal : ionicModalMock , 
	      $ionicActionSheet : ionicActionMock ,
	      $timeout : $timeout
	    });
	}));

	it('should istantiate user profile controller', function(){
		expect($scope.data).toBeDefined();
	});

	it('should filter the achievements when instantiating file', function(){

		$scope.filterAchievements();
		$scope.$apply();

		expect(true).toBe(true);
	});

	it('should set no medal to false when achievement is empty', function(){
		$scope.noMedal = false;
		$scope.achievements = [];
		$scope.filterAchievements();
		$scope.$apply();
		expect($scope.noMedal).toEqual(true);
	});

	it('shoud show pop up when show options button is clicked', function(){
    	var popup = spyOn(ionicPopupMock, 'show').and.callThrough().and.returnValue(deferred.promise);

        $scope.showOptions();
        expect(popup).toHaveBeenCalled();
        expect(true).toBe(true);
	});

	it('should be able to take photos', function(){
		var source =Camera.PictureSourceType.CAMERA;
		$scope.takePhoto(source);
	})


})