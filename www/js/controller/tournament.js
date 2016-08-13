'use strict';
angular.module('zarad.tournament',[])

.controller('TournamentController',function($scope, $window, $location,Tournament){
	$scope.AllTournament={}
	//To add Tournament information 
	$scope.AddTournament=function(){
		Tournament.AddTournament($scope.tournament)
		.then(function(resp){
			$location.path("/AllTournament")
			//console.log(resp )
		})
	}
	//To get information of  Tournament
	$scope.getAllTournament=function(){
		Tournament.getAllTournament()
		.then(function(AllTournament){
			$scope.AllTournament=AllTournament;
		})
	}
	$scope.getAllTournament();

	//To get one  Tournament data

	$scope.SearchAboutTournament=function(){
		console.log($scope.tournament.search)
		Tournament.SearchAboutTournament($scope.tournament.search)
		.then(function(tournament){
			if(tournament !=="Not Found"){
				$scope.tournament.name=tournament.name;
				$scope.tournament.place=tournament.place;
				$scope.tournament.details=tournament.details;
				$scope.tournament.organizer=tournament.organizer;
				$scope.tournament.Date=tournament.Date;
				$scope.tournament.poster=tournament.poster;
			}
			else{
				$scope.massage="Tournament Not Found";
			}
		})
	}
	//To edite Tournament from data
	$scope.EditTournament=function(){
		Tournament.EditTournament($scope.tournament).
		then(function(tournament){
			$scope.getAllTournament();
			console.log(tournament)
			$scope.Empty();
		})
	}
	//To delete Tournament from data
	$scope.DeleteTournament=function(){
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