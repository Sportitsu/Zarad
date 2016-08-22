'use strict';
describe('Tournament Controller', function(){
	beforeEach(angular.mock.module('zarad.tournament'));
	beforeEach(angular.mock.module('zarad.services'));
	beforeEach(angular.mock.module('ionic'));

	var $scope, $window, $location , Tournament;
	var $q , deferred;
	beforeEach(inject(function($controller, $rootScope, _$window_, _$q_, _$location_, _Tournament_){
		$scope = $rootScope.$new();
		$window = _$window_; 
		$location = _$location_;
		$q = _$q_;
		deferred = $q.defer();
		Tournament = _Tournament_;

        spyOn(Tournament, 'getAllTournament').and.returnValue(deferred.promise);

		$controller('TournamentController',{
			$scope : $scope ,
			$window : $window ,
			$location : $location ,
			Tournament : Tournament
		});
	}));

		it('shoud instantiate All tournament', function(){
			expect($scope.AllTournament).toBeDefined();
			expect(typeof $scope.AllTournament).toBe('object');
		});

		it('should return promise when getting All tournament', function(){
     	    deferred.resolve({ name : 'Plmoha429' , place: "02134u32", organizer:false , date : 'Yellow'});

	        $scope.getAllTournament();
	        $scope.$apply();

	        expect(Tournament.getAllTournament).toHaveBeenCalled();
		});


		it('should check user if available', function(){
			$window.localStorage.member = 'TestingMethod';
			$scope.ceckuser();

			expect($scope.LikeCtrl).toEqual(true);
		});

})