'use strict';

describe('Admin Controller', function(){
	beforeEach(angular.mock.module('zarad.admin'));
	beforeEach(angular.mock.module('zarad.services'));
	beforeEach(angular.mock.module('ionic'));

	var $scope , $window , $q , deferred , Tournament,$location , Admin, Auth, Club, ionicPopupMock , ionicActionMock , ionicModalMock;

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

	    spyOn(_Admin_, 'signin').and.returnValue(deferred.promise);
	    spyOn(_Admin_, 'signout').and.returnValue(deferred.promise);
	    spyOn(_Admin_, 'getAdmins').and.returnValue(deferred.promise);
	    spyOn(_Club_, 'getClubs').and.returnValue(deferred.promise);
	    spyOn(_Tournament_, 'getAllTournament').and.returnValue(deferred.promise);
	    spyOn(_Tournament_, 'SearchAboutTournament').and.returnValue(deferred.promise);

	    $controller('AdminController', {
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

	it('should istantiate Admin controller', function(){
		expect($scope.admin).toBeDefined();
	});

	it('should have a signin Function in scope', function(){
		expect($scope.signin).toBeDefined();
	});

	it('sign in function should be able to work', function(){
		$scope.admin = { username :'rebootKamp' , password: '1234'}
		deferred.resolve({user : 'rebootKamp' , token : '21340u8jkdaf'});

		$scope.signin();
		$scope.$apply();

		expect($window.localStorage.getItem('admin')).toEqual('rebootKamp');
		expect(true).toBe(true);
	});


	it('should show popup when show popup function is called', function(){
    	var popup = spyOn(ionicPopupMock, 'show').and.callThrough().and.returnValue(deferred.promise);

        $scope.showPopup();
        expect(popup).toHaveBeenCalled();
        expect(true).toBe(true);
	});

	it('should be able to signout from admin', function(){
		$scope.signout();
		$scope.$apply();

		expect(Admin.signout).toHaveBeenCalled();
		expect(true).toEqual(true);
	});

	it('should be able to get All admins', function(){
		$scope.admins = { data : ''};
		deferred.resolve({ username : 'Mihyar'});

		$scope.getAdmins();
		$scope.$apply();

		expect($scope.admins.data.username).toBe('Mihyar');
	});


	it('should be able to get All Clubs', function(){
		$scope.clubs = { data : ''};
		deferred.resolve([{username :'e7em'},{username : 'testme'}]);

		$scope.getClubs();
		$scope.$apply();

		expect(Club.getClubs).toHaveBeenCalled();
	})


	it('should be able to get All Clubs', function(){
		$scope.tournaments = { data : ''};
		deferred.resolve([{username :'e7em'},{username : 'testme'}]);

		$scope.getTournaments();
		$scope.$apply();

		expect(Tournament.getAllTournament).toHaveBeenCalled();
	});

	it('should be able to search tournaments', function(){
		$scope.tournament = {};
		deferred.resolve({data : {name : 'test', place : 'Jordano'}});

		$scope.SearchAboutTournament();
		$scope.$apply();

		expect(Tournament.SearchAboutTournament).toHaveBeenCalled();
	});


	it('should be able to Catch error from search function tournaments', function(){
		$scope.tournament = {};
		deferred.reject();

		$scope.SearchAboutTournament();
		$scope.$apply();

		expect(Tournament.SearchAboutTournament).toHaveBeenCalled();
	});


	it('should show popup when show popup function is called', function(){
    	var popup = spyOn(ionicPopupMock, 'show').and.callThrough().and.returnValue(deferred.promise);

        $scope.deleteAdmin();
        expect(popup).toHaveBeenCalled();
        expect(true).toBe(true);
	});


	it('should show popup when registering admin popup function is called', function(){
    	var popup = spyOn(ionicPopupMock, 'show').and.callThrough().and.returnValue(deferred.promise);

        $scope.registerAdmin();
        expect(popup).toHaveBeenCalled();
        expect(true).toBe(true);
	});


	it('should show popup when Removing Club popup function is called', function(){
    	var popup = spyOn(ionicPopupMock, 'show').and.callThrough().and.returnValue(deferred.promise);

        $scope.removeClub();
        expect(popup).toHaveBeenCalled();
        expect(true).toBe(true);
	});



	it('should show popup when Adding Club popup function is called', function(){
    	var popup = spyOn(ionicPopupMock, 'show').and.callThrough().and.returnValue(deferred.promise);

        $scope.Addclub();
        expect(popup).toHaveBeenCalled();
        expect(true).toBe(true);
	});


	it('should show popup when Adding Tournament popup function is called', function(){
    	var popup = spyOn(ionicPopupMock, 'show').and.callThrough().and.returnValue(deferred.promise);

        $scope.addTournament();
        expect(popup).toHaveBeenCalled();
        expect(true).toBe(true);
	});



	it('should show popup when Removing Tournament popup function is called', function(){
    	var popup = spyOn(ionicPopupMock, 'show').and.callThrough().and.returnValue(deferred.promise);

        $scope.removeTournament();
        expect(popup).toHaveBeenCalled();
        expect(true).toBe(true);
	});


	it('should show popup when Editing Tournament popup function is called', function(){
    	var popup = spyOn(ionicPopupMock, 'show').and.callThrough().and.returnValue(deferred.promise);

        $scope.editTournament();
        expect(popup).toHaveBeenCalled();
        expect(true).toBe(true);
	});

})