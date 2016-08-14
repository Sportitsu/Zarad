'use strict';
angular.module('zarad.tournament',['ionic'])

.controller('TournamentController',function($scope, $window, $location,Tournament){
	//$scope.tournament={};
	$scope.AllTournament={}
	$scope.AddTournament=function(){
		Tournament.AddTournament($scope.tournament)
		.then(function(resp){
			$scope.getAllTournament();
			$location.path('/AllTournament');
		})
	}
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
			$scope.Empty();
			console.log(tournament)
		})
	}
	$scope.DeleteTournament=function(){
		console.log($scope.tournament.search)
		Tournament.DeleteTournament({name:$scope.tournament.search})
		.then(function(resp){
			$scope.Empty();
 			$scope.tournament.search=" "
			console.log(resp)
		})
	}
	//To make the input filed empty
 	$scope.Empty=function(){
 		$scope.tournament.name=" ";
 	 	$scope.tournament.place=" ";
 		$scope.tournament.details=" ";
 		$scope.tournament.organizer=" ";
 		$scope.tournament.Date=" ";
 		$scope.tournament.poster=" ";
 	}

})