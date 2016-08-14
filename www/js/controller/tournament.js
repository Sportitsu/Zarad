'use strict';
angular.module('zarad.tournament',[])

.controller('TournamentController',function($scope, $window, $location,Tournament){
	$scope.AllTournament={}
	$scope.getAllTournament=function(){
		Tournament.getAllTournament()
		.then(function(AllTournament){
			$scope.AllTournament=AllTournament;
		})
	}
	$scope.getAllTournament();

	$scope.SearchAboutTournament=function(){
		
		Tournament.SearchAboutTournament($scope.tournament.search)
		.then(function(tournament){
			$scope.tournament.name=tournament.name;
			$scope.tournament.place=tournament.place;
			$scope.tournament.details=tournament.details;
			$scope.tournament.organizer=tournament.organizer;
			$scope.tournament.Date=tournament.Date
			$scope.tournament.poster=tournament.poster
		})
	}
	$scope.EditTournament=function(){
		Tournament.EditTournament($scope.tournament).
		then(function(tournament){
			console.log(tournament)
		})
	}
	$scope.DeleteTournament=function(){
		Tournament.DeleteTournament({name:$scope.tournament.search})
		.then(function(resp){
			console.log(resp)
		})
	}

})