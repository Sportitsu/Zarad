'use strict';
angular.module('zarad.tournament',['ionic'])

.controller('TournamentController',function($scope, $window, $location,Tournament,$ionicModal){
	$scope.AllTournament={};
	$scope.SearchTournament={};
	$scope.LikeCtrl=""
	$scope.getAllTournament=function(){
		Tournament.getAllTournament()
		.then(function(AllTournament){
			$scope.AllTournament.data=AllTournament;
		})
	}
	$scope.getAllTournament();
	
	$scope.ceckuser=function(){
		console.log($window.localStorage.member)
	if($window.localStorage.member!==undefined){
       $scope.LikeCtrl=true
	}
	}
	$scope.ceckuser();

	$scope.Like=function(tournament){
		console.log(tournament.name)
		var member=JSON.parse($window.localStorage.member)
		console.log(member.username)

		Tournament.Like({name:tournament.name,
						 username:member.username,
						})
		.then(function(resp){
			console.log(resp);
		})
	}
})