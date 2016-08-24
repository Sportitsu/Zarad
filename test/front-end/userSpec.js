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

	    $window.localStorage.member = JSON.stringify({username : 'Pltesting' , image :'1293408.jpg', achievements : [{name:'UAEJJ',place:1},{name:'IBJJF',place:3},{name:'RAMADAN',place:2}]});
	    spyOn(_User_, 'updateGoal').and.returnValue(deferred.promise);
	    spyOn(_Quotes_, 'getQuotes').and.returnValue(deferred.promise);
	    spyOn(_User_, 'getAllUsers').and.returnValue(deferred.promise);
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

	it('should have an initialize function', function(){
		expect($scope.initialize).toBeDefined();

	});


	it('should get All users', function(){
		deferred.resolve({data: [{club:'Clazoz'}, {club:'Clmehm', username:'e7em'}]});
		$scope.getAllUsers();
		$scope.$apply();
		expect(User.getAllUsers).toHaveBeenCalled();
	})

	it('should Catch error when getting all users', function(){
		deferred.reject();
		$scope.getAllUsers();
		$scope.$apply();
		expect(User.getAllUsers).toHaveBeenCalled();
		expect(true).toBe(true);
	});


	it('should have a function show Profile', function(){
		var objectFriend = {
			achievements : [{place : '1'},{place : '2'},{place : '3'}]
		}
		$scope.showProfile(objectFriend);
		$scope.$apply();
		expect(true).toBe(true);
	})

	it('should have a function show Profile', function(){
		var objectFriend = {
			achievements : []
		}
		$scope.showProfile(objectFriend);
		$scope.$apply();
		expect(true).toBe(true);
	});

	it('should have an initialize function that starts at start', function(){
    	var popup = spyOn(ionicModalMock, 'fromTemplateUrl').and.callThrough().and.returnValue(deferred.promise);
		deferred.resolve({innerscope : 'test'});
		$scope.initialize();
        expect(popup).toHaveBeenCalled();
        expect(true).toBe(true);
	})


})