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
		$scope.massage=" ";
		Tournament.SearchAboutTournament($scope.tournament.search)
		.then(function(tournament){
 				$scope.tournament.name=tournament.data.name;
 				$scope.tournament.place=tournament.data.place;
 				$scope.tournament.details=tournament.data.details;
 				$scope.tournament.organizer=tournament.data.organizer;
 				$scope.tournament.Date=tournament.data.Date;
 				$scope.tournament.poster=tournament.data.poster;
		}).catch(function(error){
			$scope.massage="Tournament Not Found";
		})
	}
	$scope.EditTournament=function(){
		Tournament.EditTournament($scope.tournament).
		then(function(tournament){
			$scope.Empty();
			console.log(tournament)
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