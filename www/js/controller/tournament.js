'use strict';
angular.module('zarad.tournament',['ionic'])

.controller('TournamentController',function($scope, $window, $location,Tournament,$ionicModal){
	$scope.AllTournament={};
	$scope.SearchTournament={};
	$scope.getAllTournament=function(){
		Tournament.getAllTournament()
		.then(function(AllTournament){
			$scope.AllTournament.data=AllTournament;
		})
	}
	$scope.getAllTournament();
})