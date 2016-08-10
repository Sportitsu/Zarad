'use strict';
angular.module('zarad.tournament',['ionic'])

.controller('TournamentController',function($scope, $window, $location,Tournament){
	//$scope.tournament={};
	$scope.AddTournament=function(){
		console.log($scope.tournament)
		Tournament.AddTournament($scope.tournament)
		.then(function(resp){
			console.log(resp )
		})
	}
})